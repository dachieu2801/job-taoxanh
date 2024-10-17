
import { Request, Response } from 'express';
import dayjs from 'dayjs';
import dotenv from "dotenv";
import Service from '../../models/Service';
import UserAdmin, { UserAdminDTO } from '../../models/UserAdmin';
import { verifyPassword } from '../../until/functions'
import { TransactionRepository, fillterInterface } from '../../models/Transaction'
import { sendErrorResponse } from '../../shared/type/index';
import { getJSDocReturnTag } from 'typescript';

dotenv.config();

const AdminController = {

    showLogin: async (req: Request, res: Response) => {
        return res.render("admin/auth", { title: "Admin", t: req.t.bind(req.i18n) });
    },

    login: async (req: any, res: Response) => {
        const { username, password } = req.body;
        const user: UserAdminDTO | null = await UserAdmin.findOne({ username });
        if (!user) {
            res.status(404).json({ status: 'failed', message: 'Invalid username or password' })
            return
        }

        const isMatch = await verifyPassword(password, user.password);
        if (!isMatch) {
            res.status(404).json({ status: 'failed', message: 'Invalid username or password' })
            return
        }
        req.session.user = { username };

        res.redirect('/admin/dashboard');
    },

    indexAdmin: (req: Request, res: Response) => {
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
    },
    transactions: async (req: Request, res: Response) => {
        try {
            const fillter: fillterInterface = req.query
            const transactions = await TransactionRepository.filter(fillter);
            res.json({ transactions })
            return
        } catch (error) {
            console.error(error);
            sendErrorResponse(res, error);
        }
    }




}

export default AdminController;