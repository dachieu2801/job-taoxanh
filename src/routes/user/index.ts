import { Router, Request, Response } from 'express';
import UserController from '../../controllers/user/UserController';
import OtpController from '../../controllers/user/OtpController';

const router: Router = Router();

router.get("/", UserController.home);
router.post("/otp", OtpController.senOtp);
router.post("/verify-otp", OtpController.verifyOtpAndAddCart);
router.get("/checkout/:phone", UserController.checkout);

export default router;
