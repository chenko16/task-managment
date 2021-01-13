package ru.mephi.tasks.dto.task;

import lombok.Data;
import ru.mephi.tasks.config.enums.TaskStatus;
import ru.mephi.tasks.config.enums.TaskType;
import ru.mephi.tasks.dto.user.UserDto;

import java.sql.Timestamp;

@Data
public class TaskDto {
    private Long id;
    private String title;
    private TaskStatus status;
    private TaskType type;
    private UserDto reporter;
    private UserDto assignee;
    private String description;
    private Timestamp created;
}
