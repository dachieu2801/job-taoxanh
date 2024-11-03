import { Router, Request, Response } from "express";
import AdminController from "../../controllers/admin/AdminController";
import { authToken } from "../../shared/middlewares/index";
const router: Router = Router();

router.get("/login", AdminController.showLogin);
router.post("/login", AdminController.login);
router.post("/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/admin");
    }
    return res.redirect("/admin/login");
  });
});

router.get("/", authToken, AdminController.indexAdmin);
router.get("/dashboard", authToken, AdminController.indexAdmin);

router.get("/transactions", authToken, AdminController.transactions);

//service
router.get("/services", authToken, AdminController.services);
router.post("/service", authToken, AdminController.createService);
router.put("/service", authToken, AdminController.editService);
router.get("/settings", authToken, AdminController.renderSetting);

// router.post("/service", AdminController.createService);

export default router;
