package ru.mephi.tasks.dto.project;

import lombok.Data;
import ru.mephi.tasks.dto.user.UserDto;

@Data
public class ProjectDto {

    private Long id;
    private UserDto assignee;
    private UserDto reporter;
    private String name;
    private String description;
    private Boolean active;
}

