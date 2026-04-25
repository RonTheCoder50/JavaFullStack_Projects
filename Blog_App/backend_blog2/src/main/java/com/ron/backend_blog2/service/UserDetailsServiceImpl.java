package com.ron.backend_blog2.service;

import com.ron.backend_blog2.entity.Users;
import com.ron.backend_blog2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.ron.backend_blog2.model.UserPrinciple;

import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository repo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user = repo.findByEmail(email);

        if(user == null){
            throw new UsernameNotFoundException("user not found -> "  + email);
        }

        return new UserPrinciple(user);
    }
}
