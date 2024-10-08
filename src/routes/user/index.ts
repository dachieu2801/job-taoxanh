import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    res.render("index", { title: "APPLE GREEN", t: req.t.bind(req.i18n) });
});

export default router;
