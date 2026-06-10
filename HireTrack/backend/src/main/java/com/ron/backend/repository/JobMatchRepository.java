package com.ron.backend.repository;

import com.ron.backend.entity.JobMatchAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobMatchRepository extends JpaRepository<JobMatchAnalysis, Long> {

}
