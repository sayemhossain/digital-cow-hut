import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { cowsFilterableFields } from './cow.constant';
import { ICow } from './cow.interface';
import {
  createCowToDB,
  deleteCowToDB,
  getAllCowToDB,
  getSingleCowToDB,
} from './cow.service';

export const createCow = catchAsync(async (req: Request, res: Response) => {
  const cowData = req.body;

  const result = await createCowToDB(cowData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow created successfully !',
    data: result,
  });
});
export const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getSingleCowToDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow retrieved successfully !',
    data: result,
  });
});
export const getAllCow = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, cowsFilterableFields);

  const result = await getAllCowToDB(paginationOptions, filters);

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});
export const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteCowToDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow deleted successfully !',
    data: result,
  });
});
