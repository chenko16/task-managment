import {createAsyncAction, createStandardAction} from "typesafe-actions";
import {SystemRole, User, UserRequest} from "./Types";
import {UserService} from "../../services/UserService";
import * as notificationActions from "../../store/notification/Actions";

export const reqFinished = createStandardAction("@user/REQ_FINISH")<void>();

export const createUserAction = createAsyncAction(
    '@user/CREATE_REQ',
    '@user/CREATE_SUCC',
    '@user/CREATE_FAIL'
)<void, void, void>();

export const updateUserAction = createAsyncAction(
    '@user/UPDATE_REQ',
    '@user/UPDATE_SUCC',
    '@user/UPDATE_FAIL'
)<void, void, void>();

export const fetchUsersAction = createAsyncAction(
    '@user/FETCH_USERS_REQ',
    '@user/FETCH_USERS_SUCC',
    '@user/FETCH_USERS_FAIL'
)<void, User[], void>();

export const fetchUserAction = createAsyncAction(
    '@user/FETCH_USER_REQ',
    '@user/FETCH_USER_SUCC',
    '@user/FETCH_USER_FAIL'
)<void, User, void>();

export const deleteUserAction = createAsyncAction(
    '@user/DELETE_REQ',
    '@user/DELETE_SUCC',
    '@user/DELETE_FAIL'
)<void, number, void>();

export const updateStatusAction = createAsyncAction(
    '@user/UPDATE_STATUS_REQ',
    '@user/UPDATE_STATUS_SUCC',
    '@user/UPDATE_STATUS_FAIL'
)<void, number, void>();

export const updateRoleAction = createAsyncAction(
    '@user/UPDATE_ROLE_REQ',
    '@user/UPDATE_ROLE_SUCC',
    '@user/UPDATE_ROLE_FAIL'
)<void, number, void>();

export function createUser(user: UserRequest, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(createUserAction.request());
        UserService.createUser(user, () => {
            dispatch(reqFinished());
            if (okCallback)
                okCallback();
            dispatch(createUserAction.success());
        }, (errorMessage) => {
            dispatch(createUserAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error(errorMessage));
        })
    }
}

export function updateUser(user: UserRequest) {
    return (dispatch, getState) => {
        dispatch(updateUserAction.request());
        UserService.createUser(user, () => {
            dispatch(reqFinished());
            dispatch(updateUserAction.success());
        }, (errorMessage) => {
            dispatch(updateUserAction.failure());
            dispatch(notificationActions.error(errorMessage));
        })
    }
}

export function fetchUser(id: number) {
    return (dispatch, getState) => {
        dispatch(fetchUserAction.request());
        UserService.getUserInfo(id, (user: User) => {
            dispatch(reqFinished());
            dispatch(fetchUserAction.success(user));
        }, (errorMessage) => {
            dispatch(fetchUserAction.failure());
            dispatch(notificationActions.error(errorMessage));
        })
    }
}

export function fetchUsers() {
    return (dispatch, getState) => {
        dispatch(fetchUsersAction.request());
        UserService.getUsers( (users: User[]) => {
            dispatch(reqFinished());
            dispatch(fetchUsersAction.success(users));
        }, (errorMessage) => {
            dispatch(fetchUsersAction.failure());
            dispatch(notificationActions.error(errorMessage));
        })
    }
}

export function deleteUser(id: number) {
    return (dispatch, getState) => {
        dispatch(deleteUserAction.request());
        UserService.deleteUser(id, (id) => {
            dispatch(reqFinished());
            dispatch(deleteUserAction.success(id));
        }, (errorMessage) => {
            dispatch(deleteUserAction.failure());
            dispatch(notificationActions.error(errorMessage));
        })
    }
}

export function updateStatus(id: number, status: boolean, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(updateStatusAction.request());
        UserService.updateStatus(id, status, (id) => {
            dispatch(reqFinished());
            dispatch(updateStatusAction.success(id));
            if (okCallback)
                okCallback();
        }, (errorMessage) => {
            dispatch(updateStatusAction.failure());
            dispatch(notificationActions.error(errorMessage));
            if (errorCallback)
                errorCallback(errorMessage);
        })
    }
}

export function updateRole(id: number, role: SystemRole, okCallback?, errorCallback?) {
    return (dispatch, getState) => {
        dispatch(updateRoleAction.request());
        UserService.updateRole(id, role, (id) => {
            dispatch(reqFinished());
            dispatch(updateRoleAction.success(id));
            if (okCallback)
                okCallback();
        }, (errorMessage) => {
            dispatch(updateRoleAction.failure());
            if (errorCallback)
                errorCallback(errorMessage);
            dispatch(notificationActions.error(errorMessage));
        })
    }
}