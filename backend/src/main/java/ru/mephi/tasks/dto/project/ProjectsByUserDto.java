package ru.mephi.tasks.dto.project;

import lombok.Data;
import java.util.List;

@Data
public class ProjectsByUserDto {
    private List<Long> assignees;
    private List<Long> reporters;
    private List<RoleInProjectDto> participants;
}
