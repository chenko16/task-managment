import * as actions from "./Actions"
import {ActionType, getType} from "typesafe-actions";
import {Reducer} from "redux";
import {ApplicationState} from "../Store";
import {Task} from "./Types";

export interface TaskStoreState {
    tasks: Task[],
    currentTask: Task | undefined,
    actionInProgress: boolean,
    currentTaskLoading: boolean
}

const initialState: TaskStoreState = {
    tasks: [],
    currentTask: undefined,
    actionInProgress: false,
    currentTaskLoading: false
}

export type Actions = ActionType<typeof actions>

export const reducer: Reducer<TaskStoreState> = (state: TaskStoreState = initialState, action: Actions) => {
    switch (action.type) {
        case getType(actions.fetchTasksAction.request) :
            return {...state, actionInProgress: true}

        case getType(actions.fetchTasksAction.success) :
            return {...state, tasks: action.payload, actionInProgress: false}

        case getType(actions.fetchTasksAction.failure) :
            return {...state, actionInProgress: false}

        case getType(actions.fetchTaskAction.request) :
            return {...state, currentTaskLoading: true}

        case getType(actions.fetchTaskAction.success) :
            return {...state, currentTask: action.payload, currentTaskLoading: false}

        case getType(actions.fetchTaskAction.failure) :
            return {...state, currentTaskLoading: false}

        default:
            return state;
    }
}

export function getActionInProgress(state : ApplicationState) : boolean {
    return state.tasks.actionInProgress;
}

export function getCurrentTaskLoading(state: ApplicationState) : boolean {
    return state.tasks.currentTaskLoading;
}

export function getTasks(state: ApplicationState) : Task[] {
    return state.tasks.tasks;
}

export function getTask(state: ApplicationState) : Task | undefined {
    return state.tasks.currentTask;
}
