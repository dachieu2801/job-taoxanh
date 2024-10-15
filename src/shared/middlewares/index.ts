import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

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
