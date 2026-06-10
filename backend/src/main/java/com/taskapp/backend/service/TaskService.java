package com.taskapp.backend.service;

import com.taskapp.backend.dto.TaskRequestDto;
import com.taskapp.backend.dto.TaskResponseDto;
import com.taskapp.backend.entity.Task;
import com.taskapp.backend.enums.TaskStatus;
import com.taskapp.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskResponseDto createTask(TaskRequestDto requestDto) {

        Task task = Task.builder()
                .title(requestDto.getTitle())
                .description(requestDto.getDescription())
                .status(requestDto.getStatus())
                .priority(requestDto.getPriority())
                .dueDate(requestDto.getDueDate())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Task savedTask = taskRepository.save(task);

        return mapToResponseDto(savedTask);
    }

    public Page<TaskResponseDto> getAllTasks(
            int page,
            int size,
            TaskStatus status,
            String sortBy
    ) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy).descending()
        );

        Page<Task> taskPage;

        if (status != null) {
            taskPage = taskRepository.findByStatus(status, pageable);
        } else {
            taskPage = taskRepository.findAll(pageable);
        }

        return taskPage.map(this::mapToResponseDto);
    }

    public TaskResponseDto getTaskById(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        return mapToResponseDto(task);
    }

    public void deleteTask(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        taskRepository.delete(task);
    }

    public TaskResponseDto updateTask(Long id, TaskRequestDto requestDto) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(requestDto.getTitle());
        task.setDescription(requestDto.getDescription());
        task.setStatus(requestDto.getStatus());
        task.setPriority(requestDto.getPriority());
        task.setDueDate(requestDto.getDueDate());
        task.setUpdatedAt(LocalDateTime.now());

        Task updatedTask = taskRepository.save(task);

        return mapToResponseDto(updatedTask);
    }

    private TaskResponseDto mapToResponseDto(Task task) {

        return TaskResponseDto.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
}