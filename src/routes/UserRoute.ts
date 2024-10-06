import { Router, Request, Response } from 'express';
import UserController from "../controllers/UserController";

const router: Router = Router();

// Route để tạo một người dùng mới
router.post('/create', UserController.createUser);

export default router;
