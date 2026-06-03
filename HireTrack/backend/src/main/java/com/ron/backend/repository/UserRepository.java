package com.ron.backend.repository;

import com.ron.backend.entity.Users;
import com.ron.backend.model.ChartDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findById(Long id);
    Users findByUsername(String username);
    Users findByEmail(String email);
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

    Page<Users> findByUsernameContainingIgnoreCase(String username, Pageable pageable);
}
