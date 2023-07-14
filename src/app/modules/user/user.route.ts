import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import {
  createUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from './user.controller';
import { createUserZodSchema, updateUserZodSchema } from './user.validation';
const router = express.Router();

router.post('/auth/signup', validateRequest(createUserZodSchema), createUser);
router.get('/:id', getSingleUser);
router.patch('/:id', validateRequest(updateUserZodSchema), updateUser);
router.get('/', getAllUser);
router.delete('/:id', deleteUser);

export const UserRoutes = router;
