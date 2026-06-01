package com.ron.backend.repository;

import com.ron.backend.entity.UserHistory;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<UserHistory, Integer> {
    List<UserHistory> findTop5ByUser_IdOrderByDateDesc(Long userId);
    List<UserHistory> findByUser_IdOrderByDateDesc(Long userId);

    @Modifying
    @Transactional
    void deleteByUser_IdAndFileName(Long userId, String fileName);

    UserHistory findByUser_IdAndFileName(Long userId, String fileName);

    Page<UserHistory> findByUser_IdAndFileNameContainingIgnoreCase(
            Long userId,
            String fileName,
            Pageable pageable
    );

    Page<UserHistory> findAllByUser_Id(Long userId, Pageable pageable);
}
