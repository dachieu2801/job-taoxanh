import { Request, Response } from 'express';
import dayjs from 'dayjs';
import Otp from '../../models/Otp';
import Transaction from '../../models/Transaction';
import Service from '../../models/Service';
import Cart from '../../models/Cart';
import { generateOTP } from '../../until/functions'
import { sendErrorResponse } from '../../shared/type';
// import {
//     sendSuccessResponse,
//     sendErrorResponse
// }
//     from '../shared/type'

const OtpController = {
    senOtp: async (req: Request, res: Response) => {
        const now = dayjs();
        const { phone } = req.body
        const otp = generateOTP()
        try {
            const OTP = new Otp({
                otp,
                phone,
                expired_at: +now.add(15, 'minute')
            });
            await OTP.save();
            console.log('newOtp', OTP)
            res.status(200).json({
                data: { otp: OTP },
                status: 'success',
                message: 'Sent OTP Successfully'
            });
        } catch (error) {
            console.error(error);
            sendErrorResponse(res, error);
        }
    },

    verifyOtpAndCreateTransaction: async (req: Request, res: Response) => {
        const now = dayjs();
        const { otp, phone, imei, services_code } = req.body;
        try {
            const latestOtp = await Otp.findOne({ phone }).sort({ created_at: -1 });
            console.log('latestOtp', latestOtp)

            if (!latestOtp || +dayjs(latestOtp.expired_at) < +now || latestOtp.otp != otp) {
                res.status(400).json({
                    status: 'failed',
                    message: 'Invalid OTP.'
                });
                return
            }

            const hash_transaction = +dayjs();
            const transaction = new Transaction({
                phone,
                imei,
                services_code,
                status: 'new',
                hash_transaction,
                status_payment: 'unpaid',
            });

            await transaction.save();

            res.status(200).json({
                status: 'success',
                message: 'OTP verified successfully.',
                data: hash_transaction
            });
            return

        } catch (error) {
            console.error(error);
            sendErrorResponse(res, error);
        }
    },

}

export default OtpController;