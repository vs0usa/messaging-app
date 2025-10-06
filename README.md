# messaging-app

A modern, real-time messaging application built with Next.js, Hono, and PostgreSQL. Features include real-time chat, contact management, file attachments, and a responsive design with dark/light theme support.

Visit [docs/](./docs/) for comprehensive documentation.

## Getting Started

### Prerequisites

- **Node.js**: Version 22 or higher
- **pnpm**: Version 9.0.0 or higher
- **Docker**: Any recent version

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/vs0usa/messaging-app
   cd messaging-app
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**

   ```bash
   # Start PostgreSQL (if using Docker)
   docker-compose up -d
   
   # Run migrations
   pnpm -F @repo/db run kysely migrate:latest

   # Run seeds
   pnpm -F @repo/db run kysely seed run
   ```

5. **Start development servers**

   ```bash
   pnpm dev
   ```

6. **Download Playwright browsers** (only needed for E2E tests)

   See more in [TESTING.md](./docs/TESTING.md#setting-up-playwright)

   ```bash
   pnpm exec playwright install
   ```

### Environment Variables

All environment variables should be stored in the `.env` file in the root directory. There is a `.env.example` file that you can use as a template.

## Development Workflow

### Available Scripts

#### Root Level

- `pnpm dev` - Start all development servers
- `pnpm knip` - Run knip
- `pnpm test:run` - Run unit tests
- `pnpm build` - Build all packages and apps
- `pnpm lint` - Lint all packages and apps
- `pnpm lint:fix` - Fix all linting errors
- `pnpm lint:ws` - Lint all workspaces using sherif
- `pnpm format` - Format all code
- `pnpm format:fix` - Fix all code formatting
- `pnpm check-types` - Type check all packages and apps

#### Individual Packages

Each package has its own scripts for development, building, and testing. You can refer to the package README files for more information.
