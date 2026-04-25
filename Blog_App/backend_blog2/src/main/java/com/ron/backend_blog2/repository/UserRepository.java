package com.ron.backend_blog2.repository;

import com.ron.backend_blog2.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByEmail(String username);
    Users findByEmailAndPassword(String email, String password);
}
