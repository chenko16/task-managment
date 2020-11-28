package ru.mephi.tasks.service.user;

import com.google.common.collect.Streams;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.mephi.tasks.dao.repository.UserRepository;
import ru.mephi.tasks.dto.user.SystemRole;
import ru.mephi.tasks.dto.user.UserDto;
import ru.mephi.tasks.dto.user.UserRequest;
import ru.mephi.tasks.mapping.UserMapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    private final UserMapper mapper;

    private final PasswordEncoder passwordEncoder;


    @Override
    public void createUser(UserRequest user) {
        repository.save(mapper.toEntity(user, passwordEncoder));
    }

    @Override
    public Optional<UserDto> getUser(Long id) {
        return repository.findById(id)
                .map(mapper::toDto);
    }

    @Override
    public List<UserDto> getUserList() {
        return Streams.stream(repository.findAll())
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(Long id) {
        repository.deleteById(id); //TODO когда появится сущность userProjectRole, надо будет удалять и ее
    }

    @Override
    public void updateUserStatus(Long id, Boolean status) {
        repository.findById(id)
                .ifPresent(user -> {
                    user.setActive(status);
                    repository.save(user);
                });
    }

    @Override
    public void updateUserRole(Long id, SystemRole role) {
        repository.findById(id)
                .ifPresent(user -> {
                    user.setSystemRole(role.name());
                    repository.save(user);
                });
    }
}
