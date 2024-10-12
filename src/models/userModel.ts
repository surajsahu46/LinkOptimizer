import { model, Schema, Document, models } from 'mongoose';

export interface User extends Document {
  fullName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
}, {
    timestamps: true,
});

export const UserModel = models.users || model<User>('users', userSchema);
