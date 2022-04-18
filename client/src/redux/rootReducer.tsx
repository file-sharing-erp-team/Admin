import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { loaderReducer } from "./loaderReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  loader: loaderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
