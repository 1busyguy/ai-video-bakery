import { Schema, model, models, Document } from 'mongoose';

export interface ISubscriptionPlan extends Document {
  planId: string; // e.g., "basic", "creator", "professional"
  name: string;
  description: string;
  price: number; // in USD
  interval: 'monthly' | 'yearly';
  stripePriceId: string;
  includedCredits: number;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionPlanSchema = new Schema<ISubscriptionPlan>(
  {
    planId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    interval: { 
      type: String, 
      required: true,
      enum: ['monthly', 'yearly'] 
    },
    stripePriceId: { type: String, required: true },
    includedCredits: { type: Number, required: true },
    features: [{ type: String }],
    isPopular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default models.SubscriptionPlan || model<ISubscriptionPlan>('SubscriptionPlan', SubscriptionPlanSchema);
