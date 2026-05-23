# Ledgr — SaaS Financial Management Platform 💳

Full stack SaaS platform for financial management targeted at SMEs and finance teams. Features a multi-tenant architecture, AI-powered financial analysis, Stripe payments, invoicing, and a real-time dashboard.

## Features

- 🔐 **Authentication & Multi-tenant** — JWT auth with organization-based data isolation. Each company sees only its own data.
- 📊 **Financial Dashboard** — Real-time metrics, income vs expenses charts, balance overview and recent transactions.
- 💸 **Transaction Management** — Income and expense tracking with categories, filters, and exportable history.
- 👛 **Wallet Module** — Organization wallet with balance, internal transfers and movement history.
- 🤖 **AI Financial Agent** — Claude AI (Anthropic) analyses transactions, generates natural language reports, detects spending patterns and anomalies, and answers questions about the organization's financial state via conversational interface.
- 💳 **Stripe Payments** — Balance top-ups, one-time payments and recurring subscriptions with webhook confirmation.
- 🧾 **Invoicing** — Professional invoices with draft/sent/paid states and PDF download.
- 🔒 **Security** — Client API key middleware, rate limiting, strict input validation and global error handling.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React · TypeScript · Vite · Tailwind CSS · React Router |
| Backend | Node.js · Express · TypeScript |
| Database | MongoDB · Mongoose |
| AI | Claude AI (Anthropic API) |
| Payments | Stripe API · Webhooks |
| Auth | JWT · bcrypt |
| Deploy | Vercel (frontend) · Render (backend) |

## Status

🚧 In active development — Phase 1 (Authentication & Multi-tenant) in progress.

## Author

**Paula Bottale** — [LinkedIn](https://linkedin.com/in/paula-bottale) · [GitHub](https://github.com/paulabottale)
