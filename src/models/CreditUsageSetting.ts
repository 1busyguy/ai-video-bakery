import { Schema, model, models, Document } from 'mongoose';

export interface ICreditUsageSetting extends Document {
  modelId: string; // e.g., "character3_540p", "flux_pro", etc.
  category: 'video' | 'image' | 'audio';
  creditCost: number;
  unit: string; // e.g., "per_second", "per_megapixel", "per_1000_chars"
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CreditUsageSettingSchema = new Schema<ICreditUsageSetting>(
  {
    modelId: { type: String, required: true, unique: true },
    category: { 
      type: String, 
      required: true,
      enum: ['video', 'image', 'audio']
    },
    creditCost: { type: Number, required: true },
    unit: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Compound index for faster lookup
CreditUsageSettingSchema.index({ category: 1, isActive: 1 });

export default models.CreditUsageSetting || model<ICreditUsageSetting>('CreditUsageSetting', CreditUsageSettingSchema);
