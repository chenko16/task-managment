package ru.mephi.tasks.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mephi.tasks.service.UserService;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<Void> createUser(@RequestBody Long id) {
        userService.createUser(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<String> getUser() {
        return ResponseEntity.ok().body("ololol");
    }


}
