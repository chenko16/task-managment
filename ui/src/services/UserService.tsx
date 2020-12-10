import {SystemRole, User, UserRequest} from "../store/users/Types";
import BackendProvider from "./BackendProvider";

export class UserService {

    static async createUser(
        user: UserRequest,
        okCallback: (user: User) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('POST', '/user',null,null, JSON.stringify(user));

        if (result.ok) {
            let body = await result.json();
            okCallback(body as User)
        } else {
            if (user.id) {
                errorCallback("Ошибка при редактировании пользователя.")
            } else {
                errorCallback("Ошибка при добавлении пользователя.");
            }
        }
    }

    static async getUserInfo(
        id: number,
        okCallback: (user: User) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('GET', '/user/' + id.toString());

        if (result.ok) {
            let body = await result.json();
            okCallback(body as User);
        } else {
            errorCallback("Ошибка при получении информации о пользователе.")
        }
    }

    static async getUsers(
        okCallback: (users: User[]) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('GET', '/user/list');

        if (result.ok) {
            let body = await result.json();
            okCallback(body as User[]);
        } else {
            errorCallback("Ошибка при получении списка пользователей.")
        }
    }

    static async deleteUser(
        id: number,
        okCallback: (id: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('DELETE', '/user/' + id.toString());

        if (result.ok) {
            okCallback(id)
        } else {
            errorCallback("Ошибка при удалении пользователя.")
        }
    }

    static async updateStatus(
        id: number,
        status: boolean,
        okCallback: (id: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('PUT', '/user/status/' + id.toString(), null, {status: status});

        if (result.ok) {
            okCallback(id);
        } else {
            errorCallback("Ошибка при обновлении статуса.");
        }
    }

    static async updateRole(
        id: number,
        role: SystemRole,
        okCallback: (id: number) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('PUT', '/user/role/' + id.toString() , null, {role: role});

        if (result.ok) {
            okCallback(id)
        } else {
            errorCallback("Ошибка при обновлении роли.")
        }
    }

    static getEmptyUser(): User {
        return {
            id: -1,
            systemRole: SystemRole.USER,
            login: "",
            active: false
        }
    }

}