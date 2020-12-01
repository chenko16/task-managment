import {createAsyncAction, createStandardAction} from "typesafe-actions";
import {Project, ProjectRequest, ProjectsByUsers} from "./Types";
import * as notificationActions from "../../store/notification/Actions";
import {ProjectService} from "../../services/ProjectService";

export const reqFinished = createStandardAction("@project/REQ_FINISH")<void>();

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

export const fetchProjectsByUserAction = createAsyncAction(
    '@project/FETCH_PROJECTS_BY_USER_REQ',
    '@project/FETCH_PROJECTS_BY_USER_SUCC',
    '@project/FETCH_PROJECTS_BY_USER_FAIL'
)<void, ProjectsByUsers, void>();

export function createProject(project: ProjectRequest, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(createProjectAction.request());
        ProjectService.createProject(project, () => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback();
            dispatch(createProjectAction.success());
        }, (errorMessage) => {
            dispatch(createProjectAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error("Ошибка при создании проекта."));
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
            dispatch(notificationActions.error("Ошибка при обновлении проекта."));
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
            dispatch(notificationActions.error("Ошибка при получении проекта."));
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
            dispatch(notificationActions.error("Ошибка при получении всех проектов."));
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
            dispatch(notificationActions.error("Ошибка при получении проектов пользователя."));
        })
    }
}
