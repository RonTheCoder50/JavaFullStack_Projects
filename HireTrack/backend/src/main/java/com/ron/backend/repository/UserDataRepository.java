package com.ron.backend.repository;

import com.ron.backend.entity.UserData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDataRepository extends JpaRepository<UserData, Long> {
    UserData findByUserId(Long id);

    @Query("""
        SELECT COUNT(u) 
        FROM UserData u
        WHERE u.plan = "FREE"  
    """)
    Long getCountOfFreePlanUsers();

    @Query("""
        SELECT COUNT(u) 
        FROM UserData u
        WHERE u.plan = "PRO"  
    """)
    Long getCountOfProPlanUsers();

}
