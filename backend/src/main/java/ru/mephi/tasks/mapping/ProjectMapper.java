package ru.mephi.tasks.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.mephi.tasks.dao.entity.Project;
import ru.mephi.tasks.dto.project.ProjectDto;
import ru.mephi.tasks.dto.project.ProjectRequest;

@Mapper
public interface ProjectMapper {

    @Mapping(source = "id", target = "projectId")
    Project toEntity(ProjectRequest project);

    @Mapping(source = "projectId", target = "id")
    @Mapping(source = "assignee.userId", target = "assignee.id")
    @Mapping(source = "reporter.userId", target = "reporter.id")
    ProjectDto toDto(Project project);
}
