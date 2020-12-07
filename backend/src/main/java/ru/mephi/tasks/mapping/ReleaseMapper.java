package ru.mephi.tasks.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.mephi.tasks.dao.entity.Release;
import ru.mephi.tasks.dto.release.ReleaseDto;

@Mapper
public interface ReleaseMapper {
    @Mapping(source = "releaseId", target = "id")
    @Mapping(source = "reporter.userId", target = "reporter.id")
    @Mapping(source = "project.projectId", target = "project.id")
    ReleaseDto toDto(Release release);
}
