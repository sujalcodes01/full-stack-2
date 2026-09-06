package com.experiment.restapi.post;

import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class InMemoryPostRepository implements PostRepository {
    private final ConcurrentHashMap<Long, Post> store = new ConcurrentHashMap<>();
    private final AtomicLong ids = new AtomicLong();
    public List<Post> findAll() { return store.values().stream().sorted(Comparator.comparing(Post::id)).toList(); }
    public Optional<Post> findById(Long id) { return Optional.ofNullable(store.get(id)); }
    public Post save(Post post) {
        Long id = post.id() == null ? ids.incrementAndGet() : post.id();
        Post saved = new Post(id, post.title(), post.content(), post.author());
        store.put(id, saved);
        return saved;
    }
    public boolean existsById(Long id) { return store.containsKey(id); }
    public void deleteById(Long id) { store.remove(id); }
}
