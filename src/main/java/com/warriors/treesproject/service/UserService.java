package com.warriors.treesproject.service;

import com.warriors.treesproject.entity.User;
import com.warriors.treesproject.repository.UserRepository;
import com.warriors.treesproject.security.BcryptPasswordEncoder;
import com.warriors.treesproject.security.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BcryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, BcryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getUserById(Long id) {
        User user = userRepository.findById(id).get();
        return user;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void saveUser(User user) {
        if (!user.getPassword().startsWith("$2a$10")) {
            String encodedPassword = passwordEncoder.passwordEncoder().encode(user.getPassword());
            user.setPassword(encodedPassword);
        }
        if (user.getEmail().endsWith("@derzh.com")) {
            user.setRole(Role.ADMIN);
        } else if (user.getEmail().endsWith("@activist.com")) {
            user.setRole(Role.ACTIVIST);
        }
        userRepository.save(user);
    }
}
