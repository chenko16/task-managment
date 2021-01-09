import {createAsyncAction, createStandardAction} from 'typesafe-actions';
import * as notificationActions from '../../store/notification/Actions';
import {Task, TaskRequest, TaskStatus, TaskType} from './Types';
import TaskService from '../../services/TaskService';

export const reqFinished = createStandardAction('@task/REQ_FINISH')<void>();

export const createTaskAction = createAsyncAction(
    '@task/CREATE_REQ',
    '@task/CREATE_SUCC',
    '@task/CREATE_FAIL'
)<void, void, void>();

export const fetchTasksAction = createAsyncAction(
    '@task/FETCH_TASKS_REQ',
    '@task/FETCH_TASKS_SUCC',
    '@task/FETCH_TASKS_FAIL'
)<void, Task[], void>();

export const fetchTaskAction = createAsyncAction(
    '@task/FETCH_TASK_REQ',
    '@task/FETCH_TASK_SUCC',
    '@task/FETCH_TASK_FAIL'
)<void, Task, void>();

export const deleteTaskAction = createAsyncAction(
    '@task/DELETE_REQ',
    '@task/DELETE_SUCC',
    '@task/DELETE_FAIL'
)<void, void, void>();

export const updateDescriptionAction = createAsyncAction(
    '@task/UPDATE_DESC_REQ',
    '@task/UPDATE_DESC_SUCC',
    '@task/UPDATE_DESC_FAIL'
)<void, void, void>();

export const updateStatusAction = createAsyncAction(
    '@task/UPDATE_STATUS_REQ',
    '@task/UPDATE_STATUS_SUCC',
    '@task/UPDATE_STATUS_FAIL'
)<void, void, void>();

export const updateTypeAction = createAsyncAction(
    '@task/UPDATE_TYPE_REQ',
    '@task/UPDATE_TYPE_SUCC',
    '@task/UPDATE_TYPE_FAIL'
)<void, void, void>();

export const updateTitleAction = createAsyncAction(
    '@task/UPDATE_TITLE_REQ',
    '@task/UPDATE_TITLE_SUCC',
    '@task/UPDATE_TITLE_FAIL'
)<void, void, void>();

export const updateAssigneeAction = createAsyncAction(
    '@task/UPDATE_ASSIGNEE_REQ',
    '@task/UPDATE_ASSIGNEE_SUCC',
    '@task/UPDATE_ASSIGNEE_FAIL'
)<void, void, void>();

export function createTask(task: TaskRequest, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(createTaskAction.request());
        TaskService.createTask(task, (task) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(task);
            dispatch(createTaskAction.success());
        }, (errorMessage) => {
            dispatch(createTaskAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при создании задачи.'));
        })
    }
}

export function deleteTask (id: number, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(deleteTaskAction.request());
        TaskService.deleteTask(id, (id) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(id);
            dispatch(deleteTaskAction.success());
        }, (errorMessage) => {
            dispatch(deleteTaskAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при удалении задачи.'));
        })
    }
}

export function fetchTasks (okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(fetchTasksAction.request());
        TaskService.getTasks( (tasks) => {
            dispatch(reqFinished());
            dispatch(fetchTasksAction.success(tasks));
        }, (errorMessage) => {
            dispatch(fetchTasksAction.failure());
            dispatch(notificationActions.error('Ошибка при получении всех задач.'));
        })
    }
}

export function fetchTask(id: number, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(fetchTaskAction.request());
        TaskService.getTask(id, (task) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(task);
            dispatch(fetchTaskAction.success(task));
        }, (errorMessage) => {
            dispatch(fetchTaskAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при получении задачи.'));
        })
    }
}

export function updateDescription (id: number, description: string, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(updateDescriptionAction.request());
        TaskService.updateTaskDescription(id,description, (id) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(id);
            dispatch(updateDescriptionAction.success());
        }, (errorMessage) => {
            dispatch(updateDescriptionAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при обновлении описания задачи.'));
        })
    }
}

export function updateTaskStatus (id: number, status: TaskStatus, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(updateStatusAction.request());
        TaskService.updateTaskStatus(id,status, (id) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(id);
            dispatch(updateStatusAction.success());
        }, (errorMessage) => {
            dispatch(updateStatusAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при обновлении статуса задачи.'));
        })
    }
}

export function updateTaskType (id: number, type: TaskType, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(updateTypeAction.request());
        TaskService.updateTaskType(id,type, (id) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(id);
            dispatch(updateTypeAction.success());
        }, (errorMessage) => {
            dispatch(updateTypeAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при обновлении типа задачи.'));
        })
    }
}

export function updateTaskTitle (id: number, title: string, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(updateTitleAction.request());
        TaskService.updateTaskTitle(id,title, (id) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(id);
            dispatch(updateTitleAction.success());
        }, (errorMessage) => {
            dispatch(updateTitleAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при обновлении названия задачи.'));
        })
    }
}

export function setAssignee (id: number, userId: number, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(updateAssigneeAction.request());
        TaskService.setTaskAssignee(id, userId, (id) => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback(id);
            dispatch(updateAssigneeAction.success());
        }, (errorMessage) => {
            dispatch(updateAssigneeAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error('Ошибка при обновлении исполнителя задачи.'));
        })
    }
}

