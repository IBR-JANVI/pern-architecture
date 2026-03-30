# PERN Stack Architecture

A production-grade, scalable PERN (PostgreSQL, Express, React, Node.js) boilerplate with TypeScript, enforcing code quality, consistency, and best practices.

## 🚀 Quick Start

### Prerequisites

- Node.js 20 LTS or higher
- npm 10.x or higher
- PostgreSQL 14+

### Installation

```bash
# Clone the repository
git clone https://github.com/IBR-JANVI/pern-architecture.git
cd pern-architecture

# Install dependencies
npm install

# Setup environment variables
cp backend/.env.example backend/.env

# Generate Prisma client and run migrations
cd backend && npm run db:generate && npm run db:migrate
cd ..

# Start development servers
npm run dev
```

Visit:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/health

## 📁 Project Structure

```
pern-architecture/
├── frontend/                 # React + Vite + TypeScript + Tailwind v4
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service layer (apiClient, auth.service)
│   │   ├── store/            # Zustand state management
│   │   ├── utils/            # Utility functions
│   │   └── __tests__/        # Tests
├── backend/                  # Express + TypeScript + Prisma
│   ├── src/
│   │   ├── config/           # Environment configuration
│   │   ├── controllers/      # Route controllers (thin)
│   │   ├── services/         # Business logic
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Auth, validation, error handling
│   │   ├── validators/       # Zod schemas
│   │   ├── lib/              # Prisma client, logger
│   │   └── utils/            # AppError, helpers
│   └── prisma/
│       └── schema.prisma     # Database schema
├── docs/                     # Documentation
├── .github/workflows/        # CI/CD pipeline
└── package.json              # Workspace root
```

## 🛠️ Tech Stack

### Frontend
- **Vite** - Build tool
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Zustand** - State management
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Vitest** - Testing

### Backend
- **Express** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM
- **PostgreSQL** - Database
- **Zod** - Validation
- **Pino** - Logging
- **JWT** - Authentication

## 📦 Scripts

### Root (Workspace)
```bash
npm run dev              # Run both frontend and backend
npm run dev:frontend    # Run frontend only
npm run dev:backend      # Run backend only
npm run build            # Build both projects
npm run lint             # Lint both projects
npm run test             # Test both projects
```

### Backend
```bash
npm run db:migrate       # Run database migrations
npm run db:generate      # Generate Prisma client
npm run db:seed          # Seed the database
npm run db:studio        # Open Prisma Studio
```

## 🔒 Security

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling
- **HPP** - HTTP Parameter Pollution protection
- **Input Validation** - Zod schemas
- **JWT Authentication** - Token-based auth

## 🧪 Testing

- Coverage threshold: ≥70%
- Fail CI if coverage below threshold
- Unit tests for services
- Integration tests for API endpoints

## 📚 Documentation

- [Project Structure](docs/project-structure.md)
- [Coding Standards](docs/coding-standards.md)
- [Git Workflow](docs/git-workflow.md)
- [Environment Setup](docs/environment-setup.md)
- [Scaling Guidelines](docs/scaling-guidelines.md)

## 🔄 CI/CD

GitHub Actions pipeline:
1. Install dependencies
2. Generate Prisma client
3. Lint code
4. Run tests
5. Check coverage
6. Build
7. Deploy

## 📄 License

MIT License - See LICENSE file