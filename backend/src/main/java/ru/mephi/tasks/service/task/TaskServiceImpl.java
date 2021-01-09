package ru.mephi.tasks.service.task;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.mephi.tasks.config.enums.TaskStatus;
import ru.mephi.tasks.config.enums.TaskType;
import ru.mephi.tasks.dao.entity.Task;
import ru.mephi.tasks.dao.entity.User;
import ru.mephi.tasks.dao.repository.TaskRepository;
import ru.mephi.tasks.dao.repository.UserRepository;
import ru.mephi.tasks.dto.task.TaskDto;
import ru.mephi.tasks.dto.task.TaskRequest;
import ru.mephi.tasks.exceptions.EntryNotFoundException;
import ru.mephi.tasks.mapping.TaskMapper;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final UserRepository userRepository;

    @Override
    public TaskDto createTask(TaskRequest taskRequest) {
        Task task = new Task();
        User reporter = userRepository.findById(taskRequest.getReporterId()).orElseThrow(() -> new EntryNotFoundException("security_user", "user_id", taskRequest.getReporterId()));
        task.setReporter(reporter);
        if (taskRequest.getAssigneeId() != null) {
            User assignee = userRepository.findById(taskRequest.getReporterId()).orElseThrow(() -> new EntryNotFoundException("security_user", "user_id", taskRequest.getReporterId()));
            task.setAssignee(assignee);
        }
        if (taskRequest.getDescription() != null)
            task.setDescription(taskRequest.getDescription());
        if (taskRequest.getStatus() != null)
            task.setStatus(taskRequest.getStatus().name());
        if (taskRequest.getTitle() != null)
            task.setTitle(taskRequest.getTitle());
        if (taskRequest.getType() != null)
            task.setType(taskRequest.getType().name());
        task.setCreated(new Timestamp(new Date().getTime()));
        return taskMapper.toDto(taskRepository.save(task));
    }

    @Override
    public Optional<TaskDto> getTask(Long id) {
        return taskRepository.findById(id)
                .map(taskMapper::toDto);
    }

    @Override
    public List<TaskDto> getTaskList() {
        return taskRepository.findAll()
                .stream()
                .map(taskMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public void updateTaskDescription(Long id, String description) {
        taskRepository.findById(id)
                .ifPresent(project -> {
                    project.setDescription(description);
                    taskRepository.save(project);
                });
    }

    @Override
    public void updateTaskStatus(Long id, TaskStatus taskStatus) {
        taskRepository.findById(id)
                .ifPresent(task -> {
                    task.setStatus(taskStatus.name());
                    taskRepository.save(task);
                });
    }

    @Override
    public void updateTaskType(Long id, TaskType taskType) {
        taskRepository.findById(id)
                .ifPresent(task -> {
                    task.setStatus(taskType.name());
                    taskRepository.save(task);
                });
    }

    @Override
    public void updateTaskTitle(Long id, String title) {
        taskRepository.findById(id)
                .ifPresent(task -> {
                    task.setStatus(title);
                    taskRepository.save(task);
                });
    }

    @Override
    public void setAssignee(Long id, Long userId) {
        taskRepository.findById(id)
                .ifPresent(task -> {
                    User user = userRepository.findById(userId).orElseThrow(() -> new EntryNotFoundException("security_user", "user_id", userId));
                    task.setAssignee(user);
                    taskRepository.save(task);
                });

    }
}
