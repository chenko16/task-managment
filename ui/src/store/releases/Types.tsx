import {User} from "../users/Types";
import {Project} from "../project/Types";

export interface Release {
    id: number,
    reporter: User,
    project: Project,
    created: number,
    finished: number
}

export interface ReleaseRequest {
    id: number,
    projectId: number,
    name: string,
    description: string,
    reporterId: number
    // private Long id;
    // private Long projectId;
    // private String name;
    // private String description;
    // private Long reporterId;
}