package ru.mephi.tasks.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mephi.tasks.dto.project.ProjectDto;
import ru.mephi.tasks.dto.project.ProjectRequest;
import ru.mephi.tasks.service.project.ProjectService;

import java.util.List;

@RestController
@RequestMapping("/project")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @PostMapping
    @ApiOperation("Create/edit project")
    public ResponseEntity<Void> createProject(@RequestBody ProjectRequest projectRequest) {
        projectService.createProject(projectRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/{id}")
    @ApiOperation("Get project info")
    public ResponseEntity<ProjectDto> getProject(@PathVariable Long id) {
        return ResponseEntity.of(projectService.getProject(id));
    }

    @GetMapping(value = "/list")
    @ApiOperation("Get project list")
    public ResponseEntity<List<ProjectDto>> getUProjectList() {
        return ResponseEntity.ok()
                .body(projectService.getProjectList());
    }

    @DeleteMapping(value = "/{id}")
    @ApiOperation("Delete project")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/name/{id}")
    @ApiOperation("Update project name")
    public ResponseEntity<Void> updateProjectName(@PathVariable Long id, @RequestParam String name) {
        projectService.updateProjectName(id, name);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/assignee/{id}")
    @ApiOperation("Update project assignee")
    public ResponseEntity<Void> updateProjectAssignee(@PathVariable Long id, @RequestParam Long userId) {
        projectService.updateProjectAssignee(id, userId);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/reporter/{id}")
    @ApiOperation("Update project reporter")
    public ResponseEntity<Void> updateProjectReporter(@PathVariable Long id, @RequestParam Long userId) {
        projectService.updateProjectReporter(id, userId);
        return ResponseEntity.ok().build();
    }
}
