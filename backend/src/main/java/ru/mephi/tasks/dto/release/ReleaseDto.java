package ru.mephi.tasks.dto.release;

import lombok.Data;
import ru.mephi.tasks.dao.entity.Task;
import ru.mephi.tasks.dto.project.ProjectDto;
import ru.mephi.tasks.dto.user.UserDto;

import java.time.Instant;
import java.util.List;

@Data
public class ReleaseDto {
    private Long id;
    private UserDto reporter;
    private ProjectDto project;
    private String description;
    private String name;
    private Instant created;
    private Instant finished;
    private List<Task> tasks;
}
