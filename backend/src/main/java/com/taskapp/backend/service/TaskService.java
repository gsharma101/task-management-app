package com.taskapp.backend.service;

import com.taskapp.backend.dto.TaskRequestDto;
import com.taskapp.backend.dto.TaskResponseDto;
import com.taskapp.backend.entity.Task;
import com.taskapp.backend.entity.User;
import com.taskapp.backend.enums.TaskStatus;
import com.taskapp.backend.exception.ResourceNotFoundException;
import com.taskapp.backend.repository.TaskRepository;
import com.taskapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final S3Service s3Service;

    public TaskResponseDto createTask(TaskRequestDto requestDto) {

        User currentUser = getCurrentUser();

        Task task = Task.builder()
                .title(requestDto.getTitle())
                .description(requestDto.getDescription())
                .status(requestDto.getStatus())
                .priority(requestDto.getPriority())
                .dueDate(requestDto.getDueDate())
                .attachmentUrl(requestDto.getAttachmentUrl())
                .attachmentName(requestDto.getAttachmentName())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .user(currentUser)
                .build();

        Task savedTask = taskRepository.save(task);

        return mapToResponseDto(savedTask);
    }

    public Page<TaskResponseDto> getAllTasks(
            int page,
            int size,
            TaskStatus status,
            String sortBy,
            String search
    ) {

        User currentUser = getCurrentUser();

        Sort sort;

        if (sortBy.equals("dueDate")) {

            sort = Sort.by(sortBy).ascending();

        } else {

            sort = Sort.by(sortBy).descending();
        }

        Pageable pageable = PageRequest.of(
                page,
                size,
                sort
        );

        Page<Task> taskPage;

        if (search != null && !search.isEmpty()) {

            taskPage = taskRepository
                    .findByUserAndTitleContainingIgnoreCase(
                            currentUser,
                            search,
                            pageable
                    );

        } else if (status != null) {

            taskPage = taskRepository
                    .findByStatus(status, pageable);

        } else {

            taskPage = taskRepository.findByUser(currentUser, pageable);
        }

        if (sortBy.equals("priority")) {

            List<Task> sortedTasks =
                    new ArrayList<>(taskPage.getContent());

            sortedTasks.sort((a, b) ->
                    b.getPriority().ordinal()
                            - a.getPriority().ordinal()
            );

            return new PageImpl<>(
                    sortedTasks.stream()
                            .map(this::mapToResponseDto)
                            .toList(),
                    pageable,
                    taskPage.getTotalElements()
            );
        }

        return taskPage.map(this::mapToResponseDto);
    }

    public TaskResponseDto getTaskById(Long id) {

        User currentUser = getCurrentUser();

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found")
                );

        if (!task.getUser().getId().equals(currentUser.getId())) {

            throw new AccessDeniedException("Access denied");
        }

        return mapToResponseDto(task);
    }

    public void deleteTask(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found")
                );

        User currentUser = getCurrentUser();

        if (!task.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Access denied");
        }

        s3Service.deleteFile(task.getAttachmentUrl());
        taskRepository.delete(task);
    }

    public TaskResponseDto updateTask(Long id, TaskRequestDto requestDto) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found")
                );

        User currentUser = getCurrentUser();

        if (!task.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Access denied");
        }

        task.setTitle(requestDto.getTitle());
        task.setDescription(requestDto.getDescription());
        task.setStatus(requestDto.getStatus());
        task.setPriority(requestDto.getPriority());
        task.setDueDate(requestDto.getDueDate());
        task.setAttachmentUrl(requestDto.getAttachmentUrl());
        task.setAttachmentName(requestDto.getAttachmentName());
        task.setUpdatedAt(LocalDateTime.now());

        Task updatedTask = taskRepository.save(task);

        return mapToResponseDto(updatedTask);
    }

    private User getCurrentUser() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );
    }

    private TaskResponseDto mapToResponseDto(Task task) {

        return TaskResponseDto.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .attachmentUrl(task.getAttachmentUrl())
                .attachmentName(task.getAttachmentName())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
}