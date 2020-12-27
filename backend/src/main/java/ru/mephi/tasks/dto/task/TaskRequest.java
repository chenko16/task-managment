package ru.mephi.tasks.dto.task;

import lombok.Data;
import ru.mephi.tasks.config.enums.TaskStatus;
import ru.mephi.tasks.config.enums.TaskType;
import ru.mephi.tasks.dto.projectUser.ProjectUserDto;

import java.sql.Timestamp;

@Data
public class TaskRequest {
    private Long id;
    private String title;
    private TaskStatus status;
    private TaskType type;
    private ProjectUserDto reporter;
    private ProjectUserDto assignee;
    private String description;
    private Timestamp created;
}
