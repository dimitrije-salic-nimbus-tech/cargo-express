import mongoose, { Document, Schema } from "mongoose";

import { Client } from './client';
import { User } from './user';

export interface Invoice extends Document {
    issuer: User;
    client: Client;
    issuingDate: Date;
    // data about job
    jobId: string;
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

const invoiceSchema = new Schema(
    {
        issuer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        client: {
            // stored here to avoid mutable, growing arrays in client schema
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Clients',
        },
        issuingDate: {
            type: Date,
            required: true,
        },
        jobId: {
          type: String,
        },
        loadingDate: {
            type: Date,
        },
        unloadingDate: {
            type: Date,
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

export const InvoiceModel = mongoose.model<Invoice>('Invoices', invoiceSchema);