import * as actions from "./Actions"
import {ActionType, getType} from "typesafe-actions";
import {Reducer} from "redux";
import {ApplicationState} from "../Store";

export interface ReleasesStoreState {
    actionInProgress: boolean
}

const initialState: ReleasesStoreState = {
    actionInProgress: false
}

export type Actions = ActionType<typeof actions>

export const reducer: Reducer<ReleasesStoreState> = (state: ReleasesStoreState = initialState, action: Actions) => {
    switch (action.type) {
        // case getType(actions.fetchProjectsAction.request) :
        //     return {...state, actionInProgress: true}
        //
        // case getType(actions.fetchProjectsAction.success) :
        //     return {...state, projects: action.payload, actionInProgress: false}
        //
        // case getType(actions.fetchProjectsAction.failure) :
        //     return {...state, actionInProgress: false}


        default:
            return state;
    }
}

export function getActionInProgress(state : ApplicationState) : boolean {
    return state.releases.actionInProgress;
}
