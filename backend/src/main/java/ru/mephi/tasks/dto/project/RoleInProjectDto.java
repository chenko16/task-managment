package ru.mephi.tasks.dto.project;

import lombok.AllArgsConstructor;
import lombok.Data;
import ru.mephi.tasks.dao.entity.BusinessRole;

@Data
@AllArgsConstructor
public class RoleInProjectDto {
    Long projectId;
    BusinessRole role;
}
