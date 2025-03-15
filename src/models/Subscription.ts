import { Schema, model, models, Document, Types } from 'mongoose';

export interface ISubscription extends Document {
  userId: Types.ObjectId;
  planId: string;
  stripePriceId: string;
  stripeSubscriptionId: string;
  status: string;
  includedCredits: number;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  canceledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    planId: { type: String, required: true }, // basic, creator, professional
    stripePriceId: { type: String, required: true },
    stripeSubscriptionId: { type: String, required: true, unique: true },
    status: { 
      type: String, 
      required: true,
      enum: ['active', 'past_due', 'canceled', 'trialing', 'incomplete', 'incomplete_expired']
    },
    includedCredits: { type: Number, required: true }, // Monthly credits included with this plan
    currentPeriodStart: { type: Date, required: true },
    currentPeriodEnd: { type: Date, required: true },
    cancelAtPeriodEnd: { type: Boolean, default: false },
    canceledAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Index for faster lookup
SubscriptionSchema.index({ userId: 1 });
SubscriptionSchema.index({ stripeSubscriptionId: 1 }, { unique: true });

export default models.Subscription || model<ISubscription>('Subscription', SubscriptionSchema);
