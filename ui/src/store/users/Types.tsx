
export interface User {
    id: number,
    login: string,
    active: boolean,
    systemRole: SystemRole
}

export interface UserRequest {
    id: number,
    login: string,
    password: string,
    systemRole: SystemRole
}

export enum SystemRole {
    USER = 'USER',
    MANAGER = 'MANAGER',
    ADMIN = 'ADMIN'
}

export const mapRole = {
    USER: "Пользователь",
    MANAGER: "Менеджер",
    ADMIN: "Администратор"
}