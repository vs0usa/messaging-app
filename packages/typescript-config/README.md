# `@repo/typescript-config`

Shared TypeScript configuration package providing consistent compiler settings across the monorepo.

## Description

This package provides:

- Base TypeScript configuration
- Next.js specific TypeScript settings
- React library configuration
- Strict type checking rules

The package ensures consistent TypeScript compilation settings and type checking across all packages and applications.

## Usage

### Base configuration

```json
{
  "extends": "@repo/typescript-config/base.json"
}
```

### For Next.js applications

```json
{
  "extends": "@repo/typescript-config/nextjs.json"
}
```

### For React libraries

```json
{
  "extends": "@repo/typescript-config/react-library.json"
}
```
