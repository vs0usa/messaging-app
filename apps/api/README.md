# `@repo/api`

The backend API server for the messaging application. Built with Hono framework, it provides RESTful endpoints and WebSocket support for real-time messaging functionality.

## Description

This API server handles:

- User authentication and authorization
- Real-time messaging via WebSocket connections
- Contact management
- Message persistence and retrieval
- File attachments support

The server is built with TypeScript and uses a PostgreSQL database for data persistence. It provides a clean, type-safe API for the frontend application.

## Useful Commands

- `pnpm dev` - Start the development server with hot reload
- `pnpm build` - Build the production bundle
- `pnpm start` - Start the production server
