import { Request, Response } from "express";
import Transaction from "../../models/Transaction";

const ServiceController = {
  getInforServive: async (req: Request, res: Response) => {
    const { hashTransaction } = req.params;
    const transaction = await Transaction.findOne({
      hash_transaction: hashTransaction,
    });
    if (!transaction) {
      res
        .status(404)
        .render("404", { title: "Transaction Not Found", layout: false });
      return;
    }
    console.log("transaction", transaction);
    if (transaction.status_payment === "unpaid") {
      return res.render("user/service-unpaid", {
        title: "Chưa Thanh Toán",
        t: req.t.bind(req.i18n),
        transaction,
      });
    } else if (transaction.status_payment === "paid") {
      return res.render("user/service", {
        title: "Dịch vụ",
        t: req.t.bind(req.i18n),
        transaction,
      });
    }
    return res.render("500", {
      title: "Internal Server Error",
      layout: false,
    });
  },
};

export default ServiceController;
