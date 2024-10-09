import { Response } from 'express';


// Hàm để gửi phản hồi thất bại (nếu cần)
export const sendErrorResponse = (res: Response, err: any) => {
    res.status(500).json({
        data: null,
        status: 'failed',
        message: err instanceof Error ? err.message : 'Has error'
    });
};