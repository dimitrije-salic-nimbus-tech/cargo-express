import mongoose, { Document, Schema } from 'mongoose';
import { Client } from './client';
import { User } from './user';

export interface Job extends Document {
  createdBy: User;
  client: Client;
  loadingDate: Date;
  unloadingDate: Date;
  vehicles: {
    vehicleNumber: string;
    driver: string;
  }[];
  costs: {
    title: string;
    description: string;
    cost: string;
  }[];
  meta: {
    from: {
      country: string;
      address: string;
      phone: string;
      name: string;
      email: string;
    };
    to: {
      country: string;
      address: string;
      phone: string;
      name: string;
      email: string;
    };
  };
  descriptions: {
    title: string;
    text: string;
  }[];
}

const jobSchema = new Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    client: {
      // stored here to avoid mutable, growing arrays in client schema
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Clients',
    },
    loadingDate: {
      type: Date,
      required: true,
    },
    unloadingDate: {
      type: Date,
      required: true,
    },
    descriptions: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
          text: String,
        },
      ],
      required: true
    },
    vehicles: {
      type: [
        {
          vehicleNumber: {
            type: String,
            required: true,
          },
          driver: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
    costs: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
          description: String,
          cost: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
    meta: {
      type: {
        from: {
          type: {
            country: String,
            address: String,
            phone: String,
            name: String,
            email: String,
          },
          required: true,
        },
        to: {
          type: {
            country: String,
            address: String,
            phone: String,
            name: String,
            email: String,
          },
          required: true,
        },
      },
    },
  },
  {
    timestamps: true,
  },
);

export const JobModel = mongoose.model<Job>('Jobs', jobSchema);
