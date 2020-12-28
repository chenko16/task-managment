import {User} from "../users/Types";

export interface Task {
    id: number,
    title: string,
    description: string,
    type: TaskType,
    status: TaskStatus,
    reporter: User,
    assignee?: User,
    // comments?: Comment[],
    // linkedTask?: Task[],
    created?: number
}


export interface TaskRequest {
    title: string,
    description: string,
    status: TaskStatus,
    type: TaskType,
    reporterId: number,
    assigneeId?: number
}

export enum TaskType {
    EPIC = 'EPIC',
    STORY = 'STORY',
    BUG = 'BUG',
    TASK = 'TASK'
}

export enum TaskStatus {
    CREATED = 'CREATED',
    IN_PROGRESS = 'IN_PROGRESS',
    READY = 'READY',
    DONE = 'DONE',
    ON_TESTING = 'ON_TESTING'
}
//
// export interface Comment {
//     id: string,
//     text: string,
//     writer: UserProject
// }
