# `@repo/eslint-config`

Shared ESLint configuration package providing consistent code linting rules across the monorepo.

## Description

This package provides:

- Base ESLint configuration
- Next.js specific rules
- React specific rules

The package ensures consistent code quality and style across all packages and applications in the monorepo.

## Usage

### For base configuration

```js
import baseConfig, { restrictEnvAccess } from "@repo/eslint-config/base"

/** @type {import('typescript-eslint').Config} */
export default [...baseConfig]
```

### If you are using `@t3-oss/env-nextjs`

You can combine the base configuration with the `restrictEnvAccess` configuration to ensure that the environment variables are not accessed directly.

```js
import baseConfig, { restrictEnvAccess } from "@repo/eslint-config/base"

/** @type {import('typescript-eslint').Config} */
export default [...baseConfig, ...restrictEnvAccess]
```

### If you are using React

```js
import baseConfig, { restrictEnvAccess } from "@repo/eslint-config/base"

/** @type {import('typescript-eslint').Config} */
export default [...baseConfig, ...reactConfig]
```

### If you are using Next.js

```js
import baseConfig, { restrictEnvAccess } from "@repo/eslint-config/base"

/** @type {import('typescript-eslint').Config} */
export default [
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
  { ignores: [".next/**"] },
]
```
