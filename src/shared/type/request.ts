import { Response } from 'express';
import Joi from 'joi';
import { verifyImei } from "../../until/functions";
import  { ObjectId } from 'mongoose';

const regexPhone = /^(03|05|07|08|09)\d{8}$/

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
        .pattern(regexPhone)
        .required()
        .messages({
            'string.pattern.base': 'Please enter a valid phone number.',
            'any.required': 'Phone number is required.',
        }),
});

export const verifyOtpApiInput = Joi.compile(Joi.object({
    otp: Joi.string().required().messages({
        'any.required': 'OTP is required.',
    }),
    phone: Joi.string()
        .pattern(regexPhone)
        .required()
        .messages({
            'string.pattern.base': 'Phone number must be a valid Vietnamese phone number.',
            'any.required': 'Phone number is required.',
        }),
    imei: Joi.string()
        .custom((value, helpers) => {
            if (!verifyImei(value)) {
                return helpers.message('IMEI is not valid.' as unknown as Joi.LanguageMessages);
            }
            return value;
        })
        .required()
        .messages({
            'any.required': 'IMEI is required.',
        }),
    services_code: Joi.string().required().messages({
        'any.required': 'Services code is required.',
    }),
}));

//admin 

export const loginRequest = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

export const createServiceRequest = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    code: Joi.string().required(),
    api: Joi.string(),
    api_key: Joi.string(),
    status: Joi.string().valid('active', 'inactive').required()
})


export const updateServiceRequest = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string(),
    price: Joi.number(),
    code: Joi.string(),
    api: Joi.string(),
    api_key: Joi.string(),
    status: Joi.string().valid('active', 'inactive')
})
