import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  const greeting = req.t("greeting");
  console.log(greeting);
  res.render("admin/index", { title: "Admin", t: req.t.bind(req.i18n) });
});

export default router;
