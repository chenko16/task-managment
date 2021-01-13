package ru.mephi.tasks.dao.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;
    private String title;
    private String status;
    private String type;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reporter_id", referencedColumnName = "user_id")
    @NotNull
    private User reporter;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignee_id", referencedColumnName = "user_id")
    private User assignee;
    private String description;
    private Timestamp created;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "release_id")
    @JsonIgnore
    @EqualsAndHashCode.Exclude
    private Release release;
}
