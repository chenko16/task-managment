package ru.mephi.tasks.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mephi.tasks.dao.entity.BusinessRole;
import ru.mephi.tasks.dto.project.ProjectDto;
import ru.mephi.tasks.dto.project.ProjectRequest;
import ru.mephi.tasks.dto.project.ProjectsByUserDto;
import ru.mephi.tasks.dto.projectUser.ProjectUserDto;
import ru.mephi.tasks.service.project.ProjectService;

import java.util.List;

@RestController
@RequestMapping("/project")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @PostMapping
    @Operation(description = "Create/edit project")
    public ResponseEntity<ProjectDto> createProject(@RequestBody ProjectRequest projectRequest) {
        return ResponseEntity.ok().body(projectService.createProject(projectRequest));
    }

    @GetMapping(value = "/{id}")
    @Operation(description = "Get project info")
    public ResponseEntity<ProjectDto> getProject(@PathVariable Long id) {
        return ResponseEntity.of(projectService.getProject(id));
    }

    @GetMapping(value = "/list")
    @Operation(description = "Get project list")
    public ResponseEntity<List<ProjectDto>> getUProjectList() {
        return ResponseEntity.ok()
                .body(projectService.getProjectList());
    }

    @DeleteMapping(value = "/{id}")
    @Operation(description = "Delete project")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/{id}/name/")
    @Operation(description = "Update project name")
    public ResponseEntity<Void> updateProjectName(@PathVariable Long id, @RequestParam String name) {
        projectService.updateProjectName(id, name);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/{id}/description/")
    @Operation(description = "Update project description")
    public ResponseEntity<Void> updateProjectDescription(@PathVariable Long id, @RequestParam String description) {
        projectService.updateProjectDescription(id, description);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/{id}/active/")
    @Operation(description = "Update project active status")
    public ResponseEntity<Void> updateProjectActiveStatus(@PathVariable Long id, @RequestParam Boolean active) {
        projectService.updateProjectActive(id, active);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/{id}/assignee/")
    @Operation(description = "Update project assignee")
    public ResponseEntity<Void> updateProjectAssignee(@PathVariable Long id, @RequestParam Long userId) {
        projectService.updateProjectAssignee(id, userId);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/{id}/reporter/")
    @Operation(description = "Update project reporter")
    public ResponseEntity<Void> updateProjectReporter(@PathVariable Long id, @RequestParam Long userId) {
        projectService.updateProjectReporter(id, userId);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/{id}/participant/{userId}")
    @Operation(description = "Add project participant")
    public ResponseEntity<Void> addParticipant(@PathVariable Long id, @PathVariable Long userId) {
        projectService.addParticipant(id, userId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/{id}/participant/{userId}")
    @Operation(description = "Delete participant")
    public ResponseEntity<Void> deleteParticipant(@PathVariable Long id, @PathVariable Long userId) {
        projectService.deleteParticipant(id, userId);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/{id}/participant/{userId}/role")
    @Operation(description = "Set project participant role")
    public ResponseEntity<Void> setParticipantRole(@PathVariable Long id,  @PathVariable Long userId, @RequestParam BusinessRole role) {
        projectService.setParticipantRole(id, userId, role);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/{id}/participants")
    @Operation(description = "Get participants")
    public ResponseEntity<List<ProjectUserDto>> getParticipants(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getParticipants(id));
    }

    @GetMapping(value = "/list/user/{id}")
    @Operation(description = "Get projects ids by user (assignee, reporter or participant)")
    public ResponseEntity<ProjectsByUserDto> getProjectsByUsers(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectsByUsers(id));
    }
}
