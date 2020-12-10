import AuthService from '../../services/AuthService'
import * as notificationActions from '../notification/Actions'
import {createAsyncAction} from "typesafe-actions";
import {AuthResult} from "./Types";

export const logoutAction = createAsyncAction(
    '@auth/LOGOUT_REQ',
    '@auth/LOGOUT_SUCC',
    '@auth/LOGOUT_FAIL'
)<void, void, void>();

export const authActions = createAsyncAction(
    '@auth/REGISTER_REQ',
    '@auth/REGISTER_SUCC',
    '@auth/REGISTER_FAIL'
)<void, AuthResult, void>();

export const logout = () => {
    return (dispatch, getState) => {
        dispatch(logoutAction.request());
        dispatch(logoutAction.success());
        sessionStorage.removeItem("jwtToken")
    }
}

export const authorize = (login: string, password: string) => {
    return (dispatch, getState) => {
        dispatch(authActions.request());
        AuthService.auth(login, password, (authResult) => {
            dispatch(authActions.success(authResult));
            dispatch(notificationActions.success("Добро пожаловать!"))
        }, error => {
            dispatch(notificationActions.error(error))
        });
    }
}

