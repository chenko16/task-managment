package ru.mephi.tasks.mapping;

import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.security.crypto.password.PasswordEncoder;
import ru.mephi.tasks.dao.entity.User;
import ru.mephi.tasks.dto.user.UserDto;
import ru.mephi.tasks.dto.user.UserRequest;

@Mapper
public interface UserMapper {

    @Mapping(source = "id", target = "userId")
    @Mapping(target = "active", constant = "true")
    @Mapping(source = "password", target = "password", qualifiedByName = "encodePassword")
    User toEntity(UserRequest user, @Context PasswordEncoder passwordEncoder);

    @Mapping(source = "userId", target = "id")
    UserDto toDto(User user);

    @Named("encodePassword")
    default String encodePassword(String password, @Context PasswordEncoder passwordEncoder) {
        return passwordEncoder.encode(password);
    }
}
