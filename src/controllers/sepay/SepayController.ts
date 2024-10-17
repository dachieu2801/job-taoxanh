import { Request, Response } from 'express';
import dayjs from 'dayjs';
import Transaction, { statusPayment, status } from '../../models/Transaction';
import Service, { servicesCode } from '../../models/Service';
import { sendErrorResponse } from '../../shared/type';
import PaymentMethod, { paymentMethodCode, signFirstInCodeFallback } from '../../models/PaymentMethod';
import { fetchApi } from '../../shared/fetchApi/index';
const SepayController = {
    fallback: async (req: Request, res: Response) => {
        try {
            const body = { ...req.body };
            const sepayMethod = await PaymentMethod.findOne({ code: paymentMethodCode.sepay });
            if (
                sepayMethod?.bankAcc != body.subAccount ||
                sepayMethod?.nameBank != body.gateway ||
                !body.code.startsWith(signFirstInCodeFallback)
            ) {
                res.status(422).json({
                    status: 'failed',
                    message: 'Invalid fields'
                })
                return
            } else {
                body.code = body.code.replace(`${signFirstInCodeFallback}`, '');
            }

            const transaction = await Transaction.findOne({
                hash_transaction: body.code,
                status: status.new,
                status_payment: statusPayment.unpaid
            });

            if (!transaction) {
                res.status(404).json({
                    status: 'failed',
                    message: 'Transaction not found'
                })
                return
            }

            const service = await Service.findOne({ code: transaction.services_code });
            if (!service) {
                res.status(404).json({
                    status: 'failed',
                    message: 'service not found'
                })
                return
            }

            //nếu là dịch vụ check imei
            if (servicesCode.checkImei === transaction.services_code) {
                const responseService = await fetchApi(`${service.api}&imei=${transaction.imei}`);

                if(responseService.status == 'success'){
                    transaction.status = status.success
                } else {
                    transaction.status = status.failed
                    //handle error
                }
                
                transaction.response_user = JSON.stringify(responseService);
            }

            transaction.status_payment = statusPayment.paid;
            transaction.response_payment = JSON.stringify(req.body);

            await transaction.save();
            
            console.log('transaction', {
                message: 'Transaction paid and response service successfully',
                data: { hash_transaction: transaction.hash_transaction }
            });
            res.status(201).json({
                status: 'success',
                message: 'Transaction paid and response service successfully',
                data: { hash_transaction: transaction.hash_transaction }
            })


        } catch (error) {
            console.error('fallback sepay', error);
            sendErrorResponse(res, error);
        }
    }

}

export default SepayController;