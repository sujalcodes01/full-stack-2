package com.experiment.restapi.post;

import java.util.List;
import java.util.Optional;

public interface PostRepository {
    List<Post> findAll();
    Optional<Post> findById(Long id);
    Post save(Post post);
    boolean existsById(Long id);
    void deleteById(Long id);
}
