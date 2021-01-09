package ru.mephi.tasks.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import ru.mephi.tasks.dao.entity.Release;
import ru.mephi.tasks.dao.entity.Task;
import ru.mephi.tasks.dto.release.ReleaseDto;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public abstract class ReleaseMapper {
    @Mappings({
            @Mapping(source = "releaseId", target = "id"),
            @Mapping(source = "reporter.userId", target = "reporter.id"),
            @Mapping(source = "project.projectId", target = "project.id"),
            @Mapping(source = "tasks", target = "tasks")
    })
    public abstract ReleaseDto toDto(Release release);

    protected Long taskToLong(Task task) {
        if (task == null) {
            return null;
        } else
            return task.getTaskId();
    }

    protected List<Long> taskListToLongList(List<Task> list) {
        if (list == null) {
            return null;
        }
        List<Long> list1 = new ArrayList<>(list.size());
        for (Task task : list) {
            list1.add(taskToLong(task));
        }
        return list1;
    }
}
