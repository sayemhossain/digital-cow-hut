import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import {
  createCow,
  deleteCow,
  getAllCow,
  getSingleCow,
  updateCow,
} from './cow.controller';
import { createCowZodSchema, updateCowZodSchema } from './cow.validation';
const router = express.Router();

router.post('/', validateRequest(createCowZodSchema), createCow);
router.get('/:id', getSingleCow);
router.get('/', getAllCow);
router.patch('/:id', validateRequest(updateCowZodSchema), updateCow);
router.delete('/:id', deleteCow);

export const CowsRoutes = router;
