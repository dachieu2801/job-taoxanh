import { Request, Response } from "express";
import dayjs from "dayjs";
import dotenv from "dotenv";
import Service, {
  ServiceInterface,
  UpdateServiceInput,
} from "../../models/Service";
import UserAdmin, { UserAdminDTO } from "../../models/UserAdmin";
import { verifyPassword } from "../../until/functions";
import {
  TransactionRepository,
  fillterInterface,
} from "../../models/Transaction";
import { sendErrorResponse } from "../../shared/type/index";

dotenv.config();

const setActiveClass = (path: string, currentPath: string) =>
  path === currentPath ? "text-green-700" : "";

const AdminController = {
  showLogin: async (req: Request, res: Response) => {
    return res.render("admin/auth", {
      title: "Admin",
      t: req.t.bind(req.i18n),
      layout: false,
    });
  },

  login: async (req: any, res: Response) => {
    const { username, password } = req.body;
    const user: UserAdminDTO | null = await UserAdmin.findOne({ username });
    if (!user) {
      res
        .status(404)
        .json({ status: "failed", message: "Invalid username or password" });
      return;
    }

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      res
        .status(404)
        .json({ status: "failed", message: "Invalid username or password" });
      return;
    }
    req.session.user = { username };

    res.redirect("/admin/dashboard");
  },

  indexAdmin: (req: Request, res: Response) => {
    console.log(req.path);
    res.render("admin/dashboard", {
      title: "Admin",
      t: req.t.bind(req.i18n),
      layout: "layouts/admin",
      activeRoute: "Dashboard",
      activeClass: (path: string) => setActiveClass(path, req.path),
    });
  },
  transactions: async (req: Request, res: Response) => {
    try {
      const fillter: fillterInterface = req.query;
      const transactions = await TransactionRepository.filter(fillter);
      return res.render("admin/transactions", {
        title: "Transactions",
        transactions,
        t: req.t.bind(req.i18n),
        layout: "layouts/admin",
        activeRoute: "Transactions",
        activeClass: (path: string) => setActiveClass(path, req.path),
      });
    } catch (error) {
      console.error(error);
      sendErrorResponse(res, error);
    }
  },
  createService: async (req: Request, res: Response) => {
    try {
      const serviceInput: ServiceInterface = req.body;
      const service = new Service(serviceInput);
      await service.save();
      res.status(200).json({
        service,
      });
    } catch (error) {
      console.error(error);
      sendErrorResponse(res, error);
    }
  },
  services: async (req: Request, res: Response) => {
    try {
      const services = await Service.find({});
      res.status(200).json({
        services,
      });
    } catch (error) {
      console.error(error);
      sendErrorResponse(res, error);
    }
  },
  editService: async (req: Request, res: Response) => {
    const updateService: UpdateServiceInput = req.body;
    try {
      const service = await Service.findOneAndUpdate(
        { _id: updateService._id },
        updateService
      );
    } catch (error) {
      console.error(error);
      sendErrorResponse(res, error);
    }
  },
};

export default AdminController;
