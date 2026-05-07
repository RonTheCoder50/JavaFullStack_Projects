//package com.ron.backend.entity;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//
//import java.time.LocalDate;
//
////@Entity
//public class UserData {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String name;
//    private LocalDate join_date;
//    private Boolean isAccountRemove;
//
//    private Long limits; //account limits = 5 (initially free tier)
//    private Boolean isProUser; // (for pro limits = 200/day)
//    private Boolean isProPlusUser; // (unlimited service) // $10 month / $109 annual
//}
