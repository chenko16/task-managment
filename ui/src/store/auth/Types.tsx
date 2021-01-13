import {SystemRole} from '../users/Types';

export interface AuthResult {
    role: SystemRole,
    login: string,
    token: string,
    exp: number
}


