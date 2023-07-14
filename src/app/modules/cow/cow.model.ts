import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.interface';

const cowSchema = new Schema<ICow>({
  name: {
    type: String,
    required: [true, 'Name is required.'],
  },
  age: {
    type: String,
    required: [true, 'Age is required.'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required.'],
  },
  location: {
    type: String,
    required: [true, 'Location is required.'],
  },
  breed: {
    type: String,
    required: [true, 'Breed is required.'],
  },
  weight: {
    type: Number,
    required: [true, 'Weight is required.'],
  },
  lebel: {
    type: String,
    required: [true, 'Lebel is required.'],
  },
  category: {
    type: String,
    required: [true, 'Category is required.'],
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Seller is required.'],
  },
});
export const Cow = model<ICow, CowModel>('Cow', cowSchema);
