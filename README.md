# Stockify

Stockify is a stock-market dashboard built with Next.js. It combines TradingView market visualizations with Finnhub stock search and details, and lets signed-in users maintain a personal stock watchlist.

## Features

- Browse market overview, stock heatmap, market news, and market quotes.
- Search stocks through Finnhub and open a detailed stock page with TradingView charts and analysis.
- Sign up and sign in with email and password.
- Save and remove stocks from a user-specific watchlist.
- Send a personalized welcome email after sign-up. Inngest runs the background job, Gemini generates the introduction, and Nodemailer sends the email.

## Requirements

- Next 16
- Mongo DB
- API credentials for Finnhub and Gemini
- Gmail SMTP credentials for welcome emails

## Getting started

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Copy `.env.example` to `.env`:

   ```powershell
   Copy-Item .env.example .env
   ```

   On macOS or Linux, use `cp .env.example .env`.

3. Set the environment variables in `.env`:

   | Variable               | Purpose                                                                                                          |
   | ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
   | `MONGODB_URI`          | MongoDB connection string.                                                                                       |
   | `BETTER_AUTH_SECRET`   | Secret used by Better Auth; use a strong, unique value.                                                          |
   | `BETTER_AUTH_URL`      | Base URL of this app, such as `http://localhost:3000` during local development.                                  |
   | `NEXT_PUBLIC_BASE_URL` | Present in the example environment file, but not currently read by the application.                              |
   | `FINNHUB_API_KEY`      | API key for stock search and market data.                                                                        |
   | `FINNHUB_BASE_URL`     | Finnhub API base URL; typically `https://finnhub.io/api/v1`.                                                     |
   | `GEMINI_API_KEY`       | Gemini API key used to generate the personalized welcome email.                                                  |
   | `NODEMAILER_EMAIL`     | Gmail account used to send welcome emails.                                                                       |
   | `NODEMAILER_PASSWORD`  | Gmail app password for the sending account.                                                                      |
   | `INNGEST_DEV`          | Set to `1` for local Inngest development. Leave unset in production.                                             |
   | `NODE_ENV`             | Set by Next.js during normal development and production commands; it generally does not need to be set manually. |

4. Start the Next.js development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

### Local Inngest development

The Inngest handler is available at `/api/inngest`. To run background functions locally, start the Inngest Dev Server alongside Next.js and keep `INNGEST_DEV=1` in `.env`. The Dev Server should connect to `http://localhost:3000/api/inngest`.

## Scripts

| Command         | Description                                 |
| --------------- | ------------------------------------------- |
| `npm run dev`   | Start the Next.js development server.       |
| `npm run build` | Create a production build.                  |
| `npm run start` | Start the production server after building. |
| `npm run lint`  | Run ESLint.                                 |
| `npm test`      | Run the test suite.                         |

## Deployment

Deploy the Next.js app to a platform that supports the Next.js App Router and configure the production environment variables in that platform’s secret/environment settings. Set `BETTER_AUTH_URL` to the deployed app URL. Configure MongoDB, Finnhub, Gemini, and email credentials as needed by the features you enable.

For Inngest Cloud, leave `INNGEST_DEV` unset, configure `INNGEST_SIGNING_KEY` and `INNGEST_EVENT_KEY` in the deployment environment, and register the deployed function endpoint:

```text
https://<your-domain>/api/inngest
```

The endpoint is implemented in `app/api/inngest/route.ts`.
