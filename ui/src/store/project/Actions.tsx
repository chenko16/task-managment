import {createAsyncAction, createStandardAction} from 'typesafe-actions';
import {BusinessRole, Project, ProjectRequest, ProjectsByUsers, UserProject} from './Types';
import * as notificationActions from '../../store/notification/Actions';
import {ProjectService} from '../../services/ProjectService';

export const reqFinished = createStandardAction('@project/REQ_FINISH')<void>();

export const createProjectAction = createAsyncAction(
    '@project/CREATE_REQ',
    '@project/CREATE_SUCC',
    '@project/CREATE_FAIL'
)<void, void, void>();

export const updateProjectAction = createAsyncAction(
    '@project/UPDATE_REQ',
    '@project/UPDATE_SUCC',
    '@project/UPDATE_FAIL'
)<void, void, void>();

export const fetchProjectsAction = createAsyncAction(
    '@project/FETCH_PROJECTS_REQ',
    '@project/FETCH_PROJECTS_SUCC',
    '@project/FETCH_PROJECTS_FAIL'
)<void, Project[], void>();

export const fetchProjectAction = createAsyncAction(
    '@project/FETCH_PROJECT_REQ',
    '@project/FETCH_PROJECT_SUCC',
    '@project/FETCH_PROJECT_FAIL'
)<void, Project, void>();


export const deleteProjectAction = createAsyncAction(
    '@project/DELETE_REQ',
    '@project/DELETE_SUCC',
    '@project/DELETE_FAIL'
)<void, void, void>();

export const updateDescriptionAction = createAsyncAction(
    '@project/UPDATE_DESC_REQ',
    '@project/UPDATE_DESC_SUCC',
    '@project/UPDATE_DESC_FAIL'
)<void, void, void>();

export const updateStatusAction = createAsyncAction(
    '@project/UPDATE_STATUS_REQ',
    '@project/UPDATE_STATUS_SUCC',
    '@project/UPDATE_STATUS_FAIL'
)<void, void, void>();

export const updateAssigneeAction = createAsyncAction(
    '@project/UPDATE_ASSIGNEE_REQ',
    '@project/UPDATE_ASSIGNEE_SUCC',
    '@project/UPDATE_ASSIGNEE_FAIL'
)<void, void, void>();

export const updateReporterAction = createAsyncAction(
    '@project/UPDATE_REPORTER_REQ',
    '@project/UPDATE_REPORTER_SUCC',
    '@project/UPDATE_REPORTER_FAIL'
)<void, void, void>();

export const addParticipantAction = createAsyncAction(
    '@project/ADD_PARTICIPANT_REQ',
    '@project/ADD_PARTICIPANT_SUCC',
    '@project/ADD_PARTICIPANT_FAIL'
)<void, void, void>();

export const deleteParticipantAction = createAsyncAction(
    '@project/DELETE_PARTICIPANT_REQ',
    '@project/DELETE_PARTICIPANT_SUCC',
    '@project/DELETE_PARTICIPANT_FAIL'
)<void, void, void>();

export const setParticipantRoleAction = createAsyncAction(
    '@project/SET_ROLE_PARTICIPANT_REQ',
    '@project/SET_ROLE_PARTICIPANT_SUCC',
    '@project/SET_ROLE_PARTICIPANT_FAIL'
)<void, void, void>();

export const getParticipantsAction = createAsyncAction(
    '@project/GET_PARTICIPANTS_REQ',
    '@project/GET_PARTICIPANTS_SUCC',
    '@project/GET_PARTICIPANTS_FAIL'
)<void, UserProject[], void>();

export const fetchProjectsByUserAction = createAsyncAction(
    '@project/FETCH_PROJECTS_BY_USER_REQ',
    '@project/FETCH_PROJECTS_BY_USER_SUCC',
    '@project/FETCH_PROJECTS_BY_USER_FAIL'
)<void, ProjectsByUsers, void>();

export function createProject(project: ProjectRequest, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(createProjectAction.request());
        ProjectService.createProject(project, (project) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(project);
            dispatch(createProjectAction.success());
        }, (errorMessage) => {
            dispatch(createProjectAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при создании проекта.'));
        })
    }
}

