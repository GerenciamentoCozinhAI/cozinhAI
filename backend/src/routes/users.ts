// src/routes/users.ts
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { getMyUser, updateFavorites } from '../controllers/usersController';

const router = Router();

router.get('/me', authMiddleware, getMyUser);
router.put('/favorites', authMiddleware, updateFavorites);

export default router;
