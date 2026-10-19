# User CRUD REST API

A RESTful User Management API built with **Node.js, Express.js, TypeScript, Prisma ORM, and MongoDB**.

This project was developed as part of the Backend Development with Node.js course assignment. It demonstrates the implementation of CRUD (Create, Read, Update, Delete) operations using a structured REST API architecture.

---

## Assignment Information

| Information | Details |
|---|---|
| Assignment | Assignment 01 — User CRUD REST API |
| Course | Backend Development with Node.js |
| Instructor | Anisur Rahman Samim |
| Total Marks | 100 |
| Database | MongoDB |
| ORM | Prisma ORM |
| API Testing | Postman |

---

## Features

- Create new users
- Retrieve all users
- Retrieve a single user by ID
- Update user information
- Partially update user information
- Delete users
- MongoDB ObjectId support
- Unique email constraint
- Automatic creation and update timestamps
- RESTful API endpoints
- JSON request and response handling

---

## Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend web framework |
| TypeScript | Type-safe application development |
| Prisma ORM | Database queries and data management |
| MongoDB | NoSQL database |
| Postman | API testing and documentation |
| Git | Version control |
| GitHub | Source code hosting |

---

## Project Structure

```text
user-crud-api/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   │   └── prisma.ts
│   ├── controllers/
│   │   └── user.controller.ts
│   ├── routes/
│   │   └── user.routes.ts
│   ├── app.ts
│   └── server.ts
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## Prerequisites

Before running this project, ensure you have the following installed or configured:

- [Node.js](https://nodejs.org/)
- npm
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or a MongoDB instance
- [Postman](https://www.postman.com/)
- Git

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd user-crud-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project.

Add the following environment variables:

```env
DATABASE_URL="mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER.mongodb.net/user_crud_db"
PORT=5000
```

Replace the placeholders with your actual MongoDB Atlas credentials and cluster hostname.

**Important:** Never commit your `.env` file or expose your database credentials publicly.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Synchronize the Database Schema

```bash
npx prisma db push
```

This synchronizes the Prisma schema with your MongoDB database.

### 6. Start the Development Server

```bash
npm run dev
```

The server will start at:

```text
http://localhost:5000
```

---

## API Documentation

### Base URL

```text
http://localhost:5000
```

### Postman API Documentation

Explore the API documentation and request examples using the link below:

**[View Postman API Documentation](https://documenter.getpostman.com/view/38315131/2sBYHSyLx8)**

---

## API Endpoints

The API provides the following endpoints for user management.

| # | HTTP Method | Endpoint | Description |
|---|---|---|---|
| 1 | POST | `/api/users` | Create a new user |
| 2 | GET | `/api/users` | Retrieve all users |
| 3 | GET | `/api/users/:id` | Retrieve a user by ID |
| 4 | PUT | `/api/users/:id` | Update a user |
| 5 | PATCH | `/api/users/:id` | Partially update a user |
| 6 | DELETE | `/api/users/:id` | Delete a user |

---

## Request Examples

### 1. Create User

Creates a new user in the database.

**Method:** `POST`

**Endpoint:**

```text
/api/users
```

**Request Body:**

```json
{
  "name": "Rahim Ahmed",
  "email": "rahim@gmail.com"
}
```

**Required Fields:**

- `name` — User's name
- `email` — Unique email address

**Note:** The request body must match the fields defined in the Prisma User model.

---

### 2. Get All Users

Retrieves all users stored in the database.

**Method:** `GET`

**Endpoint:**

```text
/api/users
```

**Request Body:** Not required.

---

### 3. Get User by ID

Retrieves a specific user using their MongoDB ObjectId.

**Method:** `GET`

**Endpoint:**

```text
/api/users/:id
```

**Example:**

```text
/api/users/671a1234567890abcdef1234
```

Replace the example ID with an actual user ID returned by the API.

**Request Body:** Not required.

---

### 4. Update User

Updates an existing user's information.

**Method:** `PUT`

**Endpoint:**

```text
/api/users/:id
```

**Request Body:**

```json
{
  "name": "Rahim Ahmed Khan",
  "email": "rahim.khan@gmail.com"
}
```

Replace `:id` with the ID of the user you want to update.

---

### 5. Partially Update User

Updates selected fields of an existing user.

**Method:** `PATCH`

**Endpoint:**

```text
/api/users/:id
```

**Request Body:**

```json
{
  "name": "Rahim Updated"
}
```

Only the specified fields should be updated, provided the controller supports partial updates.

---

### 6. Delete User

Deletes a user from the database.

**Method:** `DELETE`

**Endpoint:**

```text
/api/users/:id
```

Replace `:id` with the ID of the user you want to delete.

**Request Body:** Not required.

---

## Prisma User Model

The User model defines the structure of user records stored in MongoDB.

```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Schema Fields

| Field | Type | Description |
|---|---|---|
| `id` | String | MongoDB ObjectId |
| `name` | String | User's name |
| `email` | String | Unique email address |
| `createdAt` | DateTime | Automatically records creation time |
| `updatedAt` | DateTime | Automatically records the last update time |

---

## Testing with Postman

The API endpoints can be tested using Postman.

### Testing Checklist

- [ ] Create a user using POST
- [ ] Retrieve all users using GET
- [ ] Retrieve a single user using GET by ID
- [ ] Update a user using PUT
- [ ] Partially update a user using PATCH
- [ ] Delete a user using DELETE
- [ ] Verify API responses
- [ ] Capture screenshots of all required endpoints

### Postman Collection and Documentation

**Documentation Link:**

https://documenter.getpostman.com/view/38315131/2sBYHSyLx8

---

## Environment Variables

The project requires the following environment variables:

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | MongoDB connection string | MongoDB Atlas URI |
| `PORT` | Server port | `5000` |

Create a `.env.example` file containing:

```env
DATABASE_URL="mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER.mongodb.net/user_crud_db"
PORT=5000
```

The `.env.example` file documents the required configuration without exposing actual credentials.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Compile TypeScript into JavaScript |
| `npm start` | Run the compiled application |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma db push` | Synchronize the Prisma schema with MongoDB |

---

## Learning Outcomes

This assignment demonstrates practical experience with:

- Setting up a Node.js and Express.js application
- Using TypeScript in backend development
- Connecting MongoDB through Prisma ORM
- Designing RESTful API endpoints
- Implementing CRUD operations
- Working with MongoDB ObjectIds
- Managing unique database fields
- Testing APIs using Postman
- Managing source code using Git and GitHub

---

## GitHub Repository

**Repository URL:**

[View Source Code](YOUR_GITHUB_REPOSITORY_URL)

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

---

## Author

**Name:** YOUR_NAME

**Course:** Backend Development with Node.js

**Instructor:** Anisur Rahman Samim

---

*Developed as part of Assignment 01 — User CRUD REST API.*
