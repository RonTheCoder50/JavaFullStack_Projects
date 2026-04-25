package com.ron.backend_blog2.dto;

import com.ron.backend_blog2.entity.Bookmark;
import com.ron.backend_blog2.entity.Post;
import com.ron.backend_blog2.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UserResponseDto {
    private Long id;
    private String username;
    private String email;
    private List<Post> posts;
    private List<Bookmark> bookmarks;
    private Role role;
    private LocalDate joinDate;

    public UserResponseDto(
            Long id,
            String username,
            String email,
            List<Post> posts,
            List<Bookmark> bookmarks,
            Role role,
            LocalDate joinDate
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.posts = posts;
        this.bookmarks = bookmarks;
        this.role = role;
        this.joinDate = joinDate;
    }
}
