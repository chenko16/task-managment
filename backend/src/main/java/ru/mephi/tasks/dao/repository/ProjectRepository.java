package ru.mephi.tasks.dao.repository;

import org.springframework.data.repository.CrudRepository;
import ru.mephi.tasks.dao.entity.Project;
import ru.mephi.tasks.dao.entity.User;

import java.util.List;

public interface ProjectRepository extends CrudRepository<Project, Long> {
    List<Project> getProjectByAssignee(User assignee);

    List<Project> getProjectByReporter(User reporter);
}
