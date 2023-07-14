import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { Cow } from '../cow/cow.model';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

export const createOrderToDB = async (orderData: IOrder) => {
  const { cow, buyer } = orderData;

  const cowData = await Cow.findById({ _id: cow });
  if (!cowData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found');
  }
  const buyerData = await User.findById({ _id: buyer });
  if (!buyerData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Buyer not found');
  }

  if (buyerData.budget < cowData.price) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Not enough money to buy this cow'
    );
  }
  /*Transation rollback start*/
  let newOrderAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    await Cow.findByIdAndUpdate(
      { _id: cow },
      { label: 'sold out' },
      { session }
    );
    const buyerNewBudget = buyerData.budget - cowData.price;
    await User.findByIdAndUpdate(
      { _id: buyer },
      { budget: buyerNewBudget },
      { session }
    );
    const seller: IUser | null = await User.findById(cowData.seller.toString());
    if (!seller) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found');
    }
    const sellerNewIncome = seller.income + cowData.price;
    await User.findByIdAndUpdate(
      { _id: cow },
      { income: sellerNewIncome },
      { session }
    );

    const newOrder = await Order.create([orderData], { session });
    if (!newOrder.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create order');
    }
    console.log(newOrder);
    newOrderAllData = newOrder[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  /*Transation rollback end*/

  if (newOrderAllData) {
    newOrderAllData = await Order.findOne({
      _id: newOrderAllData._id,
    })
      .populate('cow')
      .populate('buyer');
  }

  return newOrderAllData;
};
export const getAllOrderToDB = async () => {
  const result = await Order.find();
  return result;
};
