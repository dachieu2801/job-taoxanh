import { Response } from 'express';
import Joi from 'joi';
import { verifyImei } from "../../until/functions";

export const sendErrorResponse = (res: Response, err: any) => {
    res.status(500).json({
        data: null,
        status: 'failed',
        message: err instanceof Error ? err.message : 'Has error'
    });
    return
};

export const fallbackSepayApiInput = Joi.object({
    gateway: Joi.string().required(),
    transactionDate: Joi.string().isoDate().required(),
    accountNumber: Joi.string().required(),
    subAccount: Joi.string().required(),
    code: Joi.string().required(),
    content: Joi.string().required(),
    transferType: Joi.string().valid('in', 'out').required(),
    description: Joi.string().required(),
    transferAmount: Joi.number().positive().required(),
    referenceCode: Joi.string().required(),
    accumulated: Joi.number().min(0).required(),
    id: Joi.number().positive().required()
});

export const optApiInput = Joi.object({
    phone: Joi.string()
        .pattern(/^(03|05|07|08|09)\d{8}$/)
        .required()
        .messages({
            'string.pattern.base': 'Please enter a valid phone number.',
            'any.required': 'Phone number is required.',
        }),
});

export const ApiInput = Joi.object({
    otp: Joi.string().required().messages({
        'any.required': 'OTP is required.',
    }),
    phone: Joi.string()
        .pattern(/^(03|05|07|08|09)\d{8}$/)
        .required()
        .messages({
            'string.pattern.base': 'Please enter a valid phone number.',
            'any.required': 'Phone number is required.',
        }),
    imei: Joi.string()
        .required()
        .messages({
            'any.required': 'IMEI is required.',
        }),
    services_code: Joi.string().required().messages({
        'any.required': 'Services code is required.',
    }),
});