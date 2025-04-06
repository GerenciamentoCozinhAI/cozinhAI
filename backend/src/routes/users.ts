// src/routes/users.ts
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { getMyUsuario, updateFavorites } from '../controllers/usersController';

const router = Router();

router.get('/me', authMiddleware, getMyUsuario);
router.put('/favorites', authMiddleware, updateFavorites);

export default router;
