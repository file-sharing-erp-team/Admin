import { AUTH_USER, LOAD_USER, LOGOUT_USER } from "./types";

type dataType = {
    id: number;
    email: string;
    isActivated: boolean;
    role: number;
};

const dataSystem: dataType = JSON.parse(
    sessionStorage.getItem("dataSystem") || "{}"
);

export interface State {
    id: number;
    role: number;
    login: string;
    firstName: string;
    lastName: string;
    isAuth: boolean;
}

interface Action {
    type: string;
    payload: State;
}

const initialState: State = dataSystem.hasOwnProperty("id")
    ? {
        id: dataSystem.id,
        role: dataSystem.role,
        login: dataSystem.email,
        firstName: "",
        lastName: "",
        isAuth: true,
    }
    : {
        id: 0,
        role: 0,
        login: "",
        firstName: "",
        lastName: "",
        isAuth: false,
    };

export const userReducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                id: action.payload.id,
                role: action.payload.role,
                login: action.payload.login,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                isAuth: true,
            };
        case LOAD_USER:
            return {
                ...state,
                id: action.payload.id,
                role: action.payload.role,
                login: action.payload.login,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                isAuth: true,
            };
        case LOGOUT_USER:
            return {
                ...state,
                id: "",
                role: "",
                login: "",
                firstName: "",
                lastName: "",
                isAuth: false,
            };
        default:
            return state;
    }
};