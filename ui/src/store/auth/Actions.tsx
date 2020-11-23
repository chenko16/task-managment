import AuthService from '../../services/AuthService'
import * as notificationActions from '../notification/Actions'
import {createAsyncAction} from "typesafe-actions";
import {AuthResult} from "./Types";
import {User} from "../users/Types";

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

export const checkAuthAction = createAsyncAction(
    '@auth/CHECK_REQ',
    '@auth/CHECK_SUCC',
    '@auth/CHECK_FAIL'
)<void, User, void>();

export const logout = () => {
    return (dispatch, getState) => {
        dispatch(logoutAction.request());
        AuthService.logout(() => {
            dispatch(logoutAction.success());
        }, () => {
            dispatch(logoutAction.success());
            notificationActions.error("Something unexpected happen")
        })
    }
}

export const checkAuth = () => {
    return (dispatch, getState) => {
        dispatch(checkAuthAction.request());
        AuthService.checkAuth((user : User) => {
            dispatch(checkAuthAction.success(user));
        }, () => {
            dispatch(checkAuthAction.failure());
            notificationActions.error("Something unexpected happen")
        })
    }
}

export const authorize = (login: string, password: string) => {
    return (dispatch, getState) => {
        dispatch(authActions.request());
        AuthService.auth(login, password, (data: User, redirect : string | null) => {
            dispatch(authActions.success({ user: data, login: login}));
            dispatch(notificationActions.success("Добро пожаловать!"))
            if(redirect){
                // @ts-ignore
                window.location.href = redirect;
            }
        }, error => {
            dispatch(notificationActions.error(error))
        });
    }
}