export function updateProject(project: ProjectRequest) {
    return (dispatch, getState) => {
        dispatch(updateProjectAction.request());
        ProjectService.createProject(project, () => {
            dispatch(reqFinished());
            dispatch(updateProjectAction.success());
        }, (errorMessage) => {
            dispatch(updateProjectAction.failure());
            dispatch(notificationActions.error('Ошибка при обновлении проекта.'));
        })
    }
}

export function deleteProject (id: number, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(deleteProjectAction.request());
        ProjectService.deleteProject(id, (id) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(id);
            dispatch(deleteProjectAction.success());
        }, (errorMessage) => {
            dispatch(deleteProjectAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при удалении проекта.'));
        })
    }
}

export function fetchProject(id: number, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(fetchProjectAction.request());
        ProjectService.getProjectInfo(id, (project) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(project);
            dispatch(fetchProjectAction.success(project));
        }, (errorMessage) => {
            dispatch(fetchProjectAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при получении проекта.'));
        })
    }
}

export function fetchProjects(okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(fetchProjectsAction.request());
        ProjectService.getProjects( (projects) => {
            dispatch(reqFinished());
            dispatch(fetchProjectsAction.success(projects));
        }, (errorMessage) => {
            dispatch(fetchProjectsAction.failure());
            dispatch(notificationActions.error('Ошибка при получении всех проектов.'));
        })
    }
}

export function fetchProjectsByUser (userId: number, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(fetchProjectsByUserAction.request());
        ProjectService.getProjectsByUsers(userId, (projects) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(projects);
            dispatch(fetchProjectsByUserAction.success(projects));
        }, (errorMessage) => {
            dispatch(fetchProjectsByUserAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при получении проектов пользователя.'));
        })
    }
}

export function updateDescription (id: number, description: string, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(updateDescriptionAction.request());
        ProjectService.updateDescription(id,description, (id) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(id);
            dispatch(updateDescriptionAction.success());
        }, (errorMessage) => {
            dispatch(updateDescriptionAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при обновлении описания проекта.'));
        })
    }
}

export function updateProjectStatus (id: number, status: boolean, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(updateStatusAction.request());
        ProjectService.updateStatus(id,status, (id) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(id);
            dispatch(updateStatusAction.success());
        }, (errorMessage) => {
            dispatch(updateStatusAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при обновлении статуса проекта.'));
        })
    }
}

export function updateAssignee (id: number, userId: number, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(updateAssigneeAction.request());
        ProjectService.updateAssignee(id, userId, (id) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(id);
            dispatch(updateAssigneeAction.success());
        }, (errorMessage) => {
            dispatch(updateAssigneeAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при обновлении управляющего проекта.'));
        })
    }
}

export function updateReporter (id: number, userId: number, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(updateReporterAction.request());
        ProjectService.updateReporter(id, userId, (id) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(id);
            dispatch(updateReporterAction.success());
        }, (errorMessage) => {
            dispatch(updateReporterAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при обновлении руководителя проекта.'));
        })
    }
}

export function addParticipant (id: number, userId: number, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(addParticipantAction.request());
        ProjectService.addParticipant(id, userId, (id) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(id);
            dispatch(addParticipantAction.success());
        }, (errorMessage) => {
            dispatch(addParticipantAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при добавлении участника проекта.'));
        })
    }
}

export function deleteParticipant (id: number, userId: number, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(deleteParticipantAction.request());
        ProjectService.deleteParticipant(id, userId, (id) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(id);
            dispatch(deleteParticipantAction.success());
        }, (errorMessage) => {
            dispatch(deleteParticipantAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при удалении участника проекта.'));
        })
    }
}

export function setParticipantRole (id: number, userId: number, role: BusinessRole, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(setParticipantRoleAction.request());
        ProjectService.setParticipantRole(id, userId, role, (id) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(id);
            dispatch(setParticipantRoleAction.success());
        }, (errorMessage) => {
            dispatch(setParticipantRoleAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при установлении роли участнику проекта.'));
        })
    }
}

export function getParticipants (id: number, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(getParticipantsAction.request());
        ProjectService.getParticipants(id,(users) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(users);
            dispatch(getParticipantsAction.success(users));
        }, (errorMessage) => {
            dispatch(getParticipantsAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при получении участников проекта.'));
        })
    }
}

