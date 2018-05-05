// src/js/actions/index.js
import { ADD_MESSAGE, CHANGE_USERNAME, RECEIVE_MESSAGE } from "../constants/action-types";
export const addMessage = message  => ({ type: ADD_MESSAGE, payload: message });
export const receiveMessage = message  => ({ type: RECEIVE_MESSAGE, payload: message });
export const changeUsername = name  => ({ type: CHANGE_USERNAME, payload: name });