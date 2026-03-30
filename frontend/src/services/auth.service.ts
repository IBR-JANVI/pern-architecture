import { apiClient } from './apiClient';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: Record<string, unknown>;
  };
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        error: {
          message: (error as Error).message || 'Login failed',
          code: 'AUTH_ERROR',
        },
      };
    }
  }

  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        error: {
          message: (error as Error).message || 'Registration failed',
          code: 'AUTH_ERROR',
        },
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
    }
  }

  async getCurrentUser(): Promise<ApiResponse<AuthResponse['user']>> {
    try {
      const response = await apiClient.get<AuthResponse['user']>('/auth/me');
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        error: {
          message: (error as Error).message || 'Failed to get user',
          code: 'AUTH_ERROR',
        },
      };
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}

export const authService = new AuthService();
export default AuthService;