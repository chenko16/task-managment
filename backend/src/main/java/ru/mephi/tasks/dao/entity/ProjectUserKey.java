package ru.mephi.tasks.dao.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class ProjectUserKey implements Serializable {

    @Column(name = "user_id")
    Long userId;

    @Column(name = "project_id")
    Long projectId;
}
