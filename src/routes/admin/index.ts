import { Router, Request, Response } from 'express';
import AdminController from '../../controllers/admin/AdminController';
const router: Router = Router();

router.get("/", AdminController.indexAdmin);

router.get("/service", AdminController.createService);

export default router;