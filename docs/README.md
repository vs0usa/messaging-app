# Messaging App Documentation

A comprehensive guide to the messaging application architecture, features, and development workflow.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)

## Features

### Core Messaging

- **Real-time messaging** - Instant message delivery via WebSocket connections
- **Message history** - Persistent message storage and retrieval
- **File attachments** - Support for file uploads and sharing
- **Message deletion** - Delete your own messages with confirmation

### User Experience

- **Responsive design** - Works seamlessly on desktop and mobile devices
- **Dark/Light themes** - Toggle between dark and light mode
- **Auto-scroll** - Messages automatically scroll to bottom
- **Typing indicators** - See when contacts are typing
- **Message timestamps** - Formatted date and time display

### Authentication & Security

- **User authentication** - Secure login and registration
- **Session management** - Persistent user sessions
- **Password security** - Secure password hashing
- **Route protection** - Protected routes and API endpoints

## Architecture

### Monorepo Structure

The project uses a monorepo architecture with the following structure:

```no-highlight
messaging-app/
├── apps/                  # Applications
│   ├── api/                 # Backend API server
│   └── web/                 # Frontend web application
├── packages/              # Shared packages
│   ├── auth/                # Authentication package
│   ├── config/              # Configuration package
│   ├── db/                  # Database package
│   ├── eslint-config/       # ESLint configuration
│   ├── github-config/       # GitHub Actions config
│   ├── prettier-config/     # Prettier configuration
│   ├── typescript-config/   # TypeScript configuration
│   └── ui/                  # UI component library
└── docs/                  # Documentation
```

### Data Flow

1. **User Authentication**: Users authenticate through the web app, which communicates with the API server
2. **Real-time Messaging**: WebSocket connections handle real-time message delivery
3. **Data Persistence**: Messages and user data are stored in PostgreSQL
4. **State Management**: Frontend state is managed with Zustand stores

## Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **State Management**: Zustand with tab synchronization
- **Forms**: React Hook Form with Zod validation
- **WebSocket**: Native WebSocket API
- **Icons**: Lucide React
- **Animations**: Framer Motion

### Backend

- **Framework**: Hono
- **Language**: TypeScript
- **Database**: PostgreSQL with Kysely ORM
- **Authentication**: Better Auth
- **WebSocket**: Hono WebSocket integration
- **Validation**: Zod schemas
- **Environment**: Node.js 22+

### Development Tools

- **Package Manager**: pnpm
- **Monorepo**: Turbo
- **Linting**: ESLint with custom configs
- **Formatting**: Prettier with custom configs
- **Type Checking**: TypeScript
- **Code Quality**: Knip for unused code detection
- **Testing**: Vitest for unit tests & Playwright for E2E tests

## Project Structure

### Apps

#### `apps/api` - Backend API Server

- RESTful API endpoints
- WebSocket server for real-time messaging
- Authentication middleware
- Database integration
- File upload handling

See more in [apps/api/README.md](../apps/api/README.md)

#### `apps/web` - Frontend Web Application

- Next.js application with App Router
- Real-time messaging interface
- User authentication flows
- Responsive design
- Theme switching

See more in [apps/web/README.md](../apps/web/README.md)

### Packages

#### `packages/auth` - Authentication

- Better Auth integration
- Client and server configurations
- Session management
- Database migrations

See more in [packages/auth/README.md](../packages/auth/README.md)

#### `packages/config` - Configuration

- Environment variable validation
- Shared configuration objects
- Type-safe settings

See more in [packages/config/README.md](../packages/config/README.md)

#### `packages/db` - Database

- Kysely integration
- Type-safe database queries and mutations
- Migration utilities
- Schema definitions

See more in [packages/db/README.md](../packages/db/README.md)

#### `packages/ui` - UI Components

- Reusable React components
- Tailwind CSS styling
- Design system

See more in [packages/ui/README.md](../packages/ui/README.md)

#### `packages/*-config` - Development Tools

- ESLint, Prettier, TypeScript configurations
- GitHub Actions workflows
- Shared development standards
