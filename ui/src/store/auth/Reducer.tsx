import {Reducer} from 'redux';
import * as actions from './Actions'
import {ActionType, getType} from 'typesafe-actions';
import {ApplicationState} from '../Store';
import {SystemRole} from '../users/Types';

export interface AuthStoreState {
    authPerformed : boolean,
    authenticated: boolean,
    login: string | undefined,
    jwtToken: string | undefined,
    expTime: number | undefined,
    role: SystemRole | undefined,
    isLoading: boolean
}

export const initialState: AuthStoreState = {
    authPerformed : false,
    login: undefined,
    role: undefined,
    jwtToken: undefined,
    expTime: undefined,
    authenticated: false,
    isLoading: false
}

export type NotificationActions = ActionType<typeof actions>

export const reducer: Reducer<AuthStoreState> = (state: AuthStoreState = initialState, action: NotificationActions) => {

    switch (action.type) {
        case getType(actions.authActions.success) :
            return {
                ...state,
                authenticated: true,
                login: action.payload.login,
                role: action.payload.role,
                jwtToken: action.payload.token,
                expTime: action.payload.exp,
                authPerformed: true
            }

        case getType(actions.checkAuthAction.success) :
            return {
                ...state,
                authenticated: true,
                login: action.payload.login,
                role: action.payload.role,
                jwtToken: action.payload.token,
                expTime: action.payload.exp,
                authPerformed: true
            }

        case getType(actions.logoutAction.success):
            return {
                ...state,
                authenticated: false,
                login: undefined,
                expTime: undefined,
                jwtToken: undefined,
                role: undefined
            }

        default:
            return state;
    }
}

export function isAuthPerformed(state : ApplicationState) : boolean {
    return state.auth.authPerformed;
}

export function isLoading(state: ApplicationState) : boolean{
    return state.auth.isLoading
}

export function isAuthenticated(state: ApplicationState) : boolean {
    return state.auth.authenticated
}

export function username(state: ApplicationState) : string {
    return state.auth.login || '';
}

export function getRole(state: ApplicationState) : SystemRole {
    return state.auth.role || SystemRole.USER;
}

export function checkAuth(state: ApplicationState) : boolean {
    return state.auth.jwtToken != undefined
}

export function getExpTime(state: ApplicationState): number {
    return state.auth.expTime || 0;
}

