package ru.mephi.tasks.dao.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Data
@Entity
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long projectId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "reporter_id", referencedColumnName = "user_id")
    private User reporter;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "assignee_id", referencedColumnName = "user_id")
    private User assignee;

    private String name;

    String description;

    Boolean active = true;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    List<ProjectUser> participants = new ArrayList<>();

    public void addParticipant(User user) {
        ProjectUser projectUser = new ProjectUser(user, this);
        getParticipants().add(projectUser);
    }

    public void deleteParticipant(User user) {
        Optional<ProjectUser> participant = participants.stream().filter(p -> p.getProject().equals(this) && p.getUser().equals(user)).findAny();
        participant.ifPresent(projectUser -> participants.remove(projectUser));
    }

    public void setParticipantRole(User user,  BusinessRole role) {
        Optional<ProjectUser> participant = participants.stream().filter(p -> p.getProject().equals(this) && p.getUser().equals(user)).findAny();
        participant.ifPresent(projectUser -> projectUser.setBusinessRole(role));
    }
}
