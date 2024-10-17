import { Request, Response } from 'express';
import dayjs from 'dayjs';
import { OtpRepository } from '../../models/Otp';
import Transaction, { TransactionRepository } from '../../models/Transaction';
import { sendErrorResponse } from '../../shared/type';

const OtpController = {
    senOtp: async (req: Request, res: Response) => {
        const { phone } = req.body
        try {
            const OTP = await OtpRepository.createOtp(phone)
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
            const latestOtp = await OtpRepository.getLatestOtp(phone)
            console.log('latestOtp', latestOtp)
            if (!latestOtp || +dayjs(latestOtp.expired_at) < +now || latestOtp.otp != otp) {
                res.status(400).json({
                    status: 'failed',
                    message: 'Invalid OTP.'
                });
                return
            }

            const hash_transaction = +dayjs();
            await TransactionRepository.create({
                hash_transaction, 
                phone,
                imei,
                services_code,
                status: 'new',
                status_payment: 'unpaid',
            });

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