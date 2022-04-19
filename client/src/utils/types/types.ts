export interface IUser {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    isActivated: string;
    role: string;
    phone: string;
}
export interface IToken {
    accessToken: string;
    refreshToken: string;
}

export interface UserData {
    tokens: IToken;
    user: IUser;
}

export interface IUserConfig {
    token: string;
    userId: number;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface IGroup {
    id: number;
    group_name: string;
    group_type: number;
}

export interface GroupResponse {
    groups: Array<IGroup>;
}

