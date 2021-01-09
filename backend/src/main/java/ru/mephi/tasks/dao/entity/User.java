package ru.mephi.tasks.dao.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "security_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(unique = true)
    private String login;

    private String password;

    private Boolean active;

    private String systemRole;

    @OneToMany(mappedBy = "user")
    List<ProjectUser> roles = new ArrayList<>();
}
