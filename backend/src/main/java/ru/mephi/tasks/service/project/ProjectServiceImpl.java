package ru.mephi.tasks.service.project;

import com.google.common.collect.Streams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.mephi.tasks.dao.entity.*;
import ru.mephi.tasks.dao.repository.ProjectRepository;
import ru.mephi.tasks.dao.repository.ProjectUserRepository;
import ru.mephi.tasks.dao.repository.UserRepository;
import ru.mephi.tasks.dto.project.ProjectsByUserDto;
import ru.mephi.tasks.dto.project.ProjectDto;
import ru.mephi.tasks.dto.project.ProjectRequest;
import ru.mephi.tasks.dto.project.RoleInProjectDto;
import ru.mephi.tasks.dto.projectUser.ProjectUserDto;
import ru.mephi.tasks.exceptions.EntryNotFoundException;
import ru.mephi.tasks.mapping.ProjectMapper;
import ru.mephi.tasks.mapping.ProjectUserMapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    private final UserRepository userRepository;

    private final ProjectUserRepository projectUserRepository;

    private final ProjectMapper projectMapper;

    private final ProjectUserMapper projectUserMapper;

    @Override
    public ProjectDto createProject(ProjectRequest project) {
        return projectMapper.toDto(projectRepository.save(projectMapper.toEntity(project)));
    }

    @Override
    public Optional<ProjectDto> getProject(Long id) {
        return projectRepository.findById(id)
                .map(projectMapper::toDto);
    }

    @Override
    public List<ProjectDto> getProjectList() {
        return Streams.stream(projectRepository.findAll())
                .map(projectMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    @Override
    public void updateProjectName(Long id, String name) {
        projectRepository.findById(id)
                .ifPresent(project -> {
                    project.setName(name);
                    projectRepository.save(project);
                });
    }

    @Override
    public void updateProjectDescription(Long id, String description) {
        projectRepository.findById(id)
                .ifPresent(project -> {
                    project.setDescription(description);
                    projectRepository.save(project);
                });
    }

    @Override
    public void updateProjectActive(Long id, Boolean active) {
        projectRepository.findById(id)
                .ifPresent(project -> {
                    project.setActive(active);
                    projectRepository.save(project);
                });
    }

    @Override
    public void updateProjectAssignee(Long id, Long userId) {
        User assignee = userRepository.findById(userId).orElseThrow(() -> new EntryNotFoundException("security_user", "user_id", userId));
        projectRepository.findById(id)
                .ifPresent(project -> {
                    project.setAssignee(assignee);
                    projectRepository.save(project);
                });
    }

    @Override
    public void updateProjectReporter(Long id, Long userId) {
        User reporter = userRepository.findById(userId).orElseThrow(() -> new EntryNotFoundException("security_user", "user_id", userId));
        projectRepository.findById(id)
                .ifPresent(project -> {
                    project.setReporter(reporter);
                    projectRepository.save(project);
                });
    }

    @Override
    public void addParticipant(Long id, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntryNotFoundException("security_user", "user_id", userId));
        Project project = projectRepository.findById(id).orElseThrow(() -> new EntryNotFoundException("project", "project_id", id));
        project.addParticipant(user);
        projectRepository.save(project);
    }

    @Override
    public void deleteParticipant(Long id, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntryNotFoundException("security_user", "user_id", userId));
        Project project = projectRepository.findById(id).orElseThrow(() -> new EntryNotFoundException("project", "project_id", id));
        project.deleteParticipant(user);
        projectRepository.save(project);
    }

    @Override
    public void setParticipantRole(Long id, Long userId, BusinessRole role) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntryNotFoundException("security_user", "user_id", userId));
        Project project = projectRepository.findById(id).orElseThrow(() -> new EntryNotFoundException("project", "project_id", id));
        project.setParticipantRole(user, role);
        projectRepository.save(project);
    }

    @Override
    public List<ProjectUserDto> getParticipants(Long id) {
        Project project = projectRepository.findById(id).orElseThrow(() -> new EntryNotFoundException("project", "project_id", id));
        return project.getParticipants().stream().map(projectUserMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public ProjectsByUserDto getProjectsByUsers(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntryNotFoundException("security_user", "user_id", userId));

        List<Project> projectByReporter = projectRepository.getProjectByReporter(user);
        List<Project> projectByAssignee = projectRepository.getProjectByAssignee(user);
        List<ProjectUser> projectByParticipant = projectUserRepository.getProjectUsersByUser(user);

        ProjectsByUserDto projectsUserDto = new ProjectsByUserDto();

        projectsUserDto.setAssignees(projectByAssignee.stream().map(Project::getProjectId).collect(Collectors.toList()));
        projectsUserDto.setReporters(projectByReporter.stream().map(Project::getProjectId).collect(Collectors.toList()));
        projectsUserDto.setParticipants(projectByParticipant.stream().map(projectUser -> new RoleInProjectDto(projectUser.getProject().getProjectId(), projectUser.getBusinessRole())).collect(Collectors.toList()));

        return projectsUserDto;
    }

}
