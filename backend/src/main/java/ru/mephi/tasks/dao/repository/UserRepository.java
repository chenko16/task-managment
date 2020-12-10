package ru.mephi.tasks.dao.repository;

import org.springframework.data.repository.CrudRepository;
import ru.mephi.tasks.dao.entity.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByLogin(String login);
}
