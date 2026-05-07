package com.ron.backend.repository;

import com.ron.backend.entity.Analysis;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<Analysis,Long> {

}
