package ru.mephi.tasks.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mephi.tasks.dao.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
