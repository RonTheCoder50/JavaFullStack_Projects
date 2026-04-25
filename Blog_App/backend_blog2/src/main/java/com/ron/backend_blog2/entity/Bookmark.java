package com.ron.backend_blog2.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference("post-bookmarks")
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @JsonIgnoreProperties("bookmarks")
    @JoinColumn(name = "user_id")
    private Users user;
}
