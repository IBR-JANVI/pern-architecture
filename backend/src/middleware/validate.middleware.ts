import type { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../utils/AppError.js';

export const validate = (schema: ZodSchema) => {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = parsed.body;
      req.query = parsed.query;
      req.params = parsed.params;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details: Record<string, string> = {};
        
        for (const err of error.errors) {
          const path = err.path.join('.');
          details[path] = err.message;
        }

        next(new ValidationError('Validation failed', details));
      } else {
        next(error as Error);
      }
    }
  };
};

export const validateBody = (schema: ZodSchema) => {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details: Record<string, string> = {};
        
        for (const err of error.errors) {
          const path = err.path.join('.');
          details[path] = err.message;
        }

        next(new ValidationError('Validation failed', details));
      } else {
        next(error as Error);
      }
    }
  };
};

export const validateQuery = (schema: ZodSchema) => {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      req.query = await schema.parseAsync(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details: Record<string, string> = {};
        
        for (const err of error.errors) {
          const path = err.path.join('.');
          details[path] = err.message;
        }

        next(new ValidationError('Invalid query parameters', details));
      } else {
        next(error as Error);
      }
    }
  };
};