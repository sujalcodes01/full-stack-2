# Spring Boot REST API Experiment

This project demonstrates RESTful CRUD APIs for **posts** and **schedules**. It uses a layered architecture:

- `controller` receives HTTP requests and returns response entities.
- `service` holds the application logic.
- `repository` abstracts data access. The included thread-safe in-memory implementations make the project run without a database.
- `common` provides one response envelope and central error handling.

## Run

Use JDK 17 or later and Maven 3.9 or later, then run:

```powershell
mvn spring-boot:run
```

The server starts at `http://localhost:8080`.

## Endpoints

| Resource | Methods | URI |
|---|---|---|
| Posts | GET, POST | `/api/posts` |
| Posts | GET, PUT, DELETE | `/api/posts/{id}` |
| Schedules | GET, POST | `/api/schedules` |
| Schedules | GET, PUT, DELETE | `/api/schedules/{id}` |

### Create a post

```json
POST /api/posts
{
  "title": "Spring Boot REST API",
  "content": "A validated API example.",
  "author": "Sujal"
}
```

### Create a schedule

```json
POST /api/schedules
{
  "title": "API demonstration",
  "scheduledAt": "2026-12-01T10:30:00",
  "location": "Computer Lab"
}
```

Every result has the form below. Validation errors are placed in `data` as a field-to-message map.

```json
{
  "success": true,
  "message": "Post created",
  "data": { "id": 1, "title": "Spring Boot REST API" },
  "timestamp": "2026-09-06T00:00:00Z"
}
```

## Validation and CORS

`@NotBlank`, `@NotNull`, `@Size`, and `@FutureOrPresent` validate incoming JSON before the service layer runs. CORS allows browser clients at `http://localhost:3000` and `http://localhost:5173` to call `/api/**`; change these origins in `CorsConfig` for deployment.
