# 🏠 Rental Admin Backend

A RESTful API server for managing rental properties, built with Node.js, Express, and MongoDB.

---

## 📁 Project Structure

```
rental-admin-backend/
├── config/               # Database and app configuration
│   └── db.js             # MongoDB connection
├── controllers/          # Route handler logic
├── middleware/           # Custom Express middleware (auth, error handling, etc.)
├── models/               # Mongoose data models/schemas
├── routes/               # API route definitions
│   ├── core/
│   │   └── type.js       # Equipment type routes
│   ├── admin.js
│   ├── customers.js
│   ├── equipment.js
│   └── vendor.js
├── .env                  # Environment variables (not committed to git)
├── package.json          # Project dependencies and scripts
└── server.js             # Entry point
```

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm or yarn

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/rental-admin-backend.git
cd rental-admin-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root of the project:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rental-admin
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

> ⚠️ Never commit your `.env` file. It is listed in `.gitignore`.

### 4. Start the server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server will run at `http://localhost:5000`.

---

## 🔌 API Endpoints

### Auth — `/api/admin`
| Method | Endpoint               | Description                              | Auth Required |
|--------|------------------------|------------------------------------------|---------------|
| POST   | `/api/admin/register`  | Register a new admin (returns JWT 1h)    | No            |
| POST   | `/api/admin/login`     | Login with email & password (returns JWT 7d) | No        |

**Request body for both:**
```json
{
  "email": "admin@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "token": "<jwt_token>"
}
```

> 🔐 Tokens expire in **1h** (register) and **7d** (login). Include the token in the `Authorization` header as `Bearer <token>` for protected routes.

### Customers — `/api/customers`
| Method | Endpoint                  | Description          |
|--------|---------------------------|----------------------|
| GET    | `/api/customers`          | Get all customers    |
| GET    | `/api/customers/:id`      | Get customer by ID   |
| POST   | `/api/customers`          | Create customer      |
| PUT    | `/api/customers/:id`      | Update customer      |
| DELETE | `/api/customers/:id`      | Delete customer      |

### Vendors — `/api/vendors`
| Method | Endpoint               | Description        |
|--------|------------------------|--------------------|
| GET    | `/api/vendors`         | Get all vendors    |
| GET    | `/api/vendors/:id`     | Get vendor by ID   |
| POST   | `/api/vendors`         | Create vendor      |
| PUT    | `/api/vendors/:id`     | Update vendor      |
| DELETE | `/api/vendors/:id`     | Delete vendor      |

### Types — `/api/types`
| Method | Endpoint            | Description        |
|--------|---------------------|--------------------|
| GET    | `/api/types`        | Get all types      |
| POST   | `/api/types`        | Create type        |
| PUT    | `/api/types/:id`    | Update type        |
| DELETE | `/api/types/:id`    | Delete type        |

### Equipments — `/api/equipments`
| Method | Endpoint                   | Description            |
|--------|----------------------------|------------------------|
| GET    | `/api/equipments`          | Get all equipments     |
| GET    | `/api/equipments/:id`      | Get equipment by ID    |
| POST   | `/api/equipments`          | Create equipment       |
| PUT    | `/api/equipments/:id`      | Update equipment       |
| DELETE | `/api/equipments/:id`      | Delete equipment       |

> 📝 Update individual route details as your controllers evolve.

---

## 🛠️ Scripts

| Script          | Description                        |
|-----------------|------------------------------------|
| `npm start`     | Start the production server        |
| `npm run dev`   | Start with nodemon (hot reload)    |

---

## 🔐 Environment Variables

| Variable       | Description                          | Required |
|----------------|--------------------------------------|----------|
| `PORT`         | Port the server listens on           | No (default: 5000) |
| `MONGODB_URI`  | MongoDB connection string            | ✅ Yes   |
| `JWT_SECRET`   | Secret key for signing JWT tokens    | ✅ Yes   |
| `NODE_ENV`     | Environment (`development`/`production`) | No   |

---

## 🧰 Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js
- **Database** — MongoDB with Mongoose ODM
- **Security** — Helmet.js, bcryptjs (password hashing)
- **CORS** — cors
- **Auth** — JWT via jsonwebtoken (1h register / 7d login)
- **Config** — dotenv

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).