package ru.mephi.tasks.dao.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.Instant;

@Data
@Entity
public class Release {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long releaseId;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "project_id")
    private Project project;

    private String description;

    private String name;

    @CreationTimestamp
    private Instant created;

    private Instant finished;

    @OneToOne
    @JoinColumn(name = "reporter_id", referencedColumnName = "user_id")
    private User reporter;
}
