# Task Manager – MERN Stack Project

A full-stack **Task Management Application** built using **Node.js, Express, MongoDB, React, and Tailwind CSS**.  
This project demonstrates real-world backend concepts like authentication, authorization, CRUD operations, filtering, sorting, pagination, and clean folder structure.

---

## 🚀 Features

### Authentication & Authorization
- User registration & login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes (Backend & Frontend)
- Role-based access (Admin / User)

### Task Management
- Create, read, update, and delete tasks
- Users can manage only their own tasks
- Filter tasks by:
  - Status
  - Priority
  - Due date range
- Search tasks by title
- Pagination & sorting support

### Frontend
- Built with React.js
- Styled using Tailwind CSS
- Protected routes using React Router
- JWT token handling

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- dotenv

### Frontend
- React.js
- Tailwind CSS
- React Router DOM


---

## 🔐 API Endpoints

### Auth Routes
- `POST /api/auth/register` – Register user
- `POST /api/auth/login` – Login user

### Task Routes (Protected)
- `POST /api/tasks` – Create task
- `GET /api/tasks` – Get all tasks (filters, search, pagination)
- `GET /api/tasks/:id` – Get single task
- `PUT /api/tasks/:id` – Update task
- `DELETE /api/tasks/:id` – Delete task


## 👩‍💻 Author

**Dhruvi Sangadiya**  


