import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { userService } from './user.service.js';
import { UnauthorizedError, BadRequestError } from '../utils/AppError.js';
import type { User } from '@prisma/client';

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export class AuthService {
  private generateToken(user: User): string {
    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await userService.create({
      email: data.email,
      name: data.name,
      password: hashedPassword,
    });

    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name || '',
      },
    };
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const user = await userService.findByEmail(credentials.email);

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name || '',
      },
    };
  }

  async logout(_userId: string): Promise<void> {
    // In a real application, you might want to blacklist the token
    // or maintain a server-side session store
  }

  async getCurrentUser(userId: string): Promise<AuthResponse['user']> {
    const user = await userService.findById(userId);

    return {
      id: user.id,
      email: user.email,
      name: user.name || '',
    };
  }
}

export const authService = new AuthService();
export default AuthService;