package ru.mephi.tasks.dto.user;

import lombok.Data;

@Data
public class UserDto {

    private Long id;
    private String login;
    private Boolean active;
    private SystemRole systemRole;

}
