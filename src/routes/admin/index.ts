import { Router, Request, Response } from "express";
import AdminController from "../../controllers/admin/AdminController"
import { authToken, errorHandler, validationMiddleware } from "../../shared/middlewares/index"
import { loginRequest, createServiceRequest, updateServiceRequest } from "../../shared/type/request"

const router: Router = Router();

router.get("/login", AdminController.showLogin);
router.post("/login", validationMiddleware(loginRequest), AdminController.login);
router.post('/logout', (req: Request, res: Response) => {
  req?.session.destroy(err => {
    if (err) {
      return res.redirect('/admin');
    }
    return res.redirect('/admin/login');
  });
});

router.get("/", authToken, (req: Request, res: Response) => {
  res.render("admin/dashboard", {
    title: "Dashboard",
    t: req.t.bind(req.i18n),
  });
});

router.get("/transactions", authToken, AdminController.transactions)

//service
router.get("/services", authToken, AdminController.services)
router.post("/service", authToken, validationMiddleware(createServiceRequest), AdminController.createService)
router.put("/service",  authToken, validationMiddleware(updateServiceRequest), AdminController.editService)


router.get("/dashboard", authToken, (req: Request, res: Response) => {
  res.render("admin/dashboard", {
    title: "Dashboard",
    t: req.t.bind(req.i18n),
  });
});

// router.post("/service", AdminController.createService);


// Sử dụng middleware xử lý lỗi
router.use(errorHandler);
export default router;
