import { Schema, model, models, Document, Types } from 'mongoose';

export type MediaType = 'video' | 'image' | 'audio';

export interface IMedia extends Document {
  userId: Types.ObjectId;
  type: MediaType;
  title: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  fileSize: number; // in bytes
  duration?: number; // for videos/audio (in seconds)
  resolution?: string; // e.g., "1920x1080"
  format: string; // e.g., "mp4", "jpg"
  modelUsed: string; // e.g., "character3", "flux_pro"
  promptText?: string; // The prompt used to generate this media
  creditsCost: number; // How many credits were spent
  metadata: any; // For additional information
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<IMedia>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { 
      type: String, 
      required: true,
      enum: ['video', 'image', 'audio']
    },
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    thumbnailUrl: { type: String },
    fileSize: { type: Number, required: true },
    duration: { type: Number }, // for videos/audio
    resolution: { type: String },
    format: { type: String, required: true },
    modelUsed: { type: String, required: true },
    promptText: { type: String },
    creditsCost: { type: Number, required: true },
    metadata: { type: Schema.Types.Mixed, default: {} },
    isPublic: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Indexes for faster queries
MediaSchema.index({ userId: 1, createdAt: -1 });
MediaSchema.index({ type: 1 });
MediaSchema.index({ isPublic: 1 });
MediaSchema.index({ 
  title: 'text', 
  description: 'text',
  promptText: 'text'
}, { weights: { title: 10, description: 5, promptText: 3 } });

export default models.Media || model<IMedia>('Media', MediaSchema);
