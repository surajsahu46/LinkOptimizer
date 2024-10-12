import { model, Schema, Document, models } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { User } from './userModel';

export interface UrlItem extends Document {
  original: string;
  short: string;
  createdBy: User['email'],
}

const urlSchema = new Schema<UrlItem>({
  original: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: {
    type: String,
    ref: 'users',
    required: true,
  },
}, {
  timestamps: true
});

urlSchema.plugin(mongoosePaginate);

export const UrlModel: any = models.urls || model<UrlItem>('urls', urlSchema);