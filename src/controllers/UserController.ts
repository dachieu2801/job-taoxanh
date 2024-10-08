import { Request, Response } from 'express';
import User from '../models/Transactions';

// Route để tạo một người dùng mới
const UserController = {
    createUser: async (req: Request, res: Response) => {
        const { phone, imei } = req.body;

        console.log('req.body',req.body);
        try {
            // const newUser = new User({ phone, imei });
            // await newUser.save();
            res.status(201).json({ message: 'Create user successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    },

}

export default UserController;

