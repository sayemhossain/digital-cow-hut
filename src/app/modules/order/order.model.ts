import { Schema, Types, model } from 'mongoose';

const orderSchema = new Schema({
  cow: {
    type: Types.ObjectId,
    ref: 'cow',
    required: [true, 'Cow id is required'],
  },
  buyer: {
    type: Types.ObjectId,
    ref: 'user',
    required: [true, 'Buyer id is required'],
  },
});
export const Order = model('order', orderSchema);
