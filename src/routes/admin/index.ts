import { Router, Request, Response } from 'express';
import AdminController from '../../controllers/admin/AdminController';
// import ServiceController from '../../controllers/admin/ServiceController';
const router: Router = Router();

router.get("/", AdminController.indexAdmin);

router.post("/service", AdminController.createService);

export default router;