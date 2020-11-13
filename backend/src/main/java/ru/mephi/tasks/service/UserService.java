package ru.mephi.tasks.service;

import ru.mephi.tasks.dto.user.SystemRole;
import ru.mephi.tasks.dto.user.UserDto;
import ru.mephi.tasks.dto.user.UserRequest;

import java.util.List;

public interface UserService {

    void createUser(UserRequest id);
    UserDto getUser(Long id);
    List<UserDto> getUserList();
    void deleteUser(Long id);
    void updateUserStatus(Long id, Boolean status);
    void updateUserRole(Long id, SystemRole role);
}
