package com.ron.backend_blog2.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostUpdateDto {
    private Long postId;
    private Long userId;

    private String title;
    private String content;
}
