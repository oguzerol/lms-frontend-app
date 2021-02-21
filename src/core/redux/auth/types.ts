export const SET_AUTH = "SET_AUTH";
export const DELETE_AUTH = "DELETE_AUTH";

export interface User {
  id: number;
  email: string;
}

export interface AuthState {
  user: null | object;
  isAuthenticated: boolean;
}

interface SetAuthAction {
  type: typeof SET_AUTH;
  payload: object;
}

interface DeleteAuthAction {
  type: typeof DELETE_AUTH;
}

export type AuthActionTypes = SetAuthAction | DeleteAuthAction;
