import {SystemRole, User} from "../store/users/Types";
import BackendProvider from "./BackendProvider";


export default class ReleaseService {

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


}