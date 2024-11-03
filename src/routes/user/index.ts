import { Router, Request, Response } from "express";
import UserController from "../../controllers/user/UserController";
import ServiceController from "../../controllers/user/ServiceController";
import TransactionController from "../../controllers/user/TransactionController";
import OtpController from "../../controllers/user/OtpController";
import SepayController from "../../controllers/sepay/SepayController";
import { validationMiddleware } from "../../shared/middlewares/index";
import { fallbackSepayApiInput, optApiInput } from "../../shared/type/request";
import { errorHandler } from '../../shared/middlewares/index';

const router: Router = Router();

router.get("/", UserController.home);
router.post("/otp", validationMiddleware(optApiInput), OtpController.senOtp);
router.post("/verify-otp", OtpController.verifyOtpAndCreateTransaction);
router.get("/checkout/:hashTransaction", TransactionController.getCheckout);
router.get("/transactions", TransactionController.listTransaction);

router.post(
  "/fallback",
  validationMiddleware(fallbackSepayApiInput),
  SepayController.fallback
);

//trả thông tin dịch vụ
router.get("/info/:hashTransaction", ServiceController.getInforServive);


// Sử dụng middleware xử lý lỗi
router.use(errorHandler);
export default router;
