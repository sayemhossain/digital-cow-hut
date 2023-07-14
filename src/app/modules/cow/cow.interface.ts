import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type ICow = {
  name: string;
  age: string;
  price: number;
  location: string;
  breed: string;
  weight: number;
  lebel: string;
  category: string;
  seller: Types.ObjectId | IUser;
};
export type CowModel = Model<ICow, Record<string, unknown>>;
