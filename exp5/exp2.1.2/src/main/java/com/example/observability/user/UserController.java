package com.example.observability.user;

import com.example.observability.exception.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/{id}")
    public Map<String, Object> getUser(@PathVariable long id) {
        if (id != 1) throw new ResourceNotFoundException("User " + id + " was not found");
        return Map.of("id", 1, "name", "Asha", "email", "asha@example.com");
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> createUser(@Valid @RequestBody CreateUserRequest request) {
        log.info("user_creation_requested email={}", request.email());
        return Map.of("id", 2, "name", request.name(), "email", request.email());
    }

    @GetMapping("/simulate-error")
    public void simulateError() {
        throw new IllegalStateException("Demonstration failure");
    }
}
