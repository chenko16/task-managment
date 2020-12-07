import BackendProvider from "./BackendProvider";
import {BusinessRole, Project, ProjectRequest, ProjectsByUsers, UserProject} from "../store/project/Types";
import {SystemRole, User} from "../store/users/Types";


export class ProjectService {


    static async createProject(
        project: ProjectRequest,
        okCallback: (project: Project) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('POST', '/project', null, null, JSON.stringify(project));

        let projectNew: Project = {
            id: 1,
            name: "name"
        }
        okCallback(projectNew);
        // if (result.ok) {
        //     let body = await result.json();
        //     okCallback(body as Project);
        // } else {
        //     //let body = await result.json();
        //     if (project.id) {
        //         errorCallback("Ошибка при редактировании проекта.")
        //     } else {
        //         errorCallback("Ошибка при добавлении проекта.");
        //     }
        // }
    }

    static async getProjectInfo(
        id: number,
        okCallback: (project: Project) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('GET', '/project/' + id.toString());

        if (result.ok) {
            let body = await result.json();
            okCallback(body as Project);
        } else {
            errorCallback("Ошибка при получении информации о проекте.")
        }
    }

    static async getProjects(
        okCallback: (projects: Project[]) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('GET', '/project/list');

        if (result.ok) {
            let body = await result.json();
            okCallback(body as Project[]);
        } else {
            errorCallback("Ошибка при получении списка проектов.")
        }
    }

    static async deleteProject(
        id: number,
        okCallback: (id: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('DELETE', '/project/' + id.toString());

        if (result.ok) {
            okCallback(id)
        } else {
            errorCallback("Ошибка при удалении проекта.")
        }
    }

    static async updateName(
        id: number,
        name: string,
        okCallback: (id: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('PUT', '/project/' + id.toString() + '/name', null, {name: name});

        if (result.ok) {
            okCallback(id);
        } else {
            errorCallback("Ошибка при обновлении имени.");
        }
    }

    static async updateDescription(
        id: number,
        description: string,
        okCallback: (id: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('PUT', '/project/' + id.toString() + '/description', null, {description: description});

        if (result.ok) {
            okCallback(id);
        } else {
            errorCallback("Ошибка при обновлении описания.");
        }
    }

    static async updateStatus(
        id: number,
        status: boolean,
        okCallback: (id: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('PUT', '/project/' + id.toString() + '/status', null, {status: status});

        if (result.ok) {
            okCallback(id);
        } else {
            errorCallback("Ошибка при обновлении статуса.");
        }
    }

    static async updateAssignee (
        id: number,
        userId: number,
        okCallback: (id: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('PUT', '/project/' + id.toString() + '/assignee', null, {userId: userId});

        if (result.ok) {
            okCallback(id);
        } else {
            errorCallback("Ошибка при обновлении руководителя.");
        }
    }

    static async updateReporter (
        id: number,
        userId: number,
        okCallback: (id: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('PUT', '/project/' + id.toString() + '/reporter', null, {userId: userId});

        if (result.ok) {
            okCallback(id);
        } else {
            errorCallback("Ошибка при обновлении создателя.");
        }
    }

    static async addParticipant (
        id: number,
        userId: number,
        okCallback: (id: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('PUT', '/project/' + id.toString() + '/participant/' + userId.toString());

        okCallback(id);
        //
        // if (result.ok) {
        //     okCallback(id);
        // } else {
        //     errorCallback("Ошибка при добавлении участника.");
        // }
    }

    static async deleteParticipant (
        id: number,
        userId: number,
        okCallback: (id: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('DELETE', '/project/' + id.toString() + '/participant/' + userId.toString());

        okCallback(id);
        // if (result.ok) {
        //     okCallback(id);
        // } else {
        //     errorCallback("Ошибка при удалении участника.");
        // }
    }

    static async setParticipantRole (
        id: number,
        userId: number,
        role: BusinessRole,
        okCallback: (id: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('PUT', '/project/' + id.toString() + '/participant/' + userId.toString() + '/role', null,
            {role: role});

        okCallback(id);
        // if (result.ok) {
        //     okCallback(id);
        // } else {
        //     errorCallback("Ошибка при изменении роли участника.");
        // }
    }

    static async getParticipants (
        id: number,
        okCallback: (users: UserProject[]) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('GET', '/project/' + id.toString() + '/participants');

        let user1: User = {
            id: 10,
            login:"Saske",
            systemRole: SystemRole.USER,
            active: true
        };
        let user2: User = {
            id: 2,
            login:"Kakashi",
            systemRole: SystemRole.ADMIN,
            active: true
        };
        let user3: User = {
            id: 3,
            login:"Sakura",
            systemRole: SystemRole.MANAGER,
            active: false
        };

        let userProject1 : UserProject = {
            businessRole: BusinessRole.LEADER,
            user: user1
        }
        let userProject2 : UserProject = {
            businessRole: BusinessRole.DEVOPS,
            user: user2
        }
        let userProject3 : UserProject = {
            businessRole: BusinessRole.DEVELOPER,
            user: user3
        }
        let userProjects: UserProject[] = [];
        userProjects.push(userProject1,userProject2, userProject3);
        okCallback(userProjects);
        // if (result.ok) {
        //     let body = await result.json();
        //     okCallback(body as UserProject[]);
        // } else {
        //     errorCallback("Ошибка при получении списка участников проекта.");
        // }
    }

    static async getProjectsByUsers (
        userId: number,
        okCallback: (projectByUsers: ProjectsByUsers) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('GET', '/project/list/user/' + userId.toString());

        if (result.ok) {
            let body = await result.json();
            okCallback(body as ProjectsByUsers);
        } else {
            errorCallback("Ошибка при получении списка проектов пользователя.")
        }
    }

}