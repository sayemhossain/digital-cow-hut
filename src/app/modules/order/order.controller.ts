import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { createOrderToDB, getAllOrderToDB } from './order.service';

export const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;

  const result = await createOrderToDB(orderData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully !',
    data: result,
  });
});
export const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await getAllOrderToDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully !',
    data: result,
  });
});
