import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import CreditUsageSetting from '@/models/CreditUsageSetting';
import CreditTransaction from '@/models/CreditTransaction';
import Media from '@/models/Media';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { operation, parameters, title, outputUrl } = await req.json();
    
    if (!operation || !parameters) {
      return NextResponse.json(
        { error: 'Missing operation details' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    // Calculate credit cost
    let creditCost = 0;
    let description = '';
    let modelId = '';
    let mediaType: 'video' | 'image' | 'audio' = 'video';
    
    switch (operation) {
      case 'video_generation':
        const { model, durationSeconds, quality } = parameters;
        modelId = quality === 'high' ? `${model}_720p` : `${model}_540p`;
        mediaType = 'video';
        break;
        
      case 'image_generation':
        const { model: imgModel } = parameters;
        modelId = imgModel;
        mediaType = 'image';
        break;
        
      case 'audio_generation':
        const { model: audioModel } = parameters;
        modelId = audioModel;
        mediaType = 'audio';
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid operation' },
          { status: 400 }
        );
    }
    
    // Get credit cost from settings
    const usageSetting = await CreditUsageSetting.findOne({ 
      modelId, 
      isActive: true 
    });
    
    if (!usageSetting) {
      return NextResponse.json(
        { error: 'Invalid model or operation' },
        { status: 400 }
      );
    }
    
    // Calculate final cost based on usage settings and parameters
    switch (usageSetting.unit) {
      case 'per_second':
        creditCost = usageSetting.creditCost * parameters.durationSeconds;
        description = `Generated ${parameters.durationSeconds}s ${mediaType} with ${modelId}`;
        break;
        
      case 'per_megapixel':
        creditCost = usageSetting.creditCost * parameters.megapixels;
        description = `Generated ${mediaType} with ${modelId} at ${parameters.megapixels}MP`;
        break;
        
      case 'per_1000_chars':
        creditCost = usageSetting.creditCost * (parameters.characters / 1000);
        description = `Generated ${mediaType} with ${modelId}, ${parameters.characters} characters`;
        break;
        
      default:
        creditCost = usageSetting.creditCost;
        description = `Generated ${mediaType} with ${modelId}`;
    }
    
    // Round to 2 decimal places
    creditCost = Math.ceil(creditCost * 100) / 100;
    
    // Get user and check credits
    const user = await User.findById(session.user.id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    if (user.credits < creditCost) {
      return NextResponse.json({
        error: 'Insufficient credits',
        requiredCredits: creditCost,
        availableCredits: user.credits
      }, { status: 403 });
    }
    
    // Start a session for transaction
    const sess = await mongoose.startSession();
    sess.startTransaction();
    
    try {
      // Deduct credits
      user.credits -= creditCost;
      await user.save({ session: sess });
      
      // Record transaction
      const transaction = new CreditTransaction({
        userId: user._id,
        amount: -creditCost,
        type: 'usage',
        description,
        metadata: parameters
      });
      
      await transaction.save({ session: sess });
      
      // Record media if we have output
      if (outputUrl) {
        const media = new Media({
          userId: user._id,
          type: mediaType,
          title: title || `${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} Generation`,
          url: outputUrl,
          fileSize: parameters.fileSize || 0,
          duration: parameters.durationSeconds,
          resolution: parameters.resolution,
          format: parameters.format || 'unknown',
          modelUsed: modelId,
          promptText: parameters.prompt,
          creditsCost: creditCost,
          metadata: parameters
        });
        
        await media.save({ session: sess });
        transaction.referenceId = media._id;
        await transaction.save({ session: sess });
      }
      
      await sess.commitTransaction();
    } catch (error) {
      await sess.abortTransaction();
      throw error;
    } finally {
      sess.endSession();
    }
    
    return NextResponse.json({
      success: true,
      creditCost,
      remainingCredits: user.credits
    });
  } catch (error) {
    console.error('Error using credits:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
