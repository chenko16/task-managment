package ru.mephi.tasks.dao.repository;

import org.springframework.data.repository.CrudRepository;
import ru.mephi.tasks.dao.entity.Project;

public interface ProjectRepository extends CrudRepository<Project, Long> {
}
