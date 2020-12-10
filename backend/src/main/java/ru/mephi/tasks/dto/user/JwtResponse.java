package ru.mephi.tasks.dto.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;

@RequiredArgsConstructor
@Getter
public class JwtResponse implements Serializable {
    private final String jwtToken;
}
