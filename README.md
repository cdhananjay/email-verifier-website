# Email Verifier — Auth Website

[![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=fff)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org)
[![Better Auth](https://img.shields.io/badge/Better_Auth-6C47FF?logo=auth0&logoColor=fff)](https://www.better-auth.com)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=fff)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=fff)](https://www.postgresql.org)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-30B980?logo=nodemailer&logoColor=fff)](https://nodemailer.com)
[![Bun](https://img.shields.io/badge/Bun-000?logo=bun&logoColor=fff)](https://bun.sh)

Companion authentication website for the [Email Verifier](https://github.com/cdhananjay/email-verifier) Discord bot. Users authenticate with their email via a login link, link their Discord account, and then run `/verify` in Discord to receive a verified role. Discord email is never accessed, and verification data is automatically purged every 24 hours.

See the [Email Verifier README](https://github.com/cdhananjay/email-verifier) for details on server-side configuration, commands, and the full verification flow.

## [email-verifier-bot.vercel.app](https://email-verifier-bot.vercel.app/)
## [email-verifier-bot.vercel.app/verify](https://email-verifier-bot.vercel.app/verify)

## Prerequisites

- [Bun](https://bun.sh)
- PostgreSQL database
- Gmail app password (or SMTP credentials)
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
| `DISCORD_CLIENT_ID`       | Discord OAuth2 client ID                      |
| `DISCORD_CLIENT_SECRET`   | Discord OAuth2 client secret                  |
| `DISCORD_BOT_INVITE_URL`  | Discord bot invite URL (used on home page)    |
| `BETTER_AUTH_SECRET`      | Better Auth secret key                        |
| `EMAIL_USER`              | Gmail address used to send login link emails  |
| `EMAIL_PASS`              | Gmail app password for the above address      |
| `CRON_SECRET`             | Secret to authenticate the Vercel Cron job that purges verification data |

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
- **Email:** [Nodemailer](https://nodemailer.com) + [React Email](https://react.email)
- **Cron:** [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) v4 + [shadcn/ui](https://ui.shadcn.com) (radix-nova)
- **Linter / Formatter:** [Biome](https://biomejs.dev)
- **Runtime:** [Bun](https://bun.sh)

## Related

- [email-verifier](https://github.com/cdhananjay/email-verifier) - the companion Discord bot that gates server access behind email domain verification.
