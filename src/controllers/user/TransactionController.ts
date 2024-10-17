import { Request, Response } from "express";
import dayjs from "dayjs";
import Service from "../../models/Service";
import Cart from "../../models/Cart";
import Transaction, { status, statusPayment } from "../../models/Transaction";
import PaymentMethod from "../../models/PaymentMethod";
import { sendErrorResponse } from "../../shared/type";
import mongoose, { isValidObjectId } from "mongoose";

const TransactionController = {
 
  getCheckout: async (req: Request, res: Response) => {
    try {
      const { hashTransaction } = req.params;

      const [paymentMethods, transaction] = await Promise.all([
        PaymentMethod.find({ status: "active" }),
        Transaction.findOne({
          hash_transaction: hashTransaction,
          status: status.new,
          status_payment: statusPayment.unpaid,
        }),
      ]);

      if (!transaction) {
        res
          .status(404)
          .render("404", { title: "Page Not Found", layout: false });
        return;
      }
      let service = await Service.findOne({ code: transaction.services_code });
      if (!service) {
        res
          .status(500)
          .render("500", { title: "Dịch vụ không hợp lệ", layout: false });
        return;
      }
      console.log("transaction", transaction);
      return res.render("user/checkout", {
        title: "Checkout",
        t: req.t.bind(req.i18n),
        transaction,
        service,
        paymentMethods,
      });
    } catch (error) {
      console.error(error);
      sendErrorResponse(res, error);
    }
  },
  listTransaction: async (req: Request, res: Response) => {
    try{
        const { textSearch } = req.query;
        const transactions = await Transaction.find({
          $or: [{ hash_transaction: textSearch }, { phone: textSearch }, { imei: textSearch }],
        });
        if (transactions.length === 0) {
          return res.render("user/search-nodata", {
            title: "không có kết quả",
            t: req.t.bind(req.i18n),
            transactions,
          });
        }
        console.log("transactions", transactions);
        return res.render("user/search", {
          title: "Lịch sử giao dịch",
          t: req.t.bind(req.i18n),
          transactions,
        });
    }catch(error){
        console.error(error);
        sendErrorResponse(res, error);
    }
    
  },
};

export default TransactionController;
