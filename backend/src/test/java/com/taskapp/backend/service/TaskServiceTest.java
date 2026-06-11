package com.taskapp.backend.service;

import com.taskapp.backend.dto.TaskRequestDto;
import com.taskapp.backend.dto.TaskResponseDto;
import com.taskapp.backend.entity.Task;
import com.taskapp.backend.entity.User;
import com.taskapp.backend.enums.Priority;
import com.taskapp.backend.enums.TaskStatus;
import com.taskapp.backend.repository.TaskRepository;
import com.taskapp.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TaskService taskService;

    private User mockUser;

    @BeforeEach
    void setup() {

        mockUser = User.builder()
                .id(1L)
                .name("Gaurav")
                .email("gaurav@test.com")
                .password("password123")
                .build();

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(
                        mockUser.getEmail(),
                        null
                )
        );
    }

    @Test
    void shouldCreateTaskSuccessfully() {

        TaskRequestDto requestDto = new TaskRequestDto();

        requestDto.setTitle("Learn Spring Boot");
        requestDto.setDescription("Complete authentication module");
        requestDto.setStatus(TaskStatus.PENDING);
        requestDto.setPriority(Priority.HIGH);
        requestDto.setDueDate(LocalDate.now());

        when(userRepository.findByEmail(mockUser.getEmail()))
                .thenReturn(Optional.of(mockUser));

        Task savedTask = Task.builder()
                .id(1L)
                .title(requestDto.getTitle())
                .description(requestDto.getDescription())
                .status(requestDto.getStatus())
                .priority(requestDto.getPriority())
                .dueDate(requestDto.getDueDate())
                .user(mockUser)
                .build();

        when(taskRepository.save(any(Task.class)))
                .thenReturn(savedTask);

        TaskResponseDto response =
                taskService.createTask(requestDto);

        assertNotNull(response);

        assertEquals(
                "Learn Spring Boot",
                response.getTitle()
        );

        verify(taskRepository, times(1))
                .save(any(Task.class));
    }

    @Test
    void shouldGetTaskByIdSuccessfully() {

        when(userRepository.findByEmail(mockUser.getEmail()))
                .thenReturn(Optional.of(mockUser));

        Task task = Task.builder()
                .id(1L)
                .title("Task")
                .description("Description")
                .status(TaskStatus.PENDING)
                .priority(Priority.MEDIUM)
                .dueDate(LocalDate.now())
                .user(mockUser)
                .build();

        when(taskRepository.findById(1L))
                .thenReturn(Optional.of(task));

        TaskResponseDto response =
                taskService.getTaskById(1L);

        assertNotNull(response);

        assertEquals(
                "Task",
                response.getTitle()
        );
    }

    @Test
    void shouldDeleteTaskSuccessfully() {

        when(userRepository.findByEmail(mockUser.getEmail()))
                .thenReturn(Optional.of(mockUser));

        Task task = Task.builder()
                .id(1L)
                .title("Delete Task")
                .user(mockUser)
                .build();

        when(taskRepository.findById(1L))
                .thenReturn(Optional.of(task));

        taskService.deleteTask(1L);

        verify(taskRepository, times(1))
                .delete(task);
    }
}