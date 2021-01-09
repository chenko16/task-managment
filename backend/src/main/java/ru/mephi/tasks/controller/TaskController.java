package ru.mephi.tasks.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mephi.tasks.config.enums.TaskStatus;
import ru.mephi.tasks.config.enums.TaskType;
import ru.mephi.tasks.dto.task.TaskDto;
import ru.mephi.tasks.dto.task.TaskRequest;
import ru.mephi.tasks.service.task.TaskService;

import java.util.List;

@RestController
@RequestMapping("/task")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    @Operation(description = "Save task controller")
    public ResponseEntity<TaskDto> createTaskDto(@RequestBody TaskRequest taskRequest) {
        return ResponseEntity.ok(taskService.createTask(taskRequest));
    }

    @GetMapping("/{id}")
    @Operation(description = "Get task by id")
    public ResponseEntity<TaskDto> getTaskDto(@PathVariable Long id) {
        return ResponseEntity.of(taskService.getTask(id));
    }

    @GetMapping
    @Operation(description = "Get list of the tasks")
    public ResponseEntity<List<TaskDto>> listTasks() {
        return ResponseEntity.ok(taskService.getTaskList());
    }

    @DeleteMapping("/{id}")
    @Operation(description = "Delete task by id")
    public ResponseEntity<Void> deleteTaskById(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/description")
    @Operation(description = "Set description of task by path variable id and request param description")
    public ResponseEntity<Void> updateTaskDescription(@PathVariable Long id, @RequestParam String description) {
        taskService.updateTaskDescription(id, description);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/status")
    @Operation(description = "Set status of task by path variable id and request param task status")
    public ResponseEntity<Void> updateTaskStatus(@PathVariable Long id, @RequestParam TaskStatus status) {
        taskService.updateTaskStatus(id, status);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/type")
    @Operation(description = "Set type of task by path variable id and request param task type")
    public ResponseEntity<Void> updateTaskType(@PathVariable Long id, @RequestParam TaskType type) {
        taskService.updateTaskType(id, type);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/title")
    @Operation(description = "Set title of task by path variable id and request param title")
    public ResponseEntity<Void> updateTaskTitle(@PathVariable Long id, @RequestParam String title) {
        taskService.updateTaskTitle(id, title);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/assignee/{userId}")
    @Operation(description = "Set assignee of task")
    public ResponseEntity<Void> setAssignee(@PathVariable Long id, @PathVariable Long userId) {
        taskService.setAssignee(id, userId);
        return ResponseEntity.ok().build();
    }
}
