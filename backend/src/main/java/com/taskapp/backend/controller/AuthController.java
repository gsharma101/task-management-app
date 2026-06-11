package com.taskapp.backend.controller;

import com.taskapp.backend.dto.AuthResponseDto;
import com.taskapp.backend.dto.LoginRequestDto;
import com.taskapp.backend.dto.SignupRequestDto;
import com.taskapp.backend.dto.UserResponseDto;
import com.taskapp.backend.entity.User;
import com.taskapp.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public AuthResponseDto signup(
            @Valid @RequestBody SignupRequestDto requestDto
    ) {

        return authService.signup(requestDto);
    }

    @PostMapping("/login")
    public AuthResponseDto login(
            @Valid @RequestBody LoginRequestDto requestDto
    ) {

        return authService.login(requestDto);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getCurrentUser(
            Authentication authentication
    ) {

        User user = authService.getCurrentUser(
                authentication.getName()
        );

        UserResponseDto response = new UserResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail()
        );

        return ResponseEntity.ok(response);
    }
}