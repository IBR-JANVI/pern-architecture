# Project Structure

```
pern-architecture/
├── frontend/                 # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service layer
│   │   │   ├── apiClient.ts  # Axios instance with interceptors
│   │   │   └── auth.service.ts
│   │   ├── store/            # Zustand state management
│   │   │   ├── useAuthStore.ts
│   │   │   ├── useAppStore.ts
│   │   │   └── index.ts
│   │   ├── utils/            # Utility functions
│   │   ├── __tests__/        # Frontend tests
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css         # Tailwind CSS
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── index.html
│
├── backend/                  # Express + TypeScript
│   ├── src/
│   │   ├── config/           # Configuration
│   │   │   └── env.ts        # Environment validation
│   │   ├── controllers/      # Route controllers (thin)
│   │   ├── services/         # Business logic
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Express middleware
│   │   │   ├── auth.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   ├── validate.middleware.ts
│   │   │   ├── logger.middleware.ts
│   │   │   └── rbac.middleware.ts
│   │   ├── validators/      # Zod schemas
│   │   ├── lib/              # Libraries
│   │   │   ├── prisma.ts     # Prisma client singleton
│   │   │   └── logger.ts     # Pino logger
│   │   ├── utils/            # Utilities
│   │   │   └── AppError.ts   # Custom error classes
│   │   ├── __tests__/        # Backend tests
│   │   └── server.ts         # Express app entry
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── seed.ts           # Database seed
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                     # Documentation
│   ├── project-structure.md
│   ├── coding-standards.md
│   ├── git-workflow.md
│   ├── environment-setup.md
│   └── scaling-guidelines.md
│
├── .github/                  # GitHub configuration
│   └── workflows/
│       └── ci.yml            # CI/CD pipeline
│
├── package.json              # Workspace root
├── tsconfig.json
├── .gitignore
├── .editorconfig
├── .eslintrc.cjs
├── .prettierrc.cjs
└── README.md
```

## Architecture Flow

```
Routes → Middleware → Controllers → Services → Prisma → Database
```

## Key Principles

1. **Controllers are thin** - Only handle request/response
2. **Services contain business logic** - All database access goes here
3. **Prisma only in services** - Never in controllers
4. **API calls only in services** - Never in components
5. **Single Prisma instance** - Singleton pattern with global caching