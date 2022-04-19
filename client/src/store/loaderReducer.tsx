import { SHOW_LOADER, HIDE_LOADER } from "./types";

export interface State {
    loading: boolean;
}

interface Action {
    type: string;
    payload: State;
}

const initialState = {
    loading: false,
};

export const loaderReducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, loading: true };
        case HIDE_LOADER:
            return { ...state, loading: false };
        default:
            return state;
    }
};