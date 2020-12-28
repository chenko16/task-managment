import {User} from "../users/Types";
import {Project} from "../project/Types";
import {Task} from "../tasks/Types";

export interface Release {
    id: number,
    name: string,
    reporter: User,
    project: Project,
    created: string,
    description: string,
    finished: string,
    tasks: Task[]
}

export interface ReleaseRequest {
    id?: number,
    projectId: number,
    name: string,
    description: string,
    reporterId: number
}
