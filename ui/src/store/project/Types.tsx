import {User} from '../users/Types';


export interface UserProject {
    user: User,
    businessRole: BusinessRole
}

export interface ProjectRequest {
    id?: number,
    name: string
}

export interface Project {
    id: number,
    assignee: User,
    reporter: User,
    name: string,
    description: string,
    active: boolean
}

export interface RoleInProject {
    projectId: number,
    role: BusinessRole
}

export interface ProjectsByUsers {
    assignee: number[],
    reporters: number[],
    participants: RoleInProject[]
}

export enum BusinessRole {
    DEVELOPER = 'DEVELOPER',
    TESTER = 'TESTER',
    DEVOPS = 'DEVOPS',
    LEADER = 'LEADER'
}
