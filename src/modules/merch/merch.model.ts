import { Schema, model, Document } from "mongoose";

export interface MerchDocument extends Document {
  name: string;
  price: number;
  sizes: ("S" | "M" | "L" | "XL")[];
  stock: number;
  imageUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const merchSchema = new Schema<MerchDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    sizes: {
      type: [String],
      enum: ["S", "M", "L", "XL"],
      required: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    },
    imageUrl: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const MerchModel = model<MerchDocument>(
  "Merch",
  merchSchema
);
