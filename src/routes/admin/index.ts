import { Router, Request, Response } from "express";

const router: Router = Router();

// router.get("/", AdminController.indexAdmin);
router.get("/", (req: Request, res: Response) => {
  const greeting = req.t("greeting");
  console.log(greeting);
  res.render("admin/auth", { title: "Admin", t: req.t.bind(req.i18n) });
});
router.get("/dashboard", (req: Request, res: Response) => {
  res.render("admin/dashboard", {
    title: "Dashboard",
    t: req.t.bind(req.i18n),
  });
});
router.get("/transactions", (req: Request, res: Response) => {
  res.render("admin/transactions", {
    title: "Transactions",
    t: req.t.bind(req.i18n),
  });
});

// router.post("/service", AdminController.createService);

export default router;
