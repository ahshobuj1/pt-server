## 🚀 Features

- **Framework**: [NestJS](https://nestjs.com/) (stable version)
- **Database**: [Prisma ORM](https://www.prisma.io/) with PostgreSQL support
- **Authentication**:
  - JWT-managed Access and Refresh tokens
  - Cookie-based refresh tokens for enhanced security
- **Security**:
  - **Public-by-Default**: All routes are public unless explicitly secured
  - **Explicit Protection**: Use the `@Auth()` decorator to secure routes
  - **RBAC**: Role-Based Access Control integrated into the `@Auth()` decorator
- **API Response**: Global interceptor for standardized API response structures
- **Validation**: Integrated `class-validator` and `class-transformer`
- **Error Handling**: Global exception filter for consistent error formatting
- **Environment Management**: Configured with `@nestjs/config`

## 🛠️ Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ahshobuj1/project-name
   cd project-name
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update the variables in `.env` (especially `DATABASE_URL` and JWT secrets).

4. **Database Setup**:
   - Generate Prisma Client:
     ```bash
     npx prisma generate
     ```
   - Run migrations to set up your database schema:
     ```bash
     npx prisma migrate dev
     ```

## 🏃 Running the Application

- **Development Mode**:
  ```bash
  npm run dev
  ```
- **Production Build**:
  ```bash
  npm run build
  npm run start:prod
  ```

---

## 📖 Example Usage Guide

### 1. Securing Routes (`@Auth`)

By default, all routes are **public**. To secure a route, use the `@Auth()` decorator.

- **Requires valid login**:

  ```typescript
  @Get('profile')
  @Auth()
  getProfile() { ... }
  ```

- **Requires specific roles**:
  ```typescript
  @Post('admin-only')
  @Auth(UserRole.ADMIN)
  createAdminTask() { ... }
  ```

### 2. Getting Current User (`@CurrentUser`)

Use the `@CurrentUser()` decorator to access the authenticated user's data from the request.

```typescript
@Get('me')
@Auth()
getMe(@CurrentUser() user: any) {
  return user;
}
```

### 3. Custom Response Metadata (`@ResponseMessage`)

To add a custom message to your standardized API response:

```typescript
@Post()
@ResponseMessage('Resource created successfully!')
create() { ... }
```

### 4. Swagger Documentation

Access the automatic Swagger UI at: `https://assesment-production.up.railway.app/api/docs` (default port).

---

## 📁 Project Structure

- `src/modules`: Feature-based modules (Auth, Users, etc.)
- `src/common`: Reusable decorators, guards, filters, and interceptors
- `prisma`: Database schema and migration files
- `.env`: Environment configurations (keep this secret!)
