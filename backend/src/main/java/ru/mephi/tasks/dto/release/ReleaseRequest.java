package ru.mephi.tasks.dto.release;

import lombok.Data;

@Data
public class ReleaseRequest {
    private Long id;
    private Long projectId;
    private String name;
    private String description;
    private Long reporterId;
}
