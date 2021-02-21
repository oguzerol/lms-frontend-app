import { AuthState, AuthActionTypes, SET_AUTH, DELETE_AUTH } from "./types";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export function authReducer(
  state = initialState,
  action: AuthActionTypes
): AuthState {
  switch (action.type) {
    case SET_AUTH:
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case DELETE_AUTH:
      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
