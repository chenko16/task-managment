import {SystemRole, User, UserRequest} from "../store/users/Types";
import BackendProvider from "./BackendProvider";

export class UserService {

    static async createUser(
        user: UserRequest,
        okCallback: () => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('POST', '/user',null,null,JSON.stringify(user));

        if (result.ok) {
            let body = await result.json();
            okCallback()
        } else {
            //let body = await result.json();
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

        let users: User[] = [];
        let user1: User = {
            id:1,
            login:"Saske",
            systemRole: SystemRole.USER,
            active: true
        };
        let user2: User = {
            id:2,
            login:"Kakashi",
            systemRole: SystemRole.ADMIN,
            active: true
        };
        let user3: User = {
            id:3,
            login:"Sakura",
            systemRole: SystemRole.MANAGER,
            active: false
        };
        let user4: User = {
            id:4,
            login:"Itachi",
            systemRole: SystemRole.ADMIN,
            active: true
        };

        users.push(user1,user2,user3,user4);
        okCallback(users);
        // if (result.ok) {
        //     let body = await result.json();
        //     okCallback(body as User[]);
        // } else {
        //     errorCallback("Ошибка при получении списка пользователей.")
        // }
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

        let result = await BackendProvider.request('PUT', '/user/' + id.toString(), null, {status: status});

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

        let result = await BackendProvider.request('PUT', '/user/' + id.toString() , null, {role: role});

        if (result.ok) {
            okCallback(id)
        } else {
            errorCallback("Ошибка при обновлении роли.")
        }
    }

}