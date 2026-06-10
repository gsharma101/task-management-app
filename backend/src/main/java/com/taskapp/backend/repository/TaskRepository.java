package com.taskapp.backend.repository;

import com.taskapp.backend.entity.Task;
import com.taskapp.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

    Page<Task> findByUser(User user, Pageable pageable);
}