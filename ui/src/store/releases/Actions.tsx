import {createAsyncAction, createStandardAction} from "typesafe-actions";
import * as notificationActions from "../../store/notification/Actions";
import {Release, ReleaseRequest} from "./Types";
import ReleaseService from "../../services/ReleaseService";

export const reqFinished = createStandardAction("@releases/REQ_FINISH")<void>();

export const createReleaseAction = createAsyncAction(
    '@releases/CREATE_REQ',
    '@releases/CREATE_SUCC',
    '@releases/CREATE_FAIL'
)<void, void, void>();

export const updateReleaseAction = createAsyncAction(
    '@releases/UPDATE_REQ',
    '@releases/UPDATE_SUCC',
    '@releases/UPDATE_FAIL'
)<void, void, void>();

export const fetchReleasesAction = createAsyncAction(
    '@releases/FETCH_RELEASES_REQ',
    '@releases/FETCH_RELEASES_SUCC',
    '@releases/FETCH_RELEASES_FAIL'
)<void, Release[], void>();

export const fetchReleaseAction = createAsyncAction(
    '@releases/FETCH_RELEASE_REQ',
    '@releases/FETCH_RELEASE_SUCC',
    '@releases/FETCH_RELEASE_FAIL'
)<void, Release, void>();


export const deleteReleaseAction = createAsyncAction(
    '@releases/DELETE_REQ',
    '@releases/DELETE_SUCC',
    '@releases/DELETE_FAIL'
)<void, void, void>();

export const updateDescriptionAction = createAsyncAction(
    '@releases/UPDATE_DESC_REQ',
    '@releases/UPDATE_DESC_SUCC',
    '@releases/UPDATE_DESC_FAIL'
)<void, void, void>();

export const finishReleaseAction = createAsyncAction(
    '@releases/FINISH_REQ',
    '@releases/FINISH_SUCC',
    '@releases/FINISH_FAIL'
)<void, void, void>();

export const addTaskToReleaseAction = createAsyncAction(
    '@releases/ADD_TASK_REQ',
    '@releases/ADD_TASK_SUCC',
    '@releases/ADD_TASK_FAIL'
)<void, void, void>();

export const deleteTaskToReleaseAction = createAsyncAction(
    '@releases/DELETE_TASK_REQ',
    '@releases/DELETE_TASK_SUCC',
    '@releases/DELETE_TASK_FAIL'
)<void, void, void>();


export function createRelease(release: ReleaseRequest, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(createReleaseAction.request());
        ReleaseService.createRelease(release, (release) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(release);
            dispatch(createReleaseAction.success());
        }, (errorMessage) => {
            dispatch(createReleaseAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error("Ошибка при создании релиза."));
        })
    }
}

export function updateRelease (release: ReleaseRequest) {
    return (dispatch, getState) => {
        dispatch(updateReleaseAction.request());
        ReleaseService.createRelease(release, () => {
            dispatch(reqFinished());
            dispatch(updateReleaseAction.success());
        }, (errorMessage) => {
            dispatch(updateReleaseAction.failure());
            dispatch(notificationActions.error("Ошибка при обновлении релиза."));
        })
    }
}

export function deleteRelease (id: number, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(deleteReleaseAction.request());
        ReleaseService.deleteRelease(id, (id) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(id);
            dispatch(deleteReleaseAction.success());
        }, (errorMessage) => {
            dispatch(deleteReleaseAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error("Ошибка при удалении релиза."));
        })
    }
}

export function fetchRelease(id: number, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(fetchReleaseAction.request());
        ReleaseService.getRelease(id, (release) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(release);
            dispatch(fetchReleaseAction.success(release));
        }, (errorMessage) => {
            dispatch(fetchReleaseAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error("Ошибка при получении релиза."));
        })
    }
}

export function fetchReleases(okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(fetchReleasesAction.request());
        ReleaseService.getReleases( (releases) => {
            dispatch(reqFinished());
            dispatch(fetchReleasesAction.success(releases));
        }, (errorMessage) => {
            dispatch(fetchReleasesAction.failure());
            dispatch(notificationActions.error("Ошибка при получении всех релизов."));
        })
    }
}

export function updateDescription (id: number, description: string, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(updateDescriptionAction.request());
        ReleaseService.updateReleaseDescription(id,description, (id) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(id);
            dispatch(updateDescriptionAction.success());
        }, (errorMessage) => {
            dispatch(updateDescriptionAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error("Ошибка при обновлении описания релиза."));
        })
    }
}

export function finishRelease (id: number, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(finishReleaseAction.request());
        ReleaseService.finishRelease(id, (id) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(id);
            dispatch(finishReleaseAction.success());
        }, (errorMessage) => {
            dispatch(finishReleaseAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error("Ошибка при завершении релиза."));
        })
    }
}

export function addTaskToRelease(releaseId: number, taskId: number, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(addTaskToReleaseAction.request());
        ReleaseService.addTaskToRelease(releaseId, taskId, (id) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(id);
            dispatch(addTaskToReleaseAction.success());
        }, (errorMessage) => {
            dispatch(addTaskToReleaseAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error("Ошибка при добавлении задачи в релиз."));
        })
    }
}

export function deleteTaskFromRelease(releaseId: number, taskId: number, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(addTaskToReleaseAction.request());
        ReleaseService.removeTaskToRelease(releaseId, taskId, (id) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(id);
            dispatch(addTaskToReleaseAction.success());
        }, (errorMessage) => {
            dispatch(addTaskToReleaseAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error("Ошибка при удалении задачи из релиза."));
        })
    }
}
