package com.taskapp.backend.service;

import com.taskapp.backend.dto.AuthResponseDto;
import com.taskapp.backend.dto.LoginRequestDto;
import com.taskapp.backend.dto.SignupRequestDto;
import com.taskapp.backend.entity.User;
import com.taskapp.backend.enums.Role;
import com.taskapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public AuthResponseDto signup(SignupRequestDto requestDto) {

        if (userRepository.findByEmail(requestDto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .name(requestDto.getName())
                .email(requestDto.getEmail())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .role(Role.USER)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        return AuthResponseDto.builder()
                .message("User registered successfully")
                .build();
    }

    public AuthResponseDto login(LoginRequestDto requestDto) {

        User user = userRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        boolean isPasswordMatch = passwordEncoder.matches(
                requestDto.getPassword(),
                user.getPassword()
        );

        if (!isPasswordMatch) {
            throw new RuntimeException("Invalid email or password");
        }

        return AuthResponseDto.builder()
                .message("Login successful")
                .build();
    }
}