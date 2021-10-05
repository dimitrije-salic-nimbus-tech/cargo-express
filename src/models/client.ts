import mongoose, { Document, Schema } from 'mongoose';

export interface Client extends Document {
  name: string;
  country: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  email: string;
  phone: string;
  mobile: string;
  otherPhone: string;
  zipCode: number;
}

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
      minLength: 6,
    },
    mobile: String,
    otherPhone: String,
    zipCode: Number,
  },
  { timestamps: true },
);

export const ClientModel = mongoose.model<Client>('Clients', clientSchema);
