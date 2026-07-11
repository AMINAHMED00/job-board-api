# Job Board API

A backend REST API for a job board platform, where companies can post jobs and users can browse and search listings. Built with Node.js, Express, TypeScript, and Prisma.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Auth:** JWT (jsonwebtoken) + bcrypt for password hashing

## Features

- User registration and login with hashed passwords
- JWT-based authentication with role-based access control (`USER`, `COMPANY`, `ADMIN`)
- Company profile management (create, update, delete — owner-only)
- Job posting management (create, update, delete — owner-only)
- Public job listing with search, filtering (keyword, location, salary range), and pagination

## Project Structure

```
.
├── controllers/       # Request handlers
├── middlewares/        # Express middlewares (JWT auth, role checks)
├── model/              # Prisma client instance
├── prisma/
│   ├── schema.prisma   # Database schema
│   └── migrations/     # Prisma migration history
├── routes/              # Express route definitions
├── services/            # Business logic / database queries
├── server.ts            # App entry point
└── prisma.config.ts     # Prisma configuration
```

## Prerequisites

- Node.js (v18 or later recommended)
- A running PostgreSQL instance

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/AMINAHMED00/job-board-api.git
   cd job-board-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env` and fill in your own values:
   ```bash
   cp .env.example .env
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will run at `http://localhost:3000` by default.

## API Endpoints

### Auth — `/api/users`

| Method | Endpoint    | Auth required | Description              |
|--------|-------------|----------------|---------------------------|
| POST   | `/register` | No             | Register a new user       |
| POST   | `/login`    | No             | Log in and receive a JWT  |
| GET    | `/profile`  | Yes            | Get the logged-in user's profile |

### Companies — `/api/company`

| Method | Endpoint      | Auth required        | Description                     |
|--------|---------------|------------------------|-----------------------------------|
| POST   | `/create`     | Yes (`COMPANY`)        | Create a company profile         |
| GET    | `/me`         | Yes (`COMPANY`)        | Get companies owned by the logged-in user |
| GET    | `/:id`        | No                     | Get a company's public profile   |
| PATCH  | `/update/:id` | Yes (`COMPANY`, owner) | Update a company                 |
| DELETE | `/delete/:id` | Yes (`COMPANY`, owner) | Delete a company                 |

### Jobs — `/api/job`

| Method | Endpoint      | Auth required               | Description                          |
|--------|---------------|-------------------------------|-----------------------------------------|
| POST   | `/create`     | Yes (`COMPANY`)               | Post a new job                         |
| GET    | `/jobs`       | No                             | List all jobs                          |
| GET    | `/search`     | No                             | Search jobs (`q`, `location`, `minsalary`, `maxsalary`, `page`, `limit`) |
| GET    | `/:id`        | No                             | Get a single job by ID                 |
| PATCH  | `/update/:id` | Yes (`COMPANY`, owner)         | Update a job                           |
| DELETE | `/delete/:id` | Yes (`COMPANY` or `ADMIN`)     | Delete a job                           |

## Known Limitations / Roadmap

- **Applications are not implemented yet.** The `Application` model exists in the Prisma schema, but there are no routes/controllers/services for users to apply to jobs or for companies to view applicants.
- No request body validation library (e.g. Zod) is used yet — inputs aren't strictly validated.
- `PORT` is currently hardcoded in `server.ts` rather than read from the environment.
- No automated tests yet.

## License

ISC