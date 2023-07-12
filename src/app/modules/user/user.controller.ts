import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { createUserToDB } from './user.service';

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const { userData } = req.body;
  const result = await createUserToDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully !',
    data: result,
  });
});
