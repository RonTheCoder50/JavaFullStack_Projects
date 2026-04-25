package com.ron.backend_blog2.controller;

import com.ron.backend_blog2.dto.CommentRequest;
import com.ron.backend_blog2.dto.PostDto;
import com.ron.backend_blog2.dto.PostUpdateDto;
import com.ron.backend_blog2.entity.Bookmark;
import com.ron.backend_blog2.entity.Comment;
import com.ron.backend_blog2.entity.Post;
import com.ron.backend_blog2.entity.Users;
import com.ron.backend_blog2.enums.Role;
import com.ron.backend_blog2.service.PostService;
import com.ron.backend_blog2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/post")
//@CrossOrigin
public class PostController {
    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    //crud
    @PostMapping("/add")
    public ResponseEntity<Post> addPost(@RequestBody PostDto post) {
        return ResponseEntity.ok(postService.addPost(post));
    }

    @PutMapping("/update")
    public ResponseEntity<Post> updatePost(@RequestBody PostUpdateDto post) {
        Users currLogin =  userService.getUserById(post.getUserId());
        Post pst = postService.getPost(post.getPostId());

        if(pst == null) {
            return null;
        }

        if(pst.getUser().getId().equals(currLogin.getId())) {
            return ResponseEntity.ok(postService.updatePost(pst, post));
        }

        return ResponseEntity.status(403).body(null);
    }

    @DeleteMapping("/remove/{post_id}/{user_id}")
    public ResponseEntity<String> deletePost(@PathVariable Long post_id, @PathVariable Long user_id) {
        Post post = postService.getPost(post_id);
        Users currLogin = userService.getUserById(user_id);

        if(post == null) {
            return ResponseEntity.status(404).body("post not found");
        }

        if(currLogin.getId().equals(post.getUser().getId())
                || currLogin.getRole() == Role.ADMIN) {
            return ResponseEntity.status(200).body(postService.deletePost(post_id));
        }

        return ResponseEntity.status(403).body("can't delete other's post!");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Long id) {
        Post pst = postService.getPost(id);
        if(pst == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(pst);
    }

    @GetMapping("/all")
    public List<Post> findAll() {
        return postService.getAllPosts();
    }

    //like / dislike post
    @PostMapping("/like/{post_id}/{user_id}")
    public ResponseEntity<String> likePost(@PathVariable Long post_id,
                                           @PathVariable Long user_id)
    {
        return ResponseEntity.ok(postService.toggleLike(post_id, user_id));
    }

    //comment
    @PostMapping("/comment")
    public ResponseEntity<Comment> addComment(@RequestBody CommentRequest comment) {
        if(comment.getUserId() == null || comment.getPostId() == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Users user = userService.getUserById(comment.getUserId());
        Post post = postService.getPost(comment.getPostId());

        Comment comm = new Comment();
        comm.setId(comment.getId());
        comm.setUser(user);
        comm.setPost(post);
        comm.setUser_name(user.getUsername());
        comm.setComment(comment.getComment());

        return ResponseEntity.ok(postService.addComment(comm));
    }

    @DeleteMapping("/comment/{id}")
    public String deleteComment(@PathVariable Long id) {
        return postService.removeComment(id);
    }

    //bookmark
    @PostMapping("/bookmark/{post_id}/{user_id}")
    public ResponseEntity<String> addBookmark(
            @PathVariable Long post_id,
            @PathVariable Long user_id
    ) {
        return ResponseEntity.status(200).
                body(postService.toggleBookMark(post_id, user_id));
    }

    @PostMapping("/bookmark/exist/{post_id}/{user_id}")
    public ResponseEntity<Boolean> bookmarkExist(
            @PathVariable Long post_id,
            @PathVariable Long user_id
    ) {
        return ResponseEntity.ok(postService.bookMarkExist(post_id, user_id));
    }
}
