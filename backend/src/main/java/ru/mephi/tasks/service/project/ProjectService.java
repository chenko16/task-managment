package ru.mephi.tasks.service.project;

import ru.mephi.tasks.dto.project.ProjectDto;
import ru.mephi.tasks.dto.project.ProjectRequest;
import ru.mephi.tasks.dto.user.UserRequest;

import java.util.List;
import java.util.Optional;

public interface ProjectService {

    void createProject(ProjectRequest id);
    Optional<ProjectDto> getProject(Long id);
    List<ProjectDto> getProjectList();
    void deleteProject(Long id);
    void updateProjectName(Long id, String name);
    void updateProjectAssignee(Long id, Long userId);
    void updateProjectReporter(Long id, Long userId);
}
