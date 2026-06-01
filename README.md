# CrushCraft

CrushCraft is a full-stack Next.js dating app focused on matching people by occupation and region.

## Features

- Registration and login with email/password authentication
- Secure JWT session cookie handling
- Protected discover page
- Profile filtering by occupation and region
- Prisma + SQLite persistence with demo seed data

## Tech Stack

- Next.js (App Router, TypeScript)
- Prisma ORM
- SQLite
- bcryptjs + jsonwebtoken

## Local Development

```bash
npm install
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

App runs at `http://localhost:3000`.
