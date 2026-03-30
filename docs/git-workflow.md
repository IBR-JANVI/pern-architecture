# Git Workflow

## Branch Strategy

```
main      → Production-ready code
dev       → Development integration branch
feature/* → Feature branches
bugfix/*  → Bug fix branches
hotfix/*  → Emergency production fixes
```

## Workflow

### 1. Feature Development

```bash
# Create feature branch from dev
git checkout dev
git pull origin dev
git checkout -b feature/my-feature

# Make changes, commit with conventional commits
git add .
git commit -m "feat: add user authentication"

# Push and create PR to dev
git push -u origin feature/my-feature
```

### 2. Bug Fixes

```bash
# Create bugfix branch from dev
git checkout dev
git pull origin dev
git checkout -b bugfix/fix-login-issue

# Fix and commit
git add .
git commit -m "fix: resolve login redirect issue"

# Push and create PR
git push -u origin bugfix/fix-login-issue
```

### 3. Hotfixes

```bash
# Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-patch

# Fix and commit
git add .
git commit -m "hotfix: address security vulnerability"

# Push and create PR to main
git push -u origin hotfix/critical-security-patch
```

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Description |
|------|-------------|
| feat | New feature |
| fix | Bug fix |
| docs | Documentation changes |
| style | Code style changes (formatting, semicolons, etc) |
| refactor | Code refactoring |
| test | Adding or updating tests |
| chore | Maintenance tasks |

### Examples

```bash
feat(auth): add JWT token refresh mechanism

- Implements automatic token refresh before expiration
- Handles 401 errors gracefully
- Updates auth store on successful refresh

Closes #123
```

## Pull Request Guidelines

1. **Title**: Use conventional commit format
2. **Description**: Explain what and why, not how
3. **Screenshots**: Required for UI changes
4. **Tests**: All new features must have tests
5. **Linting**: Must pass before merge
6. **Coverage**: Must maintain ≥70% coverage

## Protected Branches

- `main`: Requires PR approval, passing CI, linear history
- `dev`: Requires passing CI

## Tagging

```bash
# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tags
git push origin --tags
```

## Git Hooks

This project uses Husky for git hooks:

- `pre-commit`: Runs lint-staged
- `commit-msg`: Validates commit message format