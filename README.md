# SkillTrack

SkillTrack is a small personal learning and course-progress tracker. A user can add courses from platforms like Udemy, Coursera, or YouTube, update progress, filter courses, and remove completed or unwanted records.

This project is built for a fresher-level technical interview assignment. The main focus is a clean Spring Boot REST backend, PostgreSQL persistence, basic validation, and a simple React/Next.js frontend.

## Technologies Used

- Frontend: Next.js, React, TypeScript
- Backend: Java 17, Spring Boot, Spring Data JPA, REST APIs
- Database: PostgreSQL
- Tools: Maven, Git, GitHub

## Features

- Create, read, update, and delete courses
- Search by course title or instructor
- Filter by status and priority
- Track platform, category, progress, dates, and notes
- Validate required fields and progress range
- Return meaningful backend error responses

## Project Structure

```text
skilltrack/
|- backend/      Spring Boot REST API
|- frontend/     Next.js React UI
`- README.md
```

## Backend Flow

The frontend sends a request to the REST controller. The controller receives the request DTO and passes it to the service. The service applies business rules, such as progress validation and date validation. Then the repository communicates with PostgreSQL through Spring Data JPA. The backend returns a response DTO to the frontend.

Simple explanation:

```text
React UI -> REST Controller -> Service -> Repository -> PostgreSQL
```

## Main Entity

The main entity is `Course`.

Important fields:

- `title`
- `instructor`
- `platform`
- `category`
- `status`: `PLANNED`, `IN_PROGRESS`, `COMPLETED`, `ON_HOLD`
- `progressPercentage`: `0` to `100`
- `priority`: `LOW`, `MEDIUM`, `HIGH`
- `startDate`
- `targetCompletionDate`
- `notes`

## API Summary

Base URL:

```text
http://localhost:8081/api
```

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/courses` | Get all courses |
| `GET` | `/courses?search=java` | Search by title or instructor |
| `GET` | `/courses?status=IN_PROGRESS` | Filter by status |
| `GET` | `/courses?priority=HIGH` | Filter by priority |
| `GET` | `/courses/{id}` | Get one course |
| `POST` | `/courses` | Create a course |
| `PUT` | `/courses/{id}` | Update a course |
| `DELETE` | `/courses/{id}` | Delete a course |

Example create request:

```json
{
  "title": "Spring Boot REST APIs",
  "instructor": "John Doe",
  "platform": "Udemy",
  "category": "Backend",
  "status": "IN_PROGRESS",
  "progressPercentage": 40,
  "priority": "HIGH",
  "startDate": "2026-07-13",
  "targetCompletionDate": "2026-07-25",
  "notes": "Focus on controller, service, repository flow."
}
```

## PostgreSQL Setup

Create the database:

```sql
CREATE DATABASE skilltrack_db;
```

The application uses this default connection:

```text
jdbc:postgresql://localhost:5432/skilltrack_db
username: postgres
```

For the password, create this file:

```text
backend/src/main/resources/application-local.properties
```

Add your local PostgreSQL password:

```properties
spring.datasource.password=YOUR_POSTGRES_PASSWORD
```

The real `application-local.properties` file is ignored by Git so your password is not uploaded.

## Run Backend

Open `backend` in IntelliJ and run `SkillTrackApplication`.

Or run from terminal:

```bash
cd backend
mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8081
```

## Run Frontend

Open `frontend` in VS Code.

Install dependencies if needed:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:3000
```

## Interview Explanation

I chose SkillTrack because it is a small but practical app. It is not only a basic movie or notes app. It still has a simple scope, but it shows real backend understanding: CRUD APIs, DTOs, service-layer validation, repository/database usage, search, filters, and error handling.

PostgreSQL is used as the database. Since the app uses Spring Data JPA, most database operations are handled through the repository, so the code is similar to using MySQL with JPA.

## AI and References

AI assistance was used for planning, implementation guidance, and explanation. Official Spring Boot, PostgreSQL, and Next.js documentation were used as references. The code is kept simple so the workflow can be explained clearly during the technical discussion.
