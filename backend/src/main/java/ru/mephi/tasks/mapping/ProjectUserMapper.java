package ru.mephi.tasks.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.mephi.tasks.dao.entity.ProjectUser;
import ru.mephi.tasks.dto.projectUser.ProjectUserDto;

@Mapper
public interface ProjectUserMapper {
    @Mapping(source = "user.userId", target = "user.id")
    ProjectUserDto toDto(ProjectUser projectUser);
}
