import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { createCowToDB } from './cow.service';

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
