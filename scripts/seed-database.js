require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Simple schema definitions for the seed script
const SubscriptionPlanSchema = new mongoose.Schema({
  planId: String,
  name: String,
  description: String,
  price: Number,
  interval: String,
  stripePriceId: String,
  includedCredits: Number,
  features: [String],
  isPopular: Boolean,
  isActive: Boolean
});

const CreditUsageSettingSchema = new mongoose.Schema({
  modelId: String,
  category: String,
  creditCost: Number,
  unit: String,
  isActive: Boolean
});

const CreditPackageSchema = new mongoose.Schema({
  name: String,
  credits: Number,
  price: Number,
  stripePriceId: String,
  isPopular: Boolean,
  isActive: Boolean
});

// Create models
const SubscriptionPlan = mongoose.model('SubscriptionPlan', SubscriptionPlanSchema);
const CreditUsageSetting = mongoose.model('CreditUsageSetting', CreditUsageSettingSchema);
const CreditPackage = mongoose.model('CreditPackage', CreditPackageSchema);

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await SubscriptionPlan.deleteMany({});
    await CreditUsageSetting.deleteMany({});
    await CreditPackage.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Seed subscription plans - using Hedra's pricing
    const subscriptionPlans = [
      {
        planId: 'free',
        name: 'Free',
        description: 'Get started with basic features',
        price: 0,
        interval: 'monthly',
        stripePriceId: 'price_free',
        includedCredits: 400,
        features: [
          'Includes 400 credits per month',
          'Slower generations',
          'Cannot purchase credit packs',
          'No commercial use'
        ],
        isPopular: false,
        isActive: true
      },
      {
        planId: 'basic',
        name: 'Basic',
        description: 'Perfect for beginners',
        price: 10,
        interval: 'monthly',
        stripePriceId: 'price_basic123',
        includedCredits: 1000,
        features: [
          'Includes 1,000 credits per month',
          'Credits do not rollover',
          'Premium voices',
          'Voice cloning',
          'Commercial use',
          'No watermark',
          'Purchase additional credit packs that rollover'
        ],
        isPopular: false,
        isActive: true
      },
      {
        planId: 'creator',
        name: 'Creator',
        description: 'For content creators',
        price: 30,
        interval: 'monthly',
        stripePriceId: 'price_creator123',
        includedCredits: 3600,
        features: [
          'Includes 3,600 credits per month',
          'Credits do not rollover',
          'Premium voices',
          'Voice cloning',
          'Commercial use',
          'No watermark',
          'Purchase additional credit packs that rollover'
        ],
        isPopular: true,
        isActive: true
      },
      {
        planId: 'professional',
        name: 'Professional',
        description: 'For professional creators',
        price: 75,
        interval: 'monthly',
        stripePriceId: 'price_professional123',
        includedCredits: 11000,
        features: [
          'Includes 11,000 credits per month',
          'Credits do not rollover',
          'Premium voices',
          'Voice cloning',
          'Commercial use',
          'No watermark',
          'Purchase additional credit packs that rollover'
        ],
        isPopular: false,
        isActive: true
      }
    ];
    
    await SubscriptionPlan.insertMany(subscriptionPlans);
    console.log('Inserted subscription plans');
    
    // Seed credit usage settings based on Hedra's pricing
    const creditUsageSettings = [
      // Video models
      {
        modelId: 'character3_540p',
        category: 'video',
        creditCost: 3.5,
        unit: 'per_second',
        isActive: true
      },
      {
        modelId: 'character3_720p',
        category: 'video',
        creditCost: 7,
        unit: 'per_second',
        isActive: true
      },
      {
        modelId: 'kling',
        category: 'video',
        creditCost: 16,
        unit: 'per_second',
        isActive: true
      },
      
      // Image models
      {
        modelId: 'flux_dev',
        category: 'image',
        creditCost: 4,
        unit: 'per_megapixel',
        isActive: true
      },
      {
        modelId: 'flux_pro',
        category: 'image',
        creditCost: 7,
        unit: 'per_megapixel',
        isActive: true
      },
      
      // Audio models
      {
        modelId: 'elevenlabs',
        category: 'audio',
        creditCost: 15,
        unit: 'per_1000_chars',
        isActive: true
      },
      {
        modelId: 'cartesia',
        category: 'audio',
        creditCost: 15,
        unit: 'per_1000_chars',
        isActive: true
      }
    ];
    
    await CreditUsageSetting.insertMany(creditUsageSettings);
    console.log('Inserted credit usage settings');
    
    // Seed credit packages
    const creditPackages = [
      {
        name: 'Small Pack',
        credits: 1000,
        price: 10,
        stripePriceId: 'price_credit_small',
        isPopular: false,
        isActive: true
      },
      {
        name: 'Medium Pack',
        credits: 5000,
        price: 45,
        stripePriceId: 'price_credit_medium',
        isPopular: true,
        isActive: true
      },
      {
        name: 'Large Pack',
        credits: 10000,
        price: 80,
        stripePriceId: 'price_credit_large',
        isPopular: false,
        isActive: true
      }
    ];
    
    await CreditPackage.insertMany(creditPackages);
    console.log('Inserted credit packages');
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedDatabase();
