import {User} from "../users/Types";

export interface AuthResult {
    user: User,
    login: string,
    redirect? : string
}


