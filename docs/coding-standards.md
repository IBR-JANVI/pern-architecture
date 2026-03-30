# Coding Standards

## TypeScript

- Use strict mode in all TypeScript configurations
- Prefer `interface` over `type` for object shapes
- Use `type` for unions, intersections, and utility types
- Always define return types for functions
- Use `unknown` instead of `any` when type is not known
- Use `readonly` for immutable data structures

## React Components

```typescript
// ✅ Good
import type { ReactElement } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

function Button({ children, onClick, variant = 'primary' }: ButtonProps): ReactElement {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

// ❌ Bad
function Button(props) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
```

## Error Handling

```typescript
// ✅ Good - Custom errors
throw new AppError('Resource not found', 404, 'NOT_FOUND');

// ✅ Good - Service layer errors
async findById(id: string): Promise<User> {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new NotFoundError('User not found');
  return user;
}

// ❌ Bad - Raw error handling
async findById(id: string): Promise<User> {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error('User not found');
  return user;
}
```

## API Response Format

```typescript
// Success response
{
  "success": true,
  "data": { ... }
}

// Error response
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": { ... }
  }
}
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `userData`, `isLoading` |
| Functions | camelCase | `getUserById`, `handleSubmit` |
| Classes | PascalCase | `UserService`, `AuthController` |
| Interfaces | PascalCase | `UserProps`, `ApiResponse` |
| Constants | UPPER_SNAKE | `MAX_RETRIES`, `API_URL` |
| Files | kebab-case | `user-service.ts`, `auth-middleware.ts` |

## State Management (Zustand)

```typescript
// ✅ Good
interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
}));

// ❌ Bad - Logic in components
function MyComponent() {
  const [user, setUser] = useState(null);
  // ...
}
```

## API Service Pattern

```typescript
// ✅ Good - All API calls in services
class UserService {
  async getUsers(): Promise<User[]> {
    return apiClient.get<User[]>('/users');
  }
}

// ❌ Bad - API calls in components
function UsersPage() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios.get('/users').then(res => setUsers(res.data));
  }, []);
}