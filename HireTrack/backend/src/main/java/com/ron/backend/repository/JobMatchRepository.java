package com.ron.backend.repository;

import com.ron.backend.entity.JobMatchAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobMatchRepository extends JpaRepository<JobMatchAnalysis, Long> {
    List<JobMatchAnalysis> findAllByUser_Id(Long id);
}
