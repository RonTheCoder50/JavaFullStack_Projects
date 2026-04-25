package com.ron.backend_blog2.repository;

import com.ron.backend_blog2.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    Bookmark findByUser_IdAndPost_Id(long user_id, long post_id);
}
