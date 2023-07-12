import express from 'express';
import { createUser } from './user.controller';
const router = express.Router();

router.post('/auth/signup', createUser);

export const UserRoutes = router;
