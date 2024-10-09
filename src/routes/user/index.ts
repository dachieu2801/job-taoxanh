import { Router, Request, Response } from 'express';
import UserController from '../../controllers/user/UserController';

const router: Router = Router();

router.get("/", UserController.home);
router.post("/otp", UserController.senOtp);
router.post("/verify-otp", UserController.verifyOtpAndAddCart);

export default router;
