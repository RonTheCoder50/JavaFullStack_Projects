package com.ron.backend_blog2.repository;

import com.ron.backend_blog2.entity.Like;
import com.ron.backend_blog2.entity.Post;
import com.ron.backend_blog2.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Like findByPostAndUser(Post post, Users user);
    void deleteByPostAndUser(Post post, Users user);
}
