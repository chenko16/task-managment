import {SystemRole, User, UserRequest} from "../store/users/Types";
import BackendProvider from "./BackendProvider";
import {BusinessRole, Project, ProjectRequest, ProjectsByUsers, UserProject} from "../store/project/Types";


export class ProjectService {


    static async createProject(
        project: ProjectRequest,
        okCallback: () => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('POST', '/project');

        if (result.ok) {
            let body = await result.json();
            okCallback()
        } else {
            //let body = await result.json();
            if (project.id) {
                errorCallback("Ошибка при редактировании проекта.")
            } else {
                errorCallback("Ошибка при добавлении проекта.");
            }
        }
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

        if (result.ok) {
            okCallback(id);
        } else {
            errorCallback("Ошибка при добавлении участника.");
        }
    }

    static async deleteParticipant (
        id: number,
        userId: number,
        okCallback: (id: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('DELETE', '/project/' + id.toString() + '/participant/' + userId.toString());

        if (result.ok) {
            okCallback(id);
        } else {
            errorCallback("Ошибка при удалении участника.");
        }
    }

    static async setParticipantRole (
        id: number,
        userId: number,
        role: BusinessRole,
        okCallback: (id: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('PUT', '/project/' + id.toString() + '/participant/' + userId.toString() + '/role', null,
            {role: role});

        if (result.ok) {
            okCallback(id);
        } else {
            errorCallback("Ошибка при изменении роли участника.");
        }
    }

    static async getParticipants (
        id: number,
        okCallback: (users: UserProject[]) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('GET', '/project/' + id.toString() + '/participants');

        if (result.ok) {
            let body = await result.json();
            okCallback(body as UserProject[]);
        } else {
            errorCallback("Ошибка при получении списка участников проекта.");
        }
    }

    static async getProjectsByUsers (
        userId: number,
        okCallback: (projectByUsers: ProjectsByUsers[]) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('GET', '/project/list/user/' + userId.toString());

        if (result.ok) {
            let body = await result.json();
            okCallback(body as ProjectsByUsers[]);
        } else {
            errorCallback("Ошиюка при получении списка проектов пользователя.")
        }
    }

}