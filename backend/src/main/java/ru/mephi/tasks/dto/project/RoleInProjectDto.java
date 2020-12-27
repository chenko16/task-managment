package ru.mephi.tasks.dto.project;

import lombok.AllArgsConstructor;
import lombok.Data;
import ru.mephi.tasks.config.enums.BusinessRole;

@Data
@AllArgsConstructor
public class RoleInProjectDto {
    Long projectId;
    BusinessRole role;
}
