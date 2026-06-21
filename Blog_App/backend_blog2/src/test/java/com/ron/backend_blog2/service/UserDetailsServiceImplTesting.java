package com.ron.backend_blog2.service;

import com.ron.backend_blog2.entity.Users;
import com.ron.backend_blog2.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

public class UserDetailsServiceImplTesting {

    @InjectMocks
    UserDetailsServiceImpl userDetailsServiceImpl;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void loadUserByUsernameTest() {
        Users user = new Users(
                "ron",
                "ankvnais",
                null
        );

        when(userRepository.findByEmail(anyString())).thenReturn(user);

        UserDetails result = userDetailsServiceImpl.loadUserByUsername("ron");
        Assertions.assertNotNull(result);
    }
}
