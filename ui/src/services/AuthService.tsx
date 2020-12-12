import BackendProvider from "./BackendProvider";
import jwt_decode from 'jwt-decode';
import {AuthResult} from "../store/auth/Types";

export default class AuthService {

    static async auth(
        username: string,
        password: string,
        okCallback: (authResult: AuthResult) => void,
        errorCallback: (errorMessage: string) => void) {

        let result = await BackendProvider.request('POST', '/authenticate', null, null, JSON.stringify({
            login: username,
            password: password
        }))

        if (result.ok) {
            let body = await result.json();
            var decoded = jwt_decode(body.jwtToken);
            sessionStorage.setItem("jwtToken", body.jwtToken);
            let authResult: AuthResult = {
                login: decoded.sub,
                role: decoded.role,
                token: body.jwtToken,
                exp: decoded.exp
            }
            okCallback(authResult)
        } else {
            errorCallback("Неверный логин или пароль")
        }
    }
}