package ru.mephi.tasks.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.mephi.tasks.dao.entity.User;
import ru.mephi.tasks.dao.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;


    @Override
    public void createUser(Long id) {
        User user = new User();
        user.setLogin("ololol");
        repository.save(user);
    }
}
