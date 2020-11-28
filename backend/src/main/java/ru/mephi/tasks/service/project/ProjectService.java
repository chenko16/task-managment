package ru.mephi.tasks.service.project;

import ru.mephi.tasks.dao.entity.BusinessRole;
import ru.mephi.tasks.dto.project.ProjectsByUserDto;
import ru.mephi.tasks.dto.project.ProjectDto;
import ru.mephi.tasks.dto.project.ProjectRequest;
import ru.mephi.tasks.dto.projectUser.ProjectUserDto;

import java.util.List;
import java.util.Optional;

public interface ProjectService {

    void createProject(ProjectRequest id);
    Optional<ProjectDto> getProject(Long id);
    List<ProjectDto> getProjectList();
    void deleteProject(Long id);
    void updateProjectName(Long id, String name);
    void updateProjectDescription(Long id, String description);
    void updateProjectActive(Long id, Boolean active);
    void updateProjectAssignee(Long id, Long userId);
    void updateProjectReporter(Long id, Long userId);
    void addParticipant(Long id, Long userId);
    void deleteParticipant(Long id, Long userId);
    void setParticipantRole(Long id, Long userId, BusinessRole role);
    List<ProjectUserDto> getParticipants(Long id);
    ProjectsByUserDto getProjectsByUsers(Long id);
}
