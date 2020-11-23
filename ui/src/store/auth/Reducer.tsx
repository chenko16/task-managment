import {Reducer} from "redux";
import * as actions from "./Actions"
import {ActionType, getType} from "typesafe-actions";
import {ApplicationState} from "../Store";
import {User} from "../users/Types";

export interface AuthStoreState {
    authPerformed : boolean,
    authenticated: boolean,
    login: string | undefined,
    user: User | undefined,
    isLoading: boolean
}

export const initialState: AuthStoreState = {
    authPerformed : false,
    login: undefined,
    authenticated: true,
    user: undefined,
    isLoading: false
}

export type NotificationActions = ActionType<typeof actions>

export const reducer: Reducer<AuthStoreState> = (state: AuthStoreState = initialState, action: NotificationActions) => {
    switch (action.type) {
        case getType(actions.authActions.success) :
            return {
                ...state,
                authenticated: true,
                user: action.payload.user,
                login: action.payload.login
            }

        case getType(actions.checkAuthAction.request):
            return {
                ...state,
                isLoading : true
            }

        case getType(actions.checkAuthAction.success):
            return {
                ...state,
                authenticated : true,
                isLoading : false,
                login : action.payload.login,
                user : action.payload,
                authPerformed : true
            }

        case getType(actions.checkAuthAction.failure):
            return {
                ...state,
                authenticated : false,
                isLoading : false,
                authPerformed : true
            }

        case getType(actions.logoutAction.success):
            return {
                ...state,
                authenticated: false,
                username: undefined,
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
    return state.auth.login || "";
}

export function user(state : ApplicationState) : User | undefined {
    return state.auth.user
}

