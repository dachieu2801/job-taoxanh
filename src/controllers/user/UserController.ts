import { Request, Response } from "express";
import Service from "../../models/Service";

const UserController = {
  home: async (req: Request, res: Response) => {
    const services = await Service.find();
    return res.render("user/home", {
      title: "APPLE GREEN",
      t: req.t.bind(req.i18n),
      services,
      layout: "layouts/main",
    });
  },
};

export default UserController;
