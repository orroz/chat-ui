// src/js/store/index.js
import { createStore, applyMiddleware } from "redux";
import startWs, {wsMiddleware} from '../modules/ws';
import handleData from "../reducers/index";

const store = createStore(handleData, applyMiddleware(wsMiddleware));
startWs(store);

export default store;