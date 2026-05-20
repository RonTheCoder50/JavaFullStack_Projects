package com.ron.backend.repository;

import com.ron.backend.entity.Analysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AnalysisRepository extends JpaRepository<Analysis, Long> {
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
}
