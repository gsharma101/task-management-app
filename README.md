# Task Management Application

A full-stack task management application built with **Next.js**, **Spring Boot**, and **PostgreSQL**.
The application allows users to securely manage tasks with authentication, pagination, searching, sorting, editing, and deletion features.

---

# Live Demo

## Frontend

https://task-management-app-wine-delta.vercel.app

## Backend

https://your-railway-backend-url.up.railway.app

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

---

# API Endpoints

## Authentication

### Signup

POST /auth/signup

### Login

POST /auth/login

### Current User

GET /auth/me

---

## Tasks

### Create Task

POST /tasks

### Get All Tasks

GET /tasks?page=0&size=6&search=&sortBy=createdAt

### Get Single Task

GET /tasks/{id}

### Update Task

PATCH /tasks/{id}

### Delete Task

DELETE /tasks/{id}

---

# Environment Variables

## Backend (.env or Railway Variables)

```env
JWT_SECRET=your_secret_key

SPRING_DATASOURCE_URL=your_database_url
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=password
```

## Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5454
```

---

# Local Setup

## Clone Repository

```bash
git clone https://github.com/your-username/task-management-app.git
```

---

# Backend Setup

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

# Frontend Setup

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
