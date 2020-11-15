package ru.mephi.tasks.service.project;

import com.google.common.collect.Streams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.mephi.tasks.dao.entity.User;
import ru.mephi.tasks.dao.repository.ProjectRepository;
import ru.mephi.tasks.dao.repository.UserRepository;
import ru.mephi.tasks.dto.project.ProjectDto;
import ru.mephi.tasks.dto.project.ProjectRequest;
import ru.mephi.tasks.exceptions.EntryNotFoundException;
import ru.mephi.tasks.mapping.ProjectMapper;
import ru.mephi.tasks.service.user.UserService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService{

    private final ProjectRepository projectRepository;

    private final UserRepository userRepository;

    private final ProjectMapper mapper;

    private final UserService userService;

    @Override
    public void createProject(ProjectRequest project) {
        projectRepository.save(mapper.toEntity(project));
    }

    @Override
    public Optional<ProjectDto> getProject(Long id) {
        return projectRepository.findById(id)
                .map(mapper::toDto);
    }

    @Override
    public List<ProjectDto> getProjectList() {
        return Streams.stream(projectRepository.findAll())
                .map(mapper::toDto)
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
                    project.setAssignee(reporter);
                    projectRepository.save(project);
                });
    }
}
