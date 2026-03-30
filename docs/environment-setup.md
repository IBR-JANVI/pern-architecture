# Environment Setup

## Prerequisites

- **Node.js**: v20 LTS or higher
- **npm**: v10.x or higher
- **PostgreSQL**: v14+ (for local development)
- **Git**: v2.x+

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/IBR-JANVI/pern-architecture.git
cd pern-architecture
```

### 2. Install Dependencies

```bash
npm install
```

This will install all dependencies for both frontend and backend workspaces.

### 3. Environment Configuration

#### Backend

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your local values:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pern_architecture
JWT_SECRET=your-super-secret-key-at-least-32-characters-long
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

#### Frontend

Create `.env` file in frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Database Setup

#### Install PostgreSQL (if not installed)

**macOS (using Homebrew):**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Windows:**
Download and install from https://www.postgresql.org/download/windows/

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Create Database

```bash
# Access PostgreSQL
sudo -u postgres psql

# Create database
CREATE DATABASE pern_architecture;

# Create user (optional)
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE pern_architecture TO myuser;

# Exit
\q
```

#### Run Prisma Migrations

```bash
cd backend
npm run db:generate
npm run db:migrate

# Optional: Seed the database
npm run db:seed
```

### 5. Run the Application

#### Development Mode

From the root directory:
```bash
npm run dev
```

This runs both frontend (port 3000) and backend (port 5000) concurrently.

#### Individual Services

```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

### 6. Verify Installation

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/health
- Prisma Studio: `npm run db:studio` in backend directory

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000
# or on Windows
netstat -ano | findstr :5000

# Kill the process
kill -9 <PID>
```

### Database Connection Issues

1. Check PostgreSQL is running
2. Verify DATABASE_URL in .env
3. Ensure database exists
4. Check user permissions

### Node Module Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules frontend/node_modules backend/node_modules
npm install