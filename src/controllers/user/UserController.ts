import { Request, Response } from 'express';
import dayjs from 'dayjs';
import Otp from '../../models/Otp';
import Service from '../../models/Service';
import Cart from '../../models/Cart';
import { generateOTP } from '../../until/functions'
import { sendErrorResponse } from '../../shared/type';
// import {
//     sendSuccessResponse,
//     sendErrorResponse
// }
//     from '../shared/type'

const UserController = {
    home: async (req: Request, res: Response) => {
        const services = await Service.find();
        return res.render("index", {
            title: "APPLE GREEN",
            t: req.t.bind(req.i18n),
            services
        });
    },
    checkout: async(req: Request, res: Response) => {
        const { phone } = req.params;
        res.json({
            phone})
    }
}

export default UserController;