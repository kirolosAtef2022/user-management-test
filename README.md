# Bewerbertest2026 – Full-Stack User Management System

Technical assessment project implementing a **full-stack user management system** with CSV import, validation, business rules, and a Vue 3 frontend.  
The application is **fully Dockerized** with **separate Docker setups for backend and frontend**.

---

## Tech Stack

### Backend

- Node.js + Express
- MongoDB + Mongoose
- Joi (schema validation)
- CSV parsing & business rules
- Docker / Docker Compose

### Frontend

- Vue 3
- Vuetify
- Vite
- Composition API
- Docker / Docker Compose

---

### High-Level Architecture

**Frontend**

- Vue 3
- Vuetify
- Composition API
- Vite

**Backend**

- Node.js (Express)
- REST API (`/v1/users`)
- MongoDB (Mongoose)

**Cross-cutting concerns**

- Validation: Joi
- Normalization & parsing (shared for API & CSV)
- Centralized error handling
- Business rules isolated from controllers

**Data import**

CSV import script (preferred)
Optional automatic import on startup (for reviewer convenience)

---

### Repository Structure

```text
Bewerbertest2026/
├── Backend/
│   ├── service/
│   │   ├── controller/        # Request handlers
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Validation, normalization, errors
│   │   ├── validation/        # Joi schemas
│   │   ├── csv/               # CSV parsing & business rules
│   │   ├── utils/             # Shared parsers & helpers
│   │   ├── constants/         # Allowed locations, enums
│   │   ├── entity/            # Mongoose models
│   │   ├── errors/            # AppError & error handling
│   │   └── config/            # DB & app configuration
│   ├── scripts/
│   │   └── importUsers.js     # CSV import script
│   ├── data/
│   │   └── users.csv
│   ├── tests/
│   ├── Dockerfile.dev
│   ├── docker-compose.yml
│   └── app.js
│
├── Frontend/
│   ├── src/
│   │   ├── pages/             # `/users` route
│   │   ├── components/
│   │   ├── composables/
│   │   ├── services/          # API calls
│   │   ├── validation/
│   │   └── utils/
│   ├── Dockerfile.dev
│   └── docker-compose.yml
│
└── README.md
```

---

### Backend Design Highlights

**Normalization before validation** (API & CSV)
**Shared parsers** reused by CSV and API
**Business rules isolated** from controllers
**Centralized error handling** via `AppError`
**Duplicate email detection** before DB insert
Partial CSV imports using `insertMany({ ordered: false })`

---

### CSV Import Flow

- Read CSV file
- Required field guards
- Normalize & parse values
- Apply business rules
- Joi validation
- Detect duplicate emails
- Insert valid users
- Report failed rows with row numbers

---

### Frontend Highlights

- Vue 3 Composition API
- Centralized state via composables
- Fixed-size action buttons (layout stability)
- Disabled actions based on user state
- Clear Block / Unblock UX
- Snackbar-based success & error feedback

### Running the Project (Docker)

### Start Backend + MongoDB

From the **Backend** directory:

```bash
cd Backend
docker compose up --build
```

### CSV Import Script

### The script:

- Imports valid users
- Skips invalid rows
- Reports validation & duplicate errors with CSV row numbers

### Run inside Backend container:

```bash
docker compose exec backend_service_user node scripts/importUsers.js
```

Backend API available at:

http://localhost:4001/v1/users

---

## API Endpoints Summary

#### GET /v1/users

#### GET /v1/users/:id

#### POST /v1/users

#### PATCH /v1/users/:id

#### PATCH /v1/users/:id/block

#### PATCH /v1/users/:id/unblock

---

## Start Frontend

From the Frontend/app directory:

```bash
cd Frontend/app
docker compose up --build
```

Frontend available at:

http://localhost:5001/users

---

### Environment Variables

• All required environment variables (including MONGO_URI) are defined via Docker Compose.
• No manual .env configuration is required.

---

### Testing

- Joi schema tests for create/update users
- CSV validation tests
- Business rule coverage

Tests are located in:
Backend/**tests**/

### Run Test from Backend Folder:

```bash
npm run test
```

---

### Reviewer Notes

- CSV data is auto-imported on startup for reviewer convenience.

- A dedicated import script is included and is the preferred production approach.

- Locations are derived from the CSV and treated as allowed constants to avoid introducing additional CRUD complexity.

---

Author

### Kirolos Atef
