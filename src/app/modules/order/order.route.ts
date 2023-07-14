import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { createOrder, getAllOrder } from './order.controller';
import { createOrderZodSchema } from './order.validation';
const router = express.Router();

router.post('/', validateRequest(createOrderZodSchema), createOrder);
router.get('/', getAllOrder);

export const OrderRoutes = router;
