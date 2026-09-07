package com.experiment.restapi.post;

import com.experiment.restapi.common.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PostService {
    private final PostRepository repository;
    public PostService(PostRepository repository) { this.repository = repository; }
    public List<Post> getAll() { return repository.findAll(); }
    public Post getById(Long id) { return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post " + id + " was not found")); }
    public Post create(PostRequest request) { return repository.save(new Post(null, request.title(), request.content(), request.author())); }
    public Post update(Long id, PostRequest request) {
        getById(id);
        return repository.save(new Post(id, request.title(), request.content(), request.author()));
    }
    public void delete(Long id) { getById(id); repository.deleteById(id); }
}
