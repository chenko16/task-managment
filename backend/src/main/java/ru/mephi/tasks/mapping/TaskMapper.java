package ru.mephi.tasks.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.mephi.tasks.dao.entity.Task;
import ru.mephi.tasks.dto.task.TaskDto;

@Mapper
public interface TaskMapper {
    @Mapping(source = "id", target = "taskId")
    Task toEntity(TaskDto taskDto);

    @Mapping(source = "taskId", target = "id")
    @Mapping(source = "assignee.userId", target = "assignee.id")
    @Mapping(source = "reporter.userId", target = "reporter.id")
    TaskDto toDto(Task task);
}
