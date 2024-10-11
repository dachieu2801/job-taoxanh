import { Request, Response } from "express";
import dayjs from "dayjs";
import Service from "../../models/Service";
import Cart from "../../models/Cart";
import Transaction from "../../models/Transaction";
import PaymentMethod from "../../models/PaymentMethod";
import { sendErrorResponse } from "../../shared/type";
import mongoose, { isValidObjectId } from "mongoose";

const UserController = {
    home: async (req: Request, res: Response) => {
        const services = await Service.find();
        return res.render("user/home", {
            title: "APPLE GREEN",
            t: req.t.bind(req.i18n),
            services,
        });
    },
    getCheckout: async (req: Request, res: Response) => {
        try {
            const { phone } = req.params;

            const [paymentMethods, cart] = await Promise.all([
                PaymentMethod.find({ status: 'active' }),
                Cart.findOne({ phone, status: 'new' }).sort({ created_at: -1 }).exec()
            ]);

            if (!cart) {
                res.status(404).render("404", { title: "Page Not Found", layout: false });
                return
            }
            let service = await Service.findOne({ code: cart.services_code });
            if (!service) {
                res.status(404).render("404", { title: "Page Not Found", layout: false });
                return
            }
            console.log('cart', cart)
            console.log('service', service)
            return res.render("user/checkout", {
                title: "Checkout",
                t: req.t.bind(req.i18n),
                cart, service, paymentMethods
            });

        } catch (error) {
            console.error(error);
            sendErrorResponse(res, error);
        }
    },
    checkout: async (req: Request, res: Response) => {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const now = +dayjs();

            const { cartId, paymentMethodId } = req.body;
            if (!isValidObjectId(cartId) || !isValidObjectId(paymentMethodId)) {
                res.status(400).json({ message: "Phương thức thanh toán hoặc đơn hàng không hợp lệ." });
                return;
            }

            const [paymentMethod, cart] = await Promise.all([
                PaymentMethod.findOne({ status: 'active', _id: paymentMethodId }).session(session),
                Cart.findOne({ _id: cartId }).session(session)
            ]);

            if (!paymentMethod || !cart || paymentMethod.status !== 'active' || cart.status !== 'new') {
                await session.abortTransaction();
                res.status(400).json({
                    status: 'error',
                    message: 'Phương thức thanh toán hoặc giỏ hàng không hợp lệ.'
                });
                return;
            }
            //
            //logic thanh toán ở đây
            //

            cart.status = 'paid';
            await cart.save({ session });

            const transaction = new Transaction({
                phone: cart.phone,
                imei: cart.imei,
                services_code: cart.services_code,
                request: '',
                response: '',
                hash_transaction: now.toString(),
                status: 'new',
            });

            await transaction.save({ session });

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                status: 'success',
                data: transaction,
                message: 'Checkout successfully'
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error(error);
            sendErrorResponse(res, error);
        }
    },


};

export default UserController;
