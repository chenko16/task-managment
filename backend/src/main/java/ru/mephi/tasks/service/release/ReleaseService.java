package ru.mephi.tasks.service.release;
import ru.mephi.tasks.dto.release.ReleaseDto;
import ru.mephi.tasks.dto.release.ReleaseRequest;

import java.util.List;
import java.util.Optional;

public interface ReleaseService {
    ReleaseDto createRelease(ReleaseRequest releaseRequest);
    Optional<ReleaseDto> getRelease(Long id);
    List<ReleaseDto> getReleaseList();
    void deleteRelease(Long id);
    void updateReleaseDescription(Long id, String description);
    void finishRelease(Long id);
}
