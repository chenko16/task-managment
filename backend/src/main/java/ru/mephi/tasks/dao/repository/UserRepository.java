package ru.mephi.tasks.dao.repository;

import org.springframework.data.repository.CrudRepository;
import ru.mephi.tasks.dao.entity.User;

public interface UserRepository extends CrudRepository<User, Long> {
}
