import { Model } from 'mongoose';

export type IName = {
  firstName: string;
  lastName: string;
};
export type IUser = {
  name: IName;
  role: 'seller' | 'buyer';
  //   email: string;
  password: string;
  phoneNumber: string;
  address?: string;
  budget: number;
  income: number;
  buyer: string;
  seller: string;
};
export type UserModel = Model<IUser, Record<string, unknown>>;
