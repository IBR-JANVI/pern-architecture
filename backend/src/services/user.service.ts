import { prisma } from '../lib/prisma.js';
import { NotFoundError, ConflictError } from '../utils/AppError.js';

export type UserRole = 'USER' | 'ADMIN';

export interface UserType {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithPassword extends UserResponse {
  password: string;
}

export interface CreateUserData {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
}

export class UserService {
  async findById(id: string): Promise<UserResponse> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async findByIdWithPassword(id: string): Promise<UserWithPassword | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user as UserWithPassword | null;
  }

  async findByEmail(email: string): Promise<UserResponse | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async findByEmailWithPassword(email: string): Promise<UserWithPassword | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user as UserWithPassword | null;
  }

  async create(data: CreateUserData): Promise<UserResponse> {
    const existingUser = await this.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
        role: data.role || 'USER',
      },
    });

    return user;
  }

  async update(id: string, data: UpdateUserData): Promise<UserResponse> {
    const user = await this.findById(id);

    if (data.email && data.email !== user.email) {
      const existingUser = await this.findByEmail(data.email);
      if (existingUser) {
        throw new ConflictError('User with this email already exists');
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await prisma.user.delete({
      where: { id },
    });
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return users;
  }
}

export const userService = new UserService();
export default UserService;