package com.ron.backend_blog2.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "likes")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate time;

    @ManyToOne
    @JoinColumn(name = "post_id")
    @JsonBackReference("post-likes")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"posts"})
    private Users user;

    public Like(Post post, Users user) {
        this.post = post;
        this.user = user;
    }
}
