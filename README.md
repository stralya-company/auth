# @stralya/auth

**A lightweight, opinionated authentication layer for Prisma-based applications.**  
Includes user, role, and permission management — with built-in CLI and seed tooling.

![npm](https://img.shields.io/npm/v/@stralya/auth) ![license](https://img.shields.io/npm/l/@stralya/auth)

---

## Features

- 🔐 Full authentication base (User, Role, Permission)
- ⚙️ CLI integration to manage roles and permissions
- 🧠 RBAC ready with Prisma
- 🪄 Zero-config init via `npx`
- 🧩 Compatible with Next.js and NextAuth

---

## Installation

```bash
npm install @stralya/auth
```

You also need to install the required peer dependencies:

```bash
npm install @prisma/client next
```

---

## Quick Start

### 1. Initialize Auth Models & Roles

```bash
npx @stralya/auth init-models
npx @stralya/auth init-roles
```

This will:
- Copy the required Prisma models into your `prisma/schema.prisma` file
- Create a seed file for roles

Then run:

```bash
npx prisma migrate dev --name init-auth
npx prisma db seed
```

---

## Usage

```ts
import { register, login, setPrismaClient } from '@stralya/auth';

setPrismaClient(prisma); // pass your Prisma client instance

await register({ email, password });
const user = await login({ email, password });
```

---

## CLI

```bash
npx @stralya/auth init-models           # Scaffold auth models and roles
npx @stralya/auth init-roles    # Create seed file for default roles/permissions
```

---

## License

This package is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0-only)**.

You are **not allowed** to:
- Use it in proprietary software without releasing your source code
- Re-license or sub-license it under more permissive terms

This ensures all derived or distributed versions remain open and accessible, while discouraging closed-source reuse.

---

## Maintained by Stralya

Feel free to contribute, suggest improvements, or open issues!
GitHub: [Stralya/auth](https://github.com/stralya-company/auth)