import * as actions from "./Actions"
import {ActionType, getType} from "typesafe-actions";
import {Reducer} from "redux";
import {ApplicationState} from "../Store";
import {Release} from "./Types";

export interface ReleasesStoreState {
    releases: Release[],
    currentRelease: Release | undefined,
    actionInProgress: boolean,
    currentReleaseLoading: boolean
}

const initialState: ReleasesStoreState = {
    releases: [],
    currentRelease: undefined,
    actionInProgress: false,
    currentReleaseLoading: false
}

export type Actions = ActionType<typeof actions>

export const reducer: Reducer<ReleasesStoreState> = (state: ReleasesStoreState = initialState, action: Actions) => {
    switch (action.type) {
        case getType(actions.fetchReleasesAction.request) :
            return {...state, actionInProgress: true}

        case getType(actions.fetchReleasesAction.success) :
            return {...state, releases: action.payload, actionInProgress: false}

        case getType(actions.fetchReleasesAction.failure) :
            return {...state, actionInProgress: false}

        case getType(actions.fetchReleaseAction.request) :
            return {...state, currentReleaseLoading: true}

        case getType(actions.fetchReleaseAction.success) :
            return {...state, currentRelease: action.payload, currentReleaseLoading: false}

        case getType(actions.fetchReleaseAction.failure) :
            return {...state, currentReleaseLoading: false}

        default:
            return state;
    }
}

export function getActionInProgress(state : ApplicationState) : boolean {
    return state.releases.actionInProgress;
}

export function getCurrentReleaseLoading(state: ApplicationState) : boolean {
    return state.releases.currentReleaseLoading;
}

export function getReleases(state: ApplicationState) : Release[] {
    return state.releases.releases;
}

export function getRelease(state: ApplicationState) : Release | undefined {
    return state.releases.currentRelease;
}