import * as actions from "./Actions"
import {User} from "./Types";
import {ActionType, getType} from "typesafe-actions";
import {Reducer} from "redux";
import {ApplicationState} from "../Store";


export interface UsersStoreState {
    users : Array<User>,
    selectedUser : User | undefined,
    actionInProgress : boolean,
    userLoadInProgress : boolean
}

const initialState: UsersStoreState = {
    users : [],
    selectedUser : undefined,
    actionInProgress : false,
    userLoadInProgress : false
}

export type Actions = ActionType<typeof actions>


export const reducer: Reducer<UsersStoreState> = (state: UsersStoreState = initialState, action: Actions) => {
    switch (action.type) {
        case getType(actions.fetchUsersAction.request) :
            return {...state, actionInProgress: true}

        case getType(actions.fetchUsersAction.success) :
            return {...state, users: action.payload, actionInProgress: false}

        case getType(actions.fetchUsersAction.failure) :
            return {...state, actionInProgress: false}

        case getType(actions.fetchUserAction.request):
            return {...state, userLoadInProgress: true}

        case getType(actions.fetchUserAction.success):
            return {...state, selectedUser: action.payload, userLoadInProgress: false}

        case getType(actions.fetchUserAction.failure):
            return {...state, userLoadInProgress: false}

        default:
            return state;

    }
}

export function getAllUsers(state: ApplicationState): User[] {
    return state.user.users;
}

export function getSelectedUser(state: ApplicationState): User | undefined {
    return state.user.selectedUser;
}

export function usersIsFetching(state : ApplicationState) : boolean {
    return state.user.actionInProgress
}

export function isUserLoadInProgress(state : ApplicationState) : boolean {
    return state.user.userLoadInProgress;
}
