package com.ron.backend_blog2.service;

import com.ron.backend_blog2.entity.Users;
import com.ron.backend_blog2.exceptions.UnAuthorizedException;
import com.ron.backend_blog2.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTesting {

    @Mock
    private UserRepository userRepository;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private HttpSession session;

    @Mock
    private HttpServletRequest request;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    //login test
    @Test
    public void shouldLoginSuccessfully() {
        Users inputUser = new Users(
            "xyz123@gmail.com",
                "1234"
        );

        Users dbUser = new Users(
            "xyz123@gmail.com",
                "encodedpassword"
        );

        Authentication auth = mock(Authentication.class);
        when(authenticationManager.authenticate(any()))
                .thenReturn(auth);

        when(request.getSession(true))
                .thenReturn(session);

        when(userRepository.findByEmail(anyString()))
                .thenReturn(dbUser);

        Users result = userService.userLogin(inputUser, request);

        assertNotNull(result);
        assertEquals(
                "xyz123@gmail.com",
                result.getEmail()
        );
    }

    @Test
    public void shouldThrowUnauthorizedException() {
        Users inputUser = new Users(
                "ron123@gmail.com",
                "wrongpassword"
        );

        when(authenticationManager.authenticate(any()))
                .thenThrow(new BadCredentialsException("Bad Credentials"));

        UnAuthorizedException ex =
            assertThrows(
                    UnAuthorizedException.class,
                    () -> userService.userLogin(inputUser, request)
            );

        assertEquals("user not found!", ex.getMessage());
    }

    //register test
    //is userInfo save to db? is pass-encoder works properly?
    @Test
    public void shouldRegisterSuccessfully() {
        Users inputUser = new Users(
                "ron123@gmail.com",
                "1234"
        );

        when(passwordEncoder.encode(anyString()))
            .thenReturn(null);

        when(userRepository.save(any()))
                .thenReturn(inputUser);

        Users result = userRepository.save(inputUser);

        assertNotNull(result);
    }
}
