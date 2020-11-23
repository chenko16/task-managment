import BackendProvider from "./BackendProvider";
import {SystemRole, User} from "../store/users/Types";

export default class AuthService {

    static async auth(
        username: string,
        password: string,
        okCallback: (user: User, redirect: string | null) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('POST', '/auth/login', null, null, JSON.stringify({
            username: username,
            password: password
        }))

        let user : User = {
            id:2,
            login: "Poly",
            systemRole: SystemRole.ADMIN,
            active: true
        }
        okCallback(user, null)

        // if (result.ok) {
        //     let body = await result.json();
        //     let user = body as User
        //     okCallback(user, result.headers.get("redirect"))
        // } else {
        //     errorCallback("Неверный логин или пароль")
        // }
    }


    static async checkAuth(
        okCallback: (user: User) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('GET', '/auth/whoami')

        if (result.ok) {
            let body = await result.json();
            let user = body as User
            okCallback(user)
        } else {
            errorCallback("Не авторизован")
        }
    }

    static async logout(
        okCallback: () => void,
        errorCallback: () => void) {

        let result = await BackendProvider.request('POST', '/auth/logout')

        if (result.ok) {
            okCallback()
        } else {
            errorCallback()
        }
    }

}