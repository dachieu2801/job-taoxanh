import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import dotenv from "dotenv";
import { sendErrorResponse } from '../type/response';
dotenv.config();

export const validationMiddleware = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(422).json({
        message: 'Validation error',
        status: 'failed',
        data: error.details.map((err) => err.message),
      })
      return
    }
    next();
  };
};

export const authToken = (req: any, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/admin/login');
  }
};

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);  
  sendErrorResponse(res, error);  
};