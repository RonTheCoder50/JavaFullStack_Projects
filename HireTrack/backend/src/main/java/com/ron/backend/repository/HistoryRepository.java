package com.ron.backend.repository;

import com.ron.backend.entity.UserHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<UserHistory, Integer> {
    List<UserHistory> findTop5ByUserIdOrderByDateDesc(Long userId);
}
