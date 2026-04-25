package com.ron.backend_blog2.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String comment;
    private Long userId;
    private Long postId;
}
