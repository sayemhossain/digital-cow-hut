import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { usersFilterableFields } from './user.constant';
import { IUser } from './user.interface';
import { createUserToDB } from './user.service';

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await createUserToDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully !',
    data: result,
  });
});
export const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, usersFilterableFields);

  const result = await getAllUserToDB(paginationFields, filters);

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});
