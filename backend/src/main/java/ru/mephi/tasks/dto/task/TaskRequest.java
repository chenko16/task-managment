package ru.mephi.tasks.dto.task;

import lombok.Data;
import ru.mephi.tasks.config.enums.TaskStatus;
import ru.mephi.tasks.config.enums.TaskType;

import java.sql.Timestamp;

@Data
public class TaskRequest {
    private Long id;
    private String title;
    private TaskStatus status;
    private TaskType type;
    private Long reporterId;
    private Long assigneeId;
    private String description;
    private Timestamp created;
}
