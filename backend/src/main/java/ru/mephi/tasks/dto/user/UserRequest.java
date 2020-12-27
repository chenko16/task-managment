package ru.mephi.tasks.dto.user;

import lombok.Data;
import ru.mephi.tasks.config.enums.SystemRole;

@Data
public class UserRequest {

    private Long id;
    private String login;
    private String password;
    private SystemRole systemRole;

}
