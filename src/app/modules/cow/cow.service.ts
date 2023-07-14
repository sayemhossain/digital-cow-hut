import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from '../user/user.model';
import { cowsSearchableFields } from './cow.constant';
import { ICow, ICowFilters } from './cow.interface';
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
export const getSingleCowToDB = async (id: String): Promise<ICow | null> => {
  const result = await Cow.findById({ _id: id });
  return result;
};
export const getAllCowToDB = async (
  paginationOptions: IPaginationOptions,
  filters: ICowFilters
): Promise<IGenericResponse<ICow[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  const { query, minPrice, maxPrice, ...filtersData } = filters;

  const andConditions = [];

  //for partial match
  if (query) {
    andConditions.push({
      $or: cowsSearchableFields.map(field => ({
        [field]: {
          $regex: query,
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

  if (minPrice) {
    console.log(minPrice);
    andConditions.push({ price: { $gte: minPrice } });
  }
  if (maxPrice) {
    andConditions.push({ price: { $lte: maxPrice } });
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Cow.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const deleteCowToDB = async (id: string) => {
  const result = await Cow.findByIdAndDelete({ _id: id });
  return result;
};
