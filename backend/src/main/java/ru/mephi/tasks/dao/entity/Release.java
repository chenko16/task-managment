package ru.mephi.tasks.dao.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity(name = "release")
@Table(name = "release")
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

    @OneToMany(mappedBy = "release", cascade = CascadeType.ALL)
    List<Task> tasks = new ArrayList<>();
}
