package ru.mephi.tasks.service.user;

import ru.mephi.tasks.config.enums.SystemRole;
import ru.mephi.tasks.dto.user.UserDto;
import ru.mephi.tasks.dto.user.UserRequest;

import java.util.List;
import java.util.Optional;

public interface UserService {

    UserDto createUser(UserRequest id);
    Optional<UserDto> getUser(Long id);
    List<UserDto> getUserList();
    void deleteUser(Long id);
    void updateUserStatus(Long id, Boolean status);
    void updateUserRole(Long id, SystemRole role);
}
