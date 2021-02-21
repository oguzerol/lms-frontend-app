import { SET_AUTH, DELETE_AUTH, AuthActionTypes, User } from "./types";

// TypeScript infers that this function is returning SendMessageAction
export function sendMessage(user: User): AuthActionTypes {
  return {
    type: SET_AUTH,
    payload: user,
  };
}

// TypeScript infers that this function is returning DeleteMessageAction
export function deleteMessage(timestamp: number): AuthActionTypes {
  return {
    type: DELETE_AUTH,
  };
}
