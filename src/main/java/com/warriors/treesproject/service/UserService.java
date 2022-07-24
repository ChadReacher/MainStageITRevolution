package com.warriors.treesproject.service;

import com.warriors.treesproject.entity.User;
import com.warriors.treesproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserById(Long id) {
        User user = userRepository.findById(id).get();
        return user;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
