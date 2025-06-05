// src/routes/users.ts
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { deleteMyUser, getMyUser, replaceMyUser ,updateMyUser } from '../controllers/usersController';

const router = Router();

router.get('/me', authMiddleware, getMyUser);
router.put('/me', authMiddleware, replaceMyUser);
router.patch('/me', authMiddleware, updateMyUser);
router.delete('/me', authMiddleware, deleteMyUser);

export default router;
