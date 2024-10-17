import { Router, Request, Response } from "express";
import AdminController from "../../controllers/admin/AdminController"
import { authToken } from "../../shared/middlewares/index"
const router: Router = Router();

router.get("/login", AdminController.showLogin);
router.post("/login", AdminController.login);
router.post('/logout', (req: Request, res: Response) => {
  req.session.destroy(err => {
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

router.get("/dashboard", authToken, (req: Request, res: Response) => {
  res.render("admin/dashboard", {
    title: "Dashboard",
    t: req.t.bind(req.i18n),
  });
});

router.get("/transactions", authToken, (req: Request, res: Response) => {
  res.render("admin/transactions", {
    title: "Transactions",
    t: req.t.bind(req.i18n),
  });
});

// router.post("/service", AdminController.createService);

export default router;
