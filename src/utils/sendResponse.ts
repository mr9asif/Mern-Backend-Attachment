import { Response } from "express";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
  data?: T | null;
}

const sendResponse = <T>(res: Response, data: IResponse<T>): void => {
  const responseData: Record<string, unknown> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
  };

  if (data.meta) {
    responseData.meta = data.meta;
  }

  if (data.data !== undefined) {
    responseData.data = data.data;
  }

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
