package ru.mephi.tasks.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.persistence.NoResultException;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EntryNotFoundException extends NoResultException {
    public EntryNotFoundException(String entityName, String paramName, Object value) {
        super(entityName + "not found by " + paramName + " = " + value);
    }
}
