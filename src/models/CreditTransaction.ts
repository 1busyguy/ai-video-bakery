import { Schema, model, models, Document, Types } from 'mongoose';

export interface ICreditTransaction extends Document {
  userId: Types.ObjectId;
  amount: number; // Positive for additions, negative for usage
  type: 'subscription_renewal' | 'purchase' | 'usage';
  description: string;
  metadata: any; // For storing additional information
  referenceId?: string; // Can link to a purchase, video, etc.
  createdAt: Date;
}

const CreditTransactionSchema = new Schema<ICreditTransaction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    type: { 
      type: String, 
      required: true,
      enum: ['subscription_renewal', 'purchase', 'usage']
    },
    description: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed, default: {} },
    referenceId: { type: String },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: { updatedAt: false } } // We only need createdAt for transactions
);

// Index for faster queries
CreditTransactionSchema.index({ userId: 1, createdAt: -1 });
CreditTransactionSchema.index({ type: 1 });
CreditTransactionSchema.index({ referenceId: 1 }, { sparse: true });

export default models.CreditTransaction || model<ICreditTransaction>('CreditTransaction', CreditTransactionSchema);
