import { Router, Request, Response } from "express";
import UserController from "../../controllers/user/UserController";
import OtpController from "../../controllers/user/OtpController";
import SepayController from "../../controllers/sepay/SepayController";
import {validationMiddleware} from "../../shared/middlewares/index";
import {fallbackSepayInput} from "../../shared/type/index";

const router: Router = Router();

router.get("/", UserController.home);
router.post("/otp", OtpController.senOtp);
router.post("/verify-otp", OtpController.verifyOtpAndCreateTransaction);
router.get("/checkout/:hashTransaction", UserController.getCheckout);
router.post("/checkout", UserController.checkout);
router.post("/fallback", validationMiddleware(fallbackSepayInput), SepayController.fallback);

export default router;
