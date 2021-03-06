package ru.mephi.tasks.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mephi.tasks.dto.release.ReleaseDto;
import ru.mephi.tasks.dto.release.ReleaseRequest;
import ru.mephi.tasks.service.release.ReleaseService;

import java.util.List;

@RestController
@RequestMapping("/release")
@RequiredArgsConstructor
public class ReleaseController {

    private final ReleaseService releaseService;

    @PostMapping
    @Operation(description = "Create/edit release")
   public ResponseEntity<ReleaseDto> createRelease(@RequestBody ReleaseRequest releaseRequest) {
        return ResponseEntity.ok().body(releaseService.createRelease(releaseRequest));
    }

    @GetMapping(value = "/{id}")
    @Operation(description = "Get release info")
    public ResponseEntity<ReleaseDto> getRelease(@PathVariable Long id) {
        return ResponseEntity.of(releaseService.getRelease(id));
    }

    @GetMapping("/list")
    @Operation(description = "Get release list")
    public ResponseEntity<List<ReleaseDto>> getReleaseList() {
        return ResponseEntity.ok().body(releaseService.getReleaseList());
    }

    @DeleteMapping(value = "/{id}")
    @Operation(description = "Delete release")
    public ResponseEntity<Void> deleteRelease(@PathVariable Long id) {
        releaseService.deleteRelease(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/{id}/description/")
    @Operation(description = "Update release name")
    public ResponseEntity<Void> updateReleaseDescription(@PathVariable Long id, @RequestParam String description) {
        releaseService.updateReleaseDescription(id, description);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/{id}/finish/")
    @Operation(description = "Finish release")
    public ResponseEntity<Void> finishRelease(@PathVariable Long id) {
        releaseService.finishRelease(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/{id}/task/{taskId}")
    @Operation(description = "Add task to release")
    public ResponseEntity<Void> addTaskToRelease(@PathVariable Long id, @PathVariable Long taskId) {
        releaseService.addTask(id, taskId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/{id}/task/{taskId}")
    @Operation(description = "Remove task from release")
    public ResponseEntity<Void> removeTaskToRelease(@PathVariable Long id, @PathVariable Long taskId) {
        releaseService.removeTask(id, taskId);
        return ResponseEntity.ok().build();
    }
}
