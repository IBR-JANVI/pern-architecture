import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';
import logger from '../lib/logger.js';

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    logger.warn({
      statusCode: err.statusCode,
      code: err.code,
      message: err.message,
      stack: err.stack,
    });

    res.status(err.statusCode).json(err.toJSON());
    return;
  }

  logger.error({
    message: err.message,
    stack: err.stack,
  });

  if (process.env.NODE_ENV === 'development') {
    res.status(500).json({
      success: false,
      error: {
        message: err.message,
        code: 'INTERNAL_ERROR',
        stack: err.stack,
      },
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR',
    },
  });
};

export const notFoundMiddleware = (_req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Resource not found',
      code: 'NOT_FOUND',
    },
  });
};