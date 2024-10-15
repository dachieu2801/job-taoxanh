import { Response } from 'express';
import Joi from 'joi';

export const sendErrorResponse = (res: Response, err: any) => {
    res.status(500).json({
        data: null,
        status: 'failed',
        message: err instanceof Error ? err.message : 'Has error'
    });
    return
};

export const fallbackSepayInput = Joi.object({
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