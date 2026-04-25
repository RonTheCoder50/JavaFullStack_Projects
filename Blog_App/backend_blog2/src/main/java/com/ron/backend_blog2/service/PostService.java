package com.ron.backend_blog2.service;

import com.ron.backend_blog2.dto.PostDto;
import com.ron.backend_blog2.dto.PostUpdateDto;
import com.ron.backend_blog2.entity.*;
import com.ron.backend_blog2.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class PostService {
    @Autowired
    private PostRepository postRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private LikeRepository likeRepo;

    @Autowired
    private CommentRepository commentRepo;

    @Autowired
    private BookmarkRepository bookmarkRepo;

    //crud
    public Post addPost(PostDto post) {
        Users user = userRepo.findById(post.getUid()).orElse(null);
        if(user == null) {
            throw new RuntimeException("user not found!");
        }

        Post newPost =  new Post();
        newPost.setCreatedAt(LocalDateTime.now());

        newPost.setContent(post.getContent());
        newPost.setAuthor(post.getAuthor());
        newPost.setTitle(post.getTitle());
        newPost.setUser(user);

        return postRepo.save(newPost);
    }

    public Post updatePost(Post post, PostUpdateDto postDto) {
        if(postDto.getTitle() != null) {
            post.setTitle(postDto.getTitle());
        }
        if(postDto.getContent() != null) {
            post.setContent(postDto.getContent());
        }

        post.setUpdatedAt(LocalDateTime.now());
        return postRepo.save(post);
    }

    public String deletePost(Long id) {
        Post pst = postRepo.findById(id).orElse(null);
        if(pst == null) {
            throw new RuntimeException("post not found");
        }

        postRepo.delete(pst);
        return "post deleted!";
    }

    public Post getPost(Long id) {
        return postRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("post not found"));
    }

    public List<Post> getAllPosts() {
        return postRepo.findAll();
    }

    // -- can like post ~ tpggle post
    public String toggleLike(Long post_id, Long user_id) {
        Users user = userRepo.findById(user_id)
                .orElseThrow(() -> new RuntimeException("user not found"));

        Post post = postRepo.findById(post_id)
                .orElseThrow(() -> new RuntimeException("post not found"));

        Like existingLike = likeRepo.findByPostAndUser(post, user);
        System.out.println("like: " + existingLike);

        if(existingLike == null) {
            existingLike = new Like();
            user.setPassword(null);

            existingLike.setTime(LocalDate.now());
            existingLike.setUser(user);
            existingLike.setPost(post);

            likeRepo.save(existingLike);
            return "liked";
        } else {
            likeRepo.deleteByPostAndUser(post, user);
            return "disliked";
        }
    }

    // -- can comment
    //add comment
    public Comment addComment(Comment comment) {
        comment.setDate(LocalDateTime.now());
        return commentRepo.save(comment);
    }

    //remove
    public String removeComment(Long id) {
        commentRepo.deleteById(id);
        return "comment deleted!";
    }


    // -- can bookmark ~ toggle bookmark
    public String toggleBookMark(Long post_id, Long user_id) {
        Users user = userRepo.findById(user_id)
                .orElseThrow(() -> new RuntimeException("user not found"));

        Post post = postRepo.findById(post_id)
                .orElseThrow(() -> new RuntimeException("post not found"));

        Bookmark saved = bookmarkRepo.findByUser_IdAndPost_Id(user_id, post_id);

        //save | remove bookmark!
        if(saved == null){
            saved = new Bookmark();
            saved.setUser(user);
            saved.setPost(post);
            bookmarkRepo.save(saved);
            return "saved";
        } else {
            bookmarkRepo.delete(saved);
            return "remove";
        }
    }

    //bookmark exist or not ?
    public boolean bookMarkExist(Long post_id, Long user_id) {
        Users user = userRepo.findById(user_id)
                .orElseThrow(() -> new RuntimeException("user not found"));

        Post post = postRepo.findById(post_id)
                .orElseThrow(() -> new RuntimeException("post not found"));

        Bookmark isExist = bookmarkRepo.findByUser_IdAndPost_Id(user_id, post_id);

        return isExist != null;
    }
}
