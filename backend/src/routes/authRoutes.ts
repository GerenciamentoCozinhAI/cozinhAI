import { Router } from 'express';
import { register, login, loginWithGoogle, logout } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/google', loginWithGoogle); // Rota para iniciar o login com Google
router.post('/logout', logout);

export default router;