package com.ron.backend.repository;

import com.ron.backend.entity.Analysis;
import com.ron.backend.model.ChartDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AnalysisRepository extends JpaRepository<Analysis, Long> {
    @Query("""
        SELECT AVG(a.ats)
        FROM Analysis a
    """)
    Double getAvgAtsScore();

    @Query("""
        SELECT COUNT(a)
        FROM Analysis a
        WHERE a.date >= :startOfDay
        AND a.date < :endOfDay
    """)
    Integer getAnalysisOfToday(
            @Param("startOfDay") LocalDateTime startOfDay,
            @Param("endOfDay") LocalDateTime endOfDay
    );

    @Query("""
       SELECT COALESCE(AVG(a.ats), 0)
       FROM Analysis a
       WHERE a.user.id = :userId
       """)
    Double getAverageAtsScore(Long userId);

    @Query("""
       SELECT COUNT(a)
       FROM Analysis a
       WHERE a.user.id = :userId
       """)
    Long getTotalAnalysis(Long userId);

    Analysis findByFilenameAndUserId(String fileName, Long userId);

    //chart query
    @Query("""
        SELECT COUNT(a)
        FROM Analysis a
        WHERE a.date >= :start
        AND a.date < :end
    """)
    Long getAnalysisCountByDate(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );

    @Query(value = """
        SELECT 
        DATE_FORMAT(date, '%b') as label,
        COUNT(*) as value
        FROM analysis
        WHERE YEAR(date) = YEAR(CURRENT_DATE)
        GROUP BY DATE_FORMAT(date, '%b'), MONTH(date)
        ORDER BY MONTH(date)
    """, nativeQuery = true)
    List<ChartDto> getYearlyAnalysesCount();
}
