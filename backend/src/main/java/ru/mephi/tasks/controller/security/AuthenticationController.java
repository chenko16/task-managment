package ru.mephi.tasks.controller.security;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.mephi.tasks.config.security.JwtTokenUtil;
import ru.mephi.tasks.dto.user.JwtResponse;
import ru.mephi.tasks.dto.user.UserRequest;
import ru.mephi.tasks.service.security.JwtUserDetailsService;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class AuthenticationController { private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final JwtUserDetailsService userDetailsService;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    @Operation(description = "Получение токена пользователем")
    public ResponseEntity<?> createAuthenticationToken(
            @Parameter(description = "user-body", required = true, name = "user") @RequestBody UserRequest userRequest) throws Exception {
        authenticate(userRequest.getLogin(), userRequest.getPassword());
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(userRequest.getLogin());
        final String token = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

}
