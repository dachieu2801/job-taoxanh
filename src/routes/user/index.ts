import { Router, Request, Response } from "express";
import UserController from "../../controllers/user/UserController";
import OtpController from "../../controllers/user/OtpController";
import Otp from "../../models/Otp";
const router: Router = Router();

router.get("/", UserController.home);
router.post("/otp", OtpController.senOtp);
router.post("/verify-otp", OtpController.verifyOtpAndAddCart);
router.get("/checkout/:phone", UserController.getCheckout);
router.post("/checkout", UserController.checkout);
router.post("/fallback", async(req, res, next) => {

  const otp =new Otp({
    phone: "0842902401", 
    otp: JSON.stringify(req.body),
    expired_at:  new Date()
  })
  await otp.save()
  console.log("body", req.body);
  console.log("--------------------------");
  console.log("query", req.query);
  console.log("--------------------------");
  console.log("params", req.params);
  console.log("--------------------------");

  res.send("sad");
});

export default router;
