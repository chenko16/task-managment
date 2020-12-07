package ru.mephi.tasks.controller;

import io.swagger.annotations.ApiOperation;
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
    @ApiOperation("Create/edit release")
    public ResponseEntity<ReleaseDto> createProject(@RequestBody ReleaseRequest releaseRequest) {
        return ResponseEntity.ok().body(releaseService.createRelease(releaseRequest));
    }

    @GetMapping(value = "/{id}")
    @ApiOperation("Get release info")
    public ResponseEntity<ReleaseDto> getProject(@PathVariable Long id) {
        return ResponseEntity.of(releaseService.getRelease(id));
    }

    @PostMapping("/list")
    @ApiOperation("Get release list")
    public ResponseEntity<List<ReleaseDto>> getProjectList() {
        return ResponseEntity.ok().body(releaseService.getReleaseList());
    }

    @DeleteMapping(value = "/{id}")
    @ApiOperation("Delete release")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        releaseService.deleteRelease(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/{id}/description/")
    @ApiOperation("Update release name")
    public ResponseEntity<Void> updateReleaseDescription(@PathVariable Long id, @RequestParam String description) {
        releaseService.updateReleaseDescription(id, description);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/{id}/finish/")
    @ApiOperation("Finish release")
    public ResponseEntity<Void> finishRelease(@PathVariable Long id) {
        releaseService.finishRelease(id);
        return ResponseEntity.ok().build();
    }
}
