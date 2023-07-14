import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { createCow } from './cow.controller';
import { createCowZodSchema } from './cow.validation';
const router = express.Router();

router.post('/', validateRequest(createCowZodSchema), createCow);

export const CowsRoutes = router;
