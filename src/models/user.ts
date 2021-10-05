import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
    email: string;
    firstName: string;
    lastName: string;ƒ
    password: string;
};

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        minLength: 4
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
}, { timestamps: true })

export const UserModel = mongoose.model<User>("Users", userSchema);