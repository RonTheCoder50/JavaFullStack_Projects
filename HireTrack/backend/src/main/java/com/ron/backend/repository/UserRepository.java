package com.ron.backend.repository;

import com.ron.backend.entity.Users;
import com.ron.backend.model.ChartDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Users findById(long id);
    Users findByUsername(String username);
    Users findByUsernameAndPassword(String username, String password);

    @Query("""
       SELECT COUNT(a)
       FROM Users a
       WHERE a.dateOfJoining = :date
    """)
    Long getUserCountByDate(@Param("date") LocalDate date);

    @Query(value = """
        SELECT 
        DATE_FORMAT(date_of_joining, '%b') as label,
        COUNT(*) as value
        FROM users
        WHERE YEAR(date_of_joining) = YEAR(CURRENT_DATE)
        GROUP BY DATE_FORMAT(date_of_joining, '%b'), MONTH(date_of_joining)
        ORDER BY MONTH(date_of_joining)
    """, nativeQuery = true)
    List<ChartDto> getYearlyUserCountAnalysis();
}
