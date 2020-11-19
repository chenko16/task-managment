package ru.mephi.tasks.dto.projectUser;

import lombok.Data;
import ru.mephi.tasks.dao.entity.BusinessRole;
import ru.mephi.tasks.dto.user.UserDto;

@Data
public class ProjectUserDto {
    UserDto user;
    BusinessRole businessRole;
}
