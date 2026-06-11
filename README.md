# Ledgr · Backend

> Multi-tenant SaaS for financial management — **Phase 1: live**

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

REST API for **Ledgr**, a multi-tenant SaaS designed to manage financial operations for organizations. Built with Node.js + Express + TypeScript + MongoDB, deployed independently from the frontend.

🔗 **[Live API · Health Check](https://ledgr-backend-s49u.onrender.com/health)** · **[Frontend Repository](https://github.com/paulabottale/ledgr-frontend)**

---

## About Ledgr

Ledgr is a multi-tenant SaaS for financial management, designed from the ground up to scale. The core architecture is built around **organization-based data isolation**: every record is strictly scoped to its company at the model level — the foundation that separates a real SaaS from a standard app.

The project is being developed in phases, with a scalable foundation designed to support financial modules, AI-powered analysis, and payment integrations.

## Phase 1 — What's Live

Complete authentication API with multi-tenant foundation:

- **JWT authentication** with `register`, `login` and `me` endpoints
- **Multi-tenant data isolation** at the model level — every record scoped to its organization ID
- **Password hashing with bcrypt** for safe credential storage
- **Strict input validation** on every payload
- **Global error handling middleware** for consistent error responses
- **toJSON transforms** on models to safely serialize without exposing sensitive fields
- **CORS whitelist** restricting access to trusted origins (localhost + production frontend)
- **Decoupled deployment** on Render, allowing the backend to scale independently from the frontend

## Tech Stack

- **Node.js** + **Express** + **TypeScript**
- **MongoDB** with **Mongoose** for schema modelling
- **JWT** for stateless authentication
- **bcrypt** for password hashing
- **Render** for production deployment + **MongoDB Atlas** for database hosting

## Architecture

```
src/
├── config/
│   └── db.ts                    — MongoDB connection setup
├── controllers/
│   └── auth.controller.ts       — Request handlers for auth routes
├── middlewares/
│   ├── auth.middleware.ts       — JWT verification + req.user injection
│   └── error.middleware.ts      — Global error handler
├── models/
│   ├── User.model.ts            — User schema scoped to organization
│   └── Organization.model.ts    — Organization schema (tenant root)
├── routes/
│   └── auth.routes.ts           — POST /login, /register · GET /me
├── types/
│   └── express.d.ts             — Custom Request types with user
└── index.ts                     — Express app setup with middlewares
```

### Key architectural decisions

- **Multi-tenant data isolation**: every model has an `organizationId` field that scopes the data. Queries always filter by the authenticated user's organization — a company can never accidentally read another company's data.
- **`toJSON` transforms on models**: User and Organization schemas define a `toJSON` transform that removes sensitive fields (password, `__v`) and converts `_id` to `id` before serializing. Controllers can return the document directly without manual sanitization — safe by default.
- **JWT middleware**: protected routes are guarded by a middleware that verifies the token, fetches the user, and attaches it to `req.user`. Controllers downstream don't repeat auth logic.
- **CORS whitelist**: only trusted origins can hit the API (`localhost:5173` for dev, the Vercel domain for production). Uses a function-based origin callback for flexibility instead of a permissive wildcard.
- **MVC separation**: controllers handle requests, models define schemas and persistence logic, middlewares handle cross-cutting concerns like authentication and error handling.

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- MongoDB (local instance or [Atlas](https://www.mongodb.com/cloud/atlas) free tier)

### Installation

```bash
git clone https://github.com/paulabottale/ledgr-backend.git
cd ledgr-backend
npm install
```

### Environment variables

Create a `.env` file at the root:

```bash
PORT=3000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/ledgr
JWT_SECRET=your-strong-random-secret
NODE_ENV=development
```

> Use a strong random string for `JWT_SECRET` in production. Never commit `.env` to version control.

### Run locally

```bash
npm run dev
```

The API starts at `http://localhost:3000`.

### Build for production

```bash
npm run build
npm start
```

## API Endpoints

### Phase 1 — Authentication

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Create organization + admin user, returns JWT | No |
| `POST` | `/api/auth/login` | Authenticate user, returns JWT | No |
| `GET` | `/api/auth/me` | Get current authenticated user | Yes |
| `GET` | `/health` | Health check endpoint | No |

### Response format

All endpoints return JSON in a consistent shape:

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "65f3...",
    "name": "Paula",
    "email": "paula@example.com",
    "role": "admin",
    "organizationId": "65f3..."
  }
}
```

Errors return:

```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

## Roadmap

- 🚧 **Financial Dashboard** — Real-time metrics, income vs expenses charts, balance overview and recent transactions
- 🚧 **Transaction Management** — Income and expense tracking with categories, filters, and exportable history
- 🚧 **Wallet Module** — Organization wallet with balance, internal transfers and movement history
- 🚧 **AI Financial Agent** — Claude API (Anthropic) integration to analyse transactions, generate natural language reports, detect spending patterns, and answer questions about the organization's financial state via a conversational interface
- 🚧 **Stripe Payments** — Balance top-ups, one-time payments and recurring subscriptions with webhook confirmation
- 🚧 **Invoicing** — Professional invoices with draft/sent/paid states and PDF download

## Author

**Paula Bottale**  
Full Stack Developer · Buenos Aires, Argentina · Open to full-time & contract roles

- 🌐 [Portfolio](https://paulabottale-portfolio.vercel.app)
- 💼 [LinkedIn](https://linkedin.com/in/paula-bottale)
- 📧 paulabottale.dev@gmail.com

---

⭐ If you find this project interesting, consider giving it a star.
