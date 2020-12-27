package ru.mephi.tasks.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mephi.tasks.config.enums.SystemRole;
import ru.mephi.tasks.dto.user.UserDto;
import ru.mephi.tasks.dto.user.UserRequest;
import ru.mephi.tasks.service.user.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    @Operation(description = "Create/edit user")
    public ResponseEntity<UserDto> createUser(@RequestBody UserRequest user) {
        return ResponseEntity.ok().body(userService.createUser(user));
    }

    @GetMapping(value = "/{id}")
    @Operation(description = "Get user info")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        return ResponseEntity.of(userService.getUser(id));
    }

    @GetMapping(value = "/list")
    @Operation(description = "Get user list")
    public ResponseEntity<List<UserDto>> getUserList() {
        return ResponseEntity.ok()
                .body(userService.getUserList());
    }

    @DeleteMapping(value = "/{id}")
    @Operation(description = "Delete user")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/status/{id}")
    @Operation(description = "Update user status")
    public ResponseEntity<Void> updateUserStatus(@PathVariable Long id, @RequestParam Boolean status) {
        userService.updateUserStatus(id, status);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/role/{id}")
    @Operation(description = "Update user role")
    public ResponseEntity<Void> updateUserStatus(@PathVariable Long id, @RequestParam SystemRole role) {
        userService.updateUserRole(id, role);
        return ResponseEntity.ok().build();
    }

}
