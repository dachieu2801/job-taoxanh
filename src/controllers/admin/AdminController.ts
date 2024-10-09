
import { Request, Response } from 'express';
import dayjs from 'dayjs';
import Service from '../../models/Service';
// import {
//     sendSuccessResponse,
//     sendErrorResponse
// }
//     from '../shared/type'

const AdminController = {


    indexAdmin: (req: Request, res: Response) => {
        const greeting = req.t("greeting");
        console.log(greeting);
        res.render("admin/dashboard", { title: "Admin", t: req.t.bind(req.i18n) });
    },

    createService: async (req: Request, res: Response) => {
        try {
            const now = dayjs();
            const { name, price, code, api, api_key, status } = req.body
            const service = new Service({
                name,
                price,
                code,
                api,
                api_key,
                status,
            }); 
            await service.save();
            res.status(200).json({
                service
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                data: null,
                status: 'failed',
                message: error instanceof Error ? error.message : 'Has error'
            });
        }
    }




}

export default AdminController;