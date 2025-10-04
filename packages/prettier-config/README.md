# `@repo/prettier-config`

Shared Prettier configuration package providing consistent code formatting across the monorepo.

## Description

This package provides:

- Consistent code formatting rules
- Import sorting with @ianvs/prettier-plugin-sort-imports
- Tailwind CSS class sorting
- TypeScript support
- Monorepo-optimized configuration

The package ensures consistent code formatting and import organization across all packages and applications.

## Usage

```json
{
  "prettier": "@repo/prettier-config"
}
```

Or in package.json:

```json
{
  "name": "@repo/...",
  "...": "...",
  "prettier": "@repo/prettier-config"
}
```
