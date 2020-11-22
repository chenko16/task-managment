package ru.mephi.tasks.dao.repository;

import org.springframework.data.repository.CrudRepository;
import ru.mephi.tasks.dao.entity.ProjectUser;
import ru.mephi.tasks.dao.entity.User;

import java.util.List;

public interface ProjectUserRepository extends CrudRepository<ProjectUser, Long> {
    List<ProjectUser> getProjectUsersByUser(User user);
}
