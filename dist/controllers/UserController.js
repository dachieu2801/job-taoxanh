"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
// Route để tạo một người dùng mới
const UserController = {
    createUser: async (req, res) => {
        const { phone, imei } = req.body;
        console.log('req.body', req.body);
        try {
            const newUser = new User_1.default({ phone, imei });
            await newUser.save();
            res.status(201).json(newUser);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    },
};
exports.default = UserController;
