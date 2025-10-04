# `@repo/ui`

Shared UI component library built with Radix UI primitives and Tailwind CSS.

## Description

This package provides:

- Reusable React components
- Tailwind CSS styling
- Type-safe component props
- Accessibility-first design
- Dark/light theme support

The package serves as the design system for the entire application, ensuring consistent UI components and styling across all packages and applications.

## Usage

```tsx
import { Avatar } from "@repo/ui/components/avatar"
import { Button } from "@repo/ui/components/button"

// Use components in your app
function MyComponent() {
  return (
    <div>
      <Avatar src="/avatar.jpg" alt="User" />
      <Button variant="primary">Click me</Button>
    </div>
  )
}
```

### Importing styles

```ts
import "@repo/ui/globals.css"
```

## Useful Commands

- `pnpm add:component` - Add new shadcn/ui components to the library
