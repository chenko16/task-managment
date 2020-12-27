package ru.mephi.tasks.service.task;

import ru.mephi.tasks.config.enums.TaskStatus;
import ru.mephi.tasks.config.enums.TaskType;
import ru.mephi.tasks.dto.task.TaskDto;

import java.util.List;
import java.util.Optional;

public interface TaskService {
    TaskDto createTask(TaskDto taskDto);
    Optional<TaskDto> getTask(Long id);
    List<TaskDto> getTaskList();
    void deleteTask(Long id);
    void updateTaskDescription(Long id, String description);
    void updateTaskStatus(Long id, TaskStatus taskStatus);
    void updateTaskType(Long id, TaskType taskType);
    void updateTaskTitle(Long id, String title);
    void setAssignee(Long id, Long userId);
}
