package ru.mephi.tasks.dao.repository;

import org.springframework.data.repository.CrudRepository;
import ru.mephi.tasks.dao.entity.Release;

public interface ReleaseRepository extends CrudRepository<Release, Long> {
}
