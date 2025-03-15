import { Schema, model, models, Document } from 'mongoose';

export interface ICreditPackage extends Document {
  name: string;
  credits: number;
  price: number; // in USD
  stripePriceId: string;
  isPopular: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CreditPackageSchema = new Schema<ICreditPackage>(
  {
    name: { type: String, required: true },
    credits: { type: Number, required: true },
    price: { type: Number, required: true },
    stripePriceId: { type: String, required: true },
    isPopular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default models.CreditPackage || model<ICreditPackage>('CreditPackage', CreditPackageSchema);
