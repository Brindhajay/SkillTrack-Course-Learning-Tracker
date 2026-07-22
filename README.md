# 📚 SkillTrack – Course Learning Tracker

A modern Full Stack Course Learning Tracker web application built using **React.js**, **Spring Boot**, **Spring Security (JWT)**, and **PostgreSQL**.

The application helps users organize their learning journey by managing courses, tracking progress, marking favorites, and viewing analytics through an interactive dashboard.

---

## 🚀 Live Demo

### 🌐 Frontend
https://skilltrack-course-learning-tracker-1.onrender.com

### ⚙️ Backend API
https://skilltrack-course-learning-tracker.onrender.com

### 📖 Swagger API
https://skilltrack-course-learning-tracker.onrender.com/swagger-ui/index.html

---

# ✨ Features

- 🔐 JWT Authentication (Login & Register)
- 👤 User Profile
- 📚 Course Management
- ➕ Create Course
- ✏️ Update Course
- ❌ Delete Course
- ❤️ Favorite Courses
- 📈 Dashboard Analytics
- 🔍 Search Courses
- 🎯 Course Progress Tracking
- 📊 Learning Statistics
- 🗄 PostgreSQL Database
- 📱 Responsive UI

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- React Router
- Axios
- Bootstrap
- CSS

## Backend

- Java 17
- Spring Boot 3
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- Maven

## Database

- PostgreSQL (Neon)

## Deployment

- Render (Frontend)
- Render (Backend)
- Neon PostgreSQL

---

# 📂 Project Structure

```
SkillTrack-Course-Learning-Tracker
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── dto
│   ├── config
│   └── security
│
├── frontend
│   ├── components
│   ├── pages
│   ├── layouts
│   ├── services
│   ├── context
│   └── assets
│
└── README.md
```

---

# 🔐 Authentication

- User Registration
- User Login
- JWT Token Generation
- Protected Routes
- Spring Security Authorization

---

# 📊 Dashboard

The dashboard provides:

- Total Courses
- In Progress Courses
- Completed Courses
- Average Progress
- Recent Courses
- Continue Learning Section

---

# 📚 Course Features

- Add Course
- Edit Course
- Delete Course
- Search Course
- Favorite Course
- Progress Tracking

---

# 🗄 Database

- PostgreSQL
- Hosted on Neon
- Spring Data JPA
- Hibernate ORM

---

# ⚙ Backend APIs

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Dashboard

```
GET /api/dashboard
```

### Courses

```
GET /api/courses
POST /api/courses
PUT /api/courses/{id}
DELETE /api/courses/{id}
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Brindhajay/SkillTrack-Course-Learning-Tracker.git
```

## Backend

```bash
cd backend
mvn spring-boot:run
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 📸 Screenshots

- Login Page
- Dashboard
- Explore Courses
- Favorites
- Create Course
- Profile

---

# 👩‍💻 Developer

**Brindha R A**

GitHub:
https://github.com/Brindhajay

---

# 📄 License

This project is developed for learning and portfolio purposes.
