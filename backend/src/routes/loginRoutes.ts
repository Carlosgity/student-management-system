// loginRoutes.ts
import express from 'express';
import { loginUser } from '../controllers/loginController';

const router = express.Router();

router.post('/login', loginUser); // Define POST route for login

export default router;
