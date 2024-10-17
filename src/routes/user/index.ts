import { Router, Request, Response } from "express";
import UserController from "../../controllers/user/UserController";
import OtpController from "../../controllers/user/OtpController";
import SepayController from "../../controllers/sepay/SepayController";
import { validationMiddleware } from "../../shared/middlewares/index";
import { fallbackSepayApiInput, optApiInput } from "../../shared/type/index";

const router: Router = Router();

router.get("/", UserController.home);
router.post("/otp", validationMiddleware(optApiInput), OtpController.senOtp);
router.post("/verify-otp", OtpController.verifyOtpAndCreateTransaction);
router.get("/checkout/:hashTransaction", UserController.getCheckout);
router.post("/checkout", UserController.handleCheckout);
router.get("/transactions", UserController.listTransaction);

router.post(
  "/fallback",
  validationMiddleware(fallbackSepayApiInput),
  SepayController.fallback
);

//trả thông tin dịch vụ
router.get("/info/:hashTransaction", UserController.getInforServive);

export default router;
