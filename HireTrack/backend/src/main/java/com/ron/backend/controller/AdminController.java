package com.ron.backend.controller;

import com.ron.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import static org.springframework.security.authorization.AuthorityReactiveAuthorizationManager.hasRole;

@RestController
@RequestMapping("/")
public class AdminController {

    @Autowired
    private AdminService service;

    @GetMapping("/admin-data")
    public ResponseEntity<?> getAdminData() {
        return ResponseEntity.ok(service.getAdminData());
    }

    @GetMapping("/chart/user")
    public ResponseEntity<?> getUsersGrowthChartData(
            @RequestParam String type
    ) {
        return switch (type.toLowerCase()) {
            case "weekly" -> ResponseEntity.ok(service.getWeeklyCountOfUsers());
            case "monthly" -> ResponseEntity.ok(service.getMonthlyCountOfUsers());
            case "yearly" -> ResponseEntity.ok(service.getYearlyCountOfUsers());
            default -> throw new IllegalArgumentException("Invalid chart type");
        };
    }

    @GetMapping("/chart/analyses")
    public ResponseEntity<?> getAnalysesGrowthChartData(
            @RequestParam String type
    ) {
        return switch(type.toLowerCase()) {
            case "weekly" -> ResponseEntity.ok(service.getWeeklyCountOfAnalyses());
            case "monthly" -> ResponseEntity.ok(service.getMonthlyCountOfAnalyses());
            case "yearly" -> ResponseEntity.ok(service.getYearlyCountOfAnalyses());
            default -> throw new IllegalArgumentException("Invalid chart type");
        };
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/block")
    public ResponseEntity<?> toggleBlockUser(
            @RequestParam Long id,
            @RequestParam String username
    ) {
        return ResponseEntity.ok(service.toggleBlock(id, username));
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> removeUser(
            @RequestParam Long id,
            @RequestParam String username
    ) {
        return ResponseEntity.ok(service.deleteUser(id, username));
    }

    @GetMapping("/view")
    public ResponseEntity<?> viewAnalysis(
            @RequestParam Long id,
            @RequestParam String filename
    ) {
        return ResponseEntity.ok(service.getAnalysis(id, filename));
    }

    @GetMapping("/users")
    public ResponseEntity<?> getUsers (
        @RequestParam(defaultValue = "") String keyword,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "id") String sortBy,
        @RequestParam(defaultValue = "asc") String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        return ResponseEntity.ok(
                service.getUsersList(keyword, page, size, sort)
        );
    }
}
