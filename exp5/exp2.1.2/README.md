# Global Exception Handling and Structured Logging Experiment

This Spring Boot application demonstrates centralized REST error handling and request-level observability.

## Run

Use JDK 17+ and Maven:

```bash
mvn spring-boot:run
```

The server starts on `http://localhost:8080`.

## Try the API

```bash
# Successful request; server generates and returns X-Correlation-ID
curl -i http://localhost:8080/api/users/1

# Preserve a supplied correlation ID in response, logs, and error body
curl -i -H "X-Correlation-ID: lab-123" http://localhost:8080/api/users/99

# Validation error
curl -i -X POST http://localhost:8080/api/users -H "Content-Type: application/json" -d "{\"name\":\"\",\"email\":\"bad\"}"

# Unexpected error (safe, standardized 500 response)
curl -i http://localhost:8080/api/users/simulate-error
```

## What to observe

`CorrelationIdLoggingFilter` assigns or forwards `X-Correlation-ID`, places it in SLF4J MDC, returns it in the response header, and logs request start/completion with status and duration. `GlobalExceptionHandler` (`@RestControllerAdvice`) returns the uniform `ApiError` payload for domain, validation, and unexpected exceptions. Console logs include the correlation ID through Logback's MDC-aware pattern.
