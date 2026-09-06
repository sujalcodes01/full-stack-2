package com.experiment.restapi.post;

import com.experiment.restapi.common.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final PostService service;
    public PostController(PostService service) { this.service = service; }
    @GetMapping public ApiResponse<List<Post>> getAll() { return ApiResponse.success("Posts retrieved", service.getAll()); }
    @GetMapping("/{id}") public ApiResponse<Post> getOne(@PathVariable Long id) { return ApiResponse.success("Post retrieved", service.getById(id)); }
    @PostMapping public ResponseEntity<ApiResponse<Post>> create(@Valid @RequestBody PostRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Post created", service.create(request)));
    }
    @PutMapping("/{id}") public ApiResponse<Post> update(@PathVariable Long id, @Valid @RequestBody PostRequest request) { return ApiResponse.success("Post updated", service.update(id, request)); }
    @DeleteMapping("/{id}") public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id); return ResponseEntity.ok(ApiResponse.success("Post deleted", null));
    }
}
