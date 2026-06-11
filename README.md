# Task Management Application

A full-stack task management application built with **Next.js**, **Spring Boot**, and **PostgreSQL**.
The application allows users to securely manage tasks with authentication, pagination, searching, sorting, editing, and deletion features.

---

# Live Demo

## Frontend

https://task-management-app-wine-delta.vercel.app

## Backend

task-management-app-production-a07b.up.railway.app

---

# Tech Stack

## Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Axios
* React Hook Form
* React Hot Toast
* Lucide React Icons

## Backend

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* PostgreSQL
* Maven

## Deployment

* Frontend: Vercel
* Backend: Railway
* Database: PostgreSQL (Railway)

---

# Features

## Authentication & Authorization

* User Signup
* User Login
* JWT-based Authentication
* Protected Routes
* Persistent Login State
* User-specific Task Access

---

## Task Management

* Create Tasks
* View Tasks
* Update Tasks
* Delete Tasks
* Search Tasks by Title
* Sort Tasks by:

  * Recently Created
  * Due Date
  * Priority
* Pagination Support

---

## Frontend Features

* Responsive Dashboard
* Dynamic User Dashboard
* Loading States
* Empty States
* Toast Notifications
* Confirmation Dialog for Delete
* Mobile-Friendly UI

# API Endpoints

## Authentication APIs

| Method | Endpoint       | Description                            |
| ------ | -------------- | -------------------------------------- |
| POST   | `/auth/signup` | Register a new user                    |
| POST   | `/auth/login`  | Authenticate user and return JWT token |
| GET    | `/auth/me`     | Fetch currently logged-in user         |

---

## Task APIs

| Method | Endpoint      | Description             |
| ------ | ------------- | ----------------------- |
| POST   | `/tasks`      | Create a new task       |
| GET    | `/tasks`      | Fetch paginated tasks   |
| GET    | `/tasks/{id}` | Fetch a task by ID      |
| PATCH  | `/tasks/{id}` | Update an existing task |
| DELETE | `/tasks/{id}` | Delete a task           |

---

## Example Query Parameters

### Pagination

```http
GET /tasks?page=0&size=6
```

### Search

```http
GET /tasks?search=spring
```

### Sorting

```http
GET /tasks?sortBy=createdAt
```

Supported sorting fields:

* `createdAt`
* `dueDate`
* `priority`

---

## Authentication Header

Protected APIs require JWT token in request headers:

```http
Authorization: Bearer your_jwt_token
```

# Environment Variables

## Backend Environment Variables

```env
ALLOWED_ORIGINS="your_frontend_url"

PGDATABASE="your_database_name"
PGHOST="your_database_host"
PGPASSWORD="your_database_password"
PGPORT="your_database_port"
PGUSER="your_database_username"

SPRING_PROFILES_ACTIVE="prod"

JWT_SECRET="your_jwt_secret"
```

---

# Spring Profiles

The backend uses separate Spring profiles for development and production environments.

### Development Profile

Used for local development configuration.

```properties
spring.profiles.active=dev
```

### Production Profile

Used for deployed production configuration on Railway.

```properties
spring.profiles.active=prod
```

Separate profile files:

```txt
application-dev.properties
application-prod.properties
```

This helps maintain different:

* database configurations
* CORS origins
* environment variables
* deployment settings
  for local and production environments.


## Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5454
```

---

# Local Setup

## Local PostgreSQL Setup

Install PostgreSQL locally and create a database for the application.

Example database:

```sql
CREATE DATABASE task_management;
```

Update your local `application-dev.properties` file:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/task_management
spring.datasource.username=your_postgres_username
spring.datasource.password=your_postgres_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Make sure PostgreSQL is running locally before starting the backend server.

The backend uses the `dev` Spring profile during local development.


## Clone Repository

```bash
git clone https://github.com/gsharma101/task-management-app
```

---

## Backend Setup

```bash
cd backend
```

Run:

```bash
mvn spring-boot:run
```

Backend runs on:

```txt
http://localhost:5454
```

---

## Frontend Setup

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

---

# Running Tests

```bash
mvn test
```

Implemented service layer tests for:

* Task creation
* Fetching task by ID
* Task deletion

---

# Folder Structure

```txt
backend/
 ├── controller
 ├── service
 ├── repository
 ├── entity
 ├── dto
 ├── security

frontend/
 ├── app
 ├── components
 ├── services
```

---

# Future Improvements

* Role-based access
* Real-time updates
* Dark mode
* Docker support
* CI/CD pipeline
* File uploads
* Activity logs

---

# Author

Gaurav Sharma

GitHub:
https://github.com/gsharma101
