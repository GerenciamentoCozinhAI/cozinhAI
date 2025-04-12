// src/routes/users.ts
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { deleteMyUser, getMyUser, replaceMyUser ,updateMyUser } from '../controllers/usersController';

const router = Router();

router.get('/me', authMiddleware, getMyUser);
router.put('/user', authMiddleware, replaceMyUser);
router.patch('/user', authMiddleware, updateMyUser);
router.delete('/user', authMiddleware, deleteMyUser);

export default router;
