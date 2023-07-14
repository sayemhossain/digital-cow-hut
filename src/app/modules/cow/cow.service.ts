import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ICow } from './cow.interface';
import { Cow } from './cow.model';

export const createCowToDB = async (payload: ICow) => {
  const user = await User.findById(payload.seller);

  if (!user) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Can not find any seller with this id.'
    );
  }

  const result = Cow.create(payload);
  return result;
};
