package ru.mephi.tasks.dao.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "reporter_id", referencedColumnName = "user_id")
    private User reporter;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "assignee_id", referencedColumnName = "user_id")
    private User assignee;

    private String name;
}
