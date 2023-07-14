import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { usersSearchableFields } from './user.constant';
import { IUser, IUsersFilters } from './user.interface';
import { User } from './user.model';

export const createUserToDB = async (userData: IUser): Promise<IUser> => {
  const result = User.create(userData);
  return result;
};
export const getSingleUserToDB = async (id: String): Promise<IUser | null> => {
  const result = await User.findById({ _id: id });
  return result;
};
export const getAllUserToDB = async (
  paginationOptions: IPaginationOptions,
  filters: IUsersFilters
): Promise<IGenericResponse<IUser[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  //for partial match
  if (searchTerm) {
    andConditions.push({
      $or: usersSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  //For exest match
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await User.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const updateUserToDB = async (id: string, payload: Partial<IUser>) => {
  const isExist = await User.findById({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await User.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
export const deleteUserToDB = async (id: string) => {
  const result = await User.findByIdAndDelete({ _id: id });
  return result;
};
