package com.taskapp.backend.controller;

import com.taskapp.backend.dto.TaskRequestDto;
import com.taskapp.backend.dto.TaskResponseDto;
import com.taskapp.backend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
    public List<TaskResponseDto> getAllTasks() {
        return taskService.getAllTasks();
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