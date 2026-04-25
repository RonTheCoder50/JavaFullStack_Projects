package com.ron.backend_blog2.repository;

import com.ron.backend_blog2.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

}
