# User CRUD REST API

A simple User Management REST API built with Node.js, Express.js, TypeScript, Prisma ORM, and MongoDB.

This project was developed as part of the Backend Development with Node.js course assignment.

## Assignment Information

- **Assignment:** Assignment 01 — User CRUD REST API
- **Course:** Backend Development with Node.js
- **Instructor:** Anisur Rahman Samim


## Overview

The User CRUD REST API provides endpoints to create, retrieve, update, and delete users.

It uses Express.js to handle HTTP requests, TypeScript for type safety, Prisma ORM for database operations, and MongoDB as the database.

## Features

- Create a new user
- Retrieve all users
- Retrieve a single user by ID
- Update user information
- Delete a user
- MongoDB ObjectId support
- Unique email constraint
- Automatic `createdAt` and `updatedAt` timestamps
- RESTful API structure

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **ORM:** Prisma ORM
- **Database:** MongoDB
- **API Testing:** Postman
- **Version Control:** Git and GitHub

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
