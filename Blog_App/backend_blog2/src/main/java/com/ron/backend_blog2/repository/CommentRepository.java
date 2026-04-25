package com.ron.backend_blog2.repository;

import com.ron.backend_blog2.entity.Comment;
import com.ron.backend_blog2.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    void deleteById(Long id);
}
