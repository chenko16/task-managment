import AuthService from '../../services/AuthService'
import * as notificationActions from '../notification/Actions'
import {createAsyncAction} from 'typesafe-actions';
import {AuthResult} from './Types';
import jwt_decode from 'jwt-decode';

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
)<void, AuthResult, void>()

export const logout = () => {
    return (dispatch, getState) => {
        dispatch(logoutAction.request());
        dispatch(logoutAction.success());
        localStorage.removeItem('jwtToken')
    }
}

export const checkAuth = () => {
    return (dispatch, getState) => {
        dispatch(checkAuthAction.request);
        const token = localStorage.getItem('jwtToken');
        const jwt = token !== null ? jwt_decode(token) : undefined;
        dispatch(checkAuthAction.success(
            {
                login: jwt?.sub,
                role: jwt?.role,
                token: token,
                exp: jwt?.exp
            }
        ))
    }
}

export const authorize = (login: string, password: string) => {
    return (dispatch, getState) => {
        dispatch(authActions.request());
        AuthService.auth(login, password, (authResult) => {
            dispatch(authActions.success(authResult));
            dispatch(notificationActions.success('Добро пожаловать!'))
        }, error => {
            dispatch(notificationActions.error(error))
        });
    }
}

