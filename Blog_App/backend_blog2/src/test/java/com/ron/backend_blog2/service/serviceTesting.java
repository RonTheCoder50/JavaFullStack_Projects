package com.ron.backend_blog2.service;

import com.ron.backend_blog2.BackendBlog2Application;
import com.ron.backend_blog2.entity.Users;
import com.ron.backend_blog2.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = BackendBlog2Application.class)
@ActiveProfiles("dev")
public class serviceTesting {

    @Autowired
    private UserRepository repo;

    @Test
    public void serviceTesting(){
        Users user = repo.findByUsername("ron");
        assertEquals(user.getUsername(),"ron");
        assertTrue(user.getPassword() == null);
    }

    @ParameterizedTest
    @CsvSource({
            "ron",
            "demo01",
            "kwon"
    })
    public void paramTesting(String name) {
        assertNotNull(repo.findByUsername(name));
    }
}
