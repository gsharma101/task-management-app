package com.taskapp.backend.controller;

import com.taskapp.backend.dto.TaskRequestDto;
import com.taskapp.backend.dto.TaskResponseDto;
import com.taskapp.backend.enums.TaskStatus;
import com.taskapp.backend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public TaskResponseDto createTask(
            @Valid @RequestBody TaskRequestDto requestDto
    ) {
        return taskService.createTask(requestDto);
    }

    @GetMapping
    public Page<TaskResponseDto> getAllTasks(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size,

            @RequestParam(required = false) TaskStatus status,

            @RequestParam(defaultValue = "createdAt") String sortBy
    ) {

        return taskService.getAllTasks(
                page,
                size,
                status,
                sortBy
        );
    }

    @GetMapping("/{id}")
    public TaskResponseDto getTaskById(
            @PathVariable Long id
    ) {
        return taskService.getTaskById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(
            @PathVariable Long id
    ) {

        taskService.deleteTask(id);

        return "Task deleted successfully";
    }

    @PatchMapping("/{id}")
    public TaskResponseDto updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequestDto requestDto
    ) {

        return taskService.updateTask(id, requestDto);
    }
}