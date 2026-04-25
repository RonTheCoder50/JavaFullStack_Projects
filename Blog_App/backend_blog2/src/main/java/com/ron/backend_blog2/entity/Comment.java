package com.ron.backend_blog2.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "TEXT", nullable = false)
    private String comment;

    private LocalDateTime date;
    private String user_name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"posts"})
    private Users user;

    @ManyToOne
    @JoinColumn(name = "post_id")
    @JsonBackReference("post-comments")
    private Post post;
}
