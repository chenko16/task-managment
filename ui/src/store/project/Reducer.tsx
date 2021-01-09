import * as actions from './Actions'
import {ActionType, getType} from 'typesafe-actions';
import {Reducer} from 'redux';
import {ApplicationState} from '../Store';
import {Project, ProjectsByUsers, UserProject} from './Types';

export interface ProjectStoreState {
    projects : Array<Project>,
    selectedProject : Project | undefined,
    currentProjectsByUser : ProjectsByUsers | undefined,
    currentParticipants: UserProject[] | undefined,
    actionInProgress : boolean,
    projectLoadInProgress : boolean,
    projectsByUsersProgress: boolean
}

const initialState: ProjectStoreState = {
    projects : [],
    selectedProject : undefined,
    currentProjectsByUser : undefined,
    currentParticipants: undefined,
    actionInProgress : false,
    projectLoadInProgress : false,
    projectsByUsersProgress: false
}

export type Actions = ActionType<typeof actions>

export const reducer: Reducer<ProjectStoreState> = (state: ProjectStoreState = initialState, action: Actions) => {
    switch (action.type) {
        case getType(actions.fetchProjectsAction.request) :
            return {...state, actionInProgress: true}

        case getType(actions.fetchProjectsAction.success) :
            return {...state, projects: action.payload, actionInProgress: false}

        case getType(actions.fetchProjectsAction.failure) :
            return {...state, actionInProgress: false}

        case getType(actions.fetchProjectAction.request):
            return {...state, projectLoadInProgress: true}

        case getType(actions.fetchProjectAction.success):
            return {...state, selectedProject: action.payload, projectLoadInProgress: false}

        case getType(actions.fetchProjectAction.failure):
            return {...state, projectLoadInProgress: false}

        case getType(actions.fetchProjectsByUserAction.request):
            return {...state, projectsByUsersProgress: true}

        case getType(actions.fetchProjectsByUserAction.success):
            return {...state, currentProjectsByUser: action.payload, projectsByUsersProgress: false}

        case getType(actions.fetchProjectsByUserAction.failure):
            return {...state, projectsByUsersProgress: false}

        case getType(actions.getParticipantsAction.request):
            return {...state, actionInProgress: true}

        case getType(actions.getParticipantsAction.success):
            return {...state, actionInProgress: false, currentParticipants: action.payload}

        case getType(actions.getParticipantsAction.failure):
            return {...state, actionInProgress: false}

        default:
            return state;
    }
}

export function getAllProjects(state: ApplicationState): Project[] {
    return state.project.projects;
}

export function getSelectedProject(state: ApplicationState): Project | undefined {
    return state.project.selectedProject;
}

export function projectsIsFetching(state : ApplicationState) : boolean {
    return state.project.actionInProgress;
}

export function isProjectLoadInProgress(state : ApplicationState) : boolean {
    return state.project.projectLoadInProgress;
}

export function getProjectsByUser(state: ApplicationState): ProjectsByUsers | undefined {
    return state.project.currentProjectsByUser;
}

export function isProjectsByUserLoading(state: ApplicationState): boolean {
    return state.project.projectsByUsersProgress;
}

export function getParticipants(state: ApplicationState): UserProject[] | undefined {
    return state.project.currentParticipants;
}
