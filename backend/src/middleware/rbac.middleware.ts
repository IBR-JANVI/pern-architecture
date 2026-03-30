import type { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware.js';
import { ForbiddenError } from '../utils/AppError.js';

type Role = 'USER' | 'ADMIN';

export const requireRole = (...roles: Role[]) => {
  return (
    req: AuthRequest,
    _res: Response,
    next: NextFunction
  ): void => {
    if (!req.user) {
      next(new ForbiddenError('User not authenticated'));
      return;
    }

    if (!roles.includes(req.user.role as Role)) {
      next(new ForbiddenError('Insufficient permissions'));
      return;
    }

    next();
  };
};

export const requireAdmin = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    next(new ForbiddenError('User not authenticated'));
    return;
  }

  if (req.user.role !== 'ADMIN') {
    next(new ForbiddenError('Admin access required'));
    return;
  }

  next();
};