# Ledgr — SaaS Financial Management Platform 💳

Full stack SaaS platform for financial management targeted at SMEs and finance teams. Built with a multi-tenant architecture where each organization's data is fully isolated. The project is being developed in phases, with a scalable foundation designed to support financial modules, AI-powered analysis, and payment integrations.

> 🚧 **Status:** In active development. Phase 1 (Authentication & Multi-tenant architecture) is complete and deployed. Remaining modules are on the roadmap below.

---

## ✅ Implemented (Live)

🔐 **Authentication & Multi-tenant** — JWT authentication with organization-based data isolation. Each record is scoped to its organization ID, so a company can only ever access its own data — the pattern that distinguishes a real SaaS from a standard app.

🔒 **Security** — Strict input validation, password hashing with bcrypt, and global error handling.

🏗️ **Decoupled architecture** — Backend and frontend in separate repositories and deployments, allowing each to scale and evolve independently. Backend deployed on Render with MongoDB Atlas.

🟢 **Live API** — Health check endpoint: [`/health`](https://ledgr-backend-s49u.onrender.com/health)

---

## 🚧 Roadmap (In Development)

📊 **Financial Dashboard** — Real-time metrics, income vs expenses charts, balance overview and recent transactions.

💸 **Transaction Management** — Income and expense tracking with categories, filters, and exportable history.

👛 **Wallet Module** — Organization wallet with balance, internal transfers and movement history.

🤖 **AI Financial Agent** — Claude AI (Anthropic) to analyse transactions, generate natural language reports, detect spending patterns, and answer questions about the organization's financial state via a conversational interface.

💳 **Stripe Payments** — Balance top-ups, one-time payments and recurring subscriptions with webhook confirmation.

🧾 **Invoicing** — Professional invoices with draft/sent/paid states and PDF download.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React · TypeScript · Vite · Tailwind CSS · React Router |
| Backend | Node.js · Express · TypeScript |
| Database | MongoDB · Mongoose |
| AI | Claude AI (Anthropic API) |
| Payments | Stripe API · Webhooks |
| Auth | JWT · bcrypt |
| Deploy | Vercel (frontend) · Render (backend) |

---

## 👩‍💻 Author

Paula Bottale — [LinkedIn](https://linkedin.com/in/paula-bottale) · [GitHub](https://github.com/paulabottale)
