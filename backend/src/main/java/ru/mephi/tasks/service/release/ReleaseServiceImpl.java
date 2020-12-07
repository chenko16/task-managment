package ru.mephi.tasks.service.release;

import com.google.common.collect.Streams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.mephi.tasks.dao.entity.Project;
import ru.mephi.tasks.dao.entity.Release;
import ru.mephi.tasks.dao.entity.User;
import ru.mephi.tasks.dao.repository.ProjectRepository;
import ru.mephi.tasks.dao.repository.ReleaseRepository;
import ru.mephi.tasks.dao.repository.UserRepository;
import ru.mephi.tasks.dto.release.ReleaseDto;
import ru.mephi.tasks.dto.release.ReleaseRequest;
import ru.mephi.tasks.exceptions.EntryNotFoundException;
import ru.mephi.tasks.mapping.ReleaseMapper;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReleaseServiceImpl implements ReleaseService {

    private final ProjectRepository projectRepository;

    private final UserRepository userRepository;

    private final ReleaseRepository releaseRepository;

    private final ReleaseMapper releaseMapper;

    @Override
    public ReleaseDto createRelease(ReleaseRequest releaseRequest) {
        User reporter = userRepository.findById(releaseRequest.getReporterId()).orElseThrow(() -> new EntryNotFoundException("security_user", "user_id", releaseRequest.getReporterId()));
        Project project = projectRepository.findById(releaseRequest.getProjectId()).orElseThrow(() -> new EntryNotFoundException("project", "project_id", releaseRequest.getProjectId()));
        Release release = new Release();
        release.setReleaseId(releaseRequest.getId());
        release.setProject(project);
        release.setReporter(reporter);
        release.setDescription(releaseRequest.getDescription());
        return releaseMapper.toDto(releaseRepository.save(release));
    }

    @Override
    public Optional<ReleaseDto> getRelease(Long id) {
        return releaseRepository.findById(id)
                .map(releaseMapper::toDto);
    }

    @Override
    public List<ReleaseDto> getReleaseList() {
        return Streams.stream(releaseRepository.findAll())
                .map(releaseMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteRelease(Long id) {
        releaseRepository.deleteById(id);
    }

    @Override
    public void updateReleaseDescription(Long id, String description) {
        releaseRepository.findById(id)
                .ifPresent(release -> {
                    release.setDescription(description);
                    releaseRepository.save(release);
                });
    }

    @Override
    public void finishRelease(Long id) {
        releaseRepository.findById(id)
                .ifPresent(release -> {
                    release.setFinished(Instant.now());
                    releaseRepository.save(release);
                });
    }

}
