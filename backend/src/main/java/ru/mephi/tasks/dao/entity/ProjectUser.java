package ru.mephi.tasks.dao.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@Table(name = "project_user")
public class ProjectUser {
    @EmbeddedId
    ProjectUserKey projectUserKey;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("projectId")
    @JoinColumn(name = "project_id")
    Project project;

    @Enumerated(value = EnumType.STRING)
    BusinessRole businessRole;

    ProjectUser(User user, Project project, BusinessRole role) {
        this.user = user;
        this.project = project;
        this.businessRole = role;
        this.projectUserKey = new ProjectUserKey(user.getUserId(), project.getProjectId());
    }

    public ProjectUser(User user, Project project) {
        this.user = user;
        this.project = project;
        this.projectUserKey = new ProjectUserKey(user.getUserId(), project.getProjectId());
    }
}
