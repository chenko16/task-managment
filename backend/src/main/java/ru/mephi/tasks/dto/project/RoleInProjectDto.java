package ru.mephi.tasks.dto.project;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RoleInProjectDto {
    Long projectId;
    String role;
}
