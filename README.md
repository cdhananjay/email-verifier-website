# Email Verifier — Auth Website

[![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=fff)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org)
[![Better Auth](https://img.shields.io/badge/Better_Auth-6C47FF?logo=auth0&logoColor=fff)](https://www.better-auth.com)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=fff)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=fff)](https://www.postgresql.org)
[![Resend](https://img.shields.io/badge/Resend-000?logo=resend&logoColor=fff)](https://resend.com)
[![Bun](https://img.shields.io/badge/Bun-000?logo=bun&logoColor=fff)](https://bun.sh)

Companion authentication website for the [Email Verifier](https://github.com/cdhananjay/email-verifier) Discord bot. Users authenticate with their email via a login link, link their Discord account, and then run `/verify` in Discord to receive a verified role.

See the [Email Verifier README](https://github.com/cdhananjay/email-verifier) for details on server-side configuration, commands, and the full verification flow.

## [email-verifier-bot.vercel.app](https://email-verifier-bot.vercel.app/)
## [email-verifier-bot.vercel.app/verify](https://email-verifier-bot.vercel.app/verify)

## Prerequisites

- [Bun](https://bun.sh)
- PostgreSQL database
- [Resend](https://resend.com) API key
- Discord application with OAuth2 credentials ([Discord Developer Portal](https://discord.com/developers/applications))
- A running instance of the [email-verifier](https://github.com/cdhananjay/email-verifier) Discord bot

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/cdhananjay/email-verifier-website.git
   cd email-verifier-website
   ```

2. Copy the environment template and fill in the values:

   ```bash
   cp example.env .env
   ```

3. Install dependencies and set up the database:

   ```bash
   bun install
   bunx prisma migrate deploy
   bunx prisma generate
   ```

4. Start the development server:

   ```bash
   bun dev
   ```

## Environment Variables

| Variable                  | Description                                   |
| ------------------------- | --------------------------------------------- |
| `DATABASE_URL`            | PostgreSQL connection string                  |
| `RESEND_API_KEY`          | Resend API key for sending login link emails  |
| `DISCORD_CLIENT_ID`       | Discord OAuth2 client ID                      |
| `DISCORD_CLIENT_SECRET`   | Discord OAuth2 client secret                  |
| `DISCORD_BOT_INVITE_URL`  | Discord bot invite URL (used on home page)

## Scripts

| Command                        | Description                              |
| ------------------------------ | ---------------------------------------- |
| `bun run dev`                      | Start the development server             |
| `bun run build`                    | Deploy migrations, generate Prisma, build |
| `bun run start`                    | Start the production server              |
| `bun run typecheck`                | Type-check the codebase                  |
| `bun run format-lint`              | Format and lint the source               |
| `bun run format-lint:check`        | Check formatting and lint (no write)     |

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 16
- **UI Library:** [React](https://react.dev) 19
- **Auth:** [Better Auth](https://www.better-auth.com) (magic link + Discord OAuth)
- **ORM:** [Prisma](https://www.prisma.io) 7
- **Database:** PostgreSQL
- **Email:** [Resend](https://resend.com) + [React Email](https://react.email)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) v4 + [shadcn/ui](https://ui.shadcn.com) (radix-nova)
- **Linter / Formatter:** [Biome](https://biomejs.dev)
- **Runtime:** [Bun](https://bun.sh)

## Related

- [email-verifier](https://github.com/cdhananjay/email-verifier) - the companion Discord bot that gates server access behind email domain verification.
