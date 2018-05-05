//connecting to Socket.IO chat server
import io from "socket.io-client";
import { addMessage, receiveMessage } from "../actions/index";
import {ADD_MESSAGE, CHANGE_USERNAME} from "../constants/action-types";

let socket = null;
let userId = null;
let avatarIndex = null;

export function wsMiddleware() {
	return (next) => (action) => {
		if (socket && action.type === ADD_MESSAGE) {
			console.log('wsMiddleware : ADD_MESSAGE', action.payload);
			if(!action.payload || !action.payload.name || !action.payload.title || !action.payload.id){
				console.log("ws: not sending invalid message");
				return;
			}
			socket.emit('spotim/chat', {...action.payload, "name" : userId, "avatarIndex": avatarIndex});
		}
		if (action.type === CHANGE_USERNAME) {
			userId = action.payload;
		}
		return next(action);
	};
}

export default function (store) {
	socket = io("https://spotim-demo-chat-server.herokuapp.com");
	socket.on("connect", function() {
		let currentState = store.getState();
		userId = currentState.name;
		avatarIndex = currentState.avatarIndex;
		console.log("connected to chat server!");
		socket.on('spotim/chat', function (data) {
			if(data.name == userId){
				console.log("received own message");
				return;
			}
			console.log("chatMessage incoming :", data);
			if(!data.title || !data.id || !data.name || !data.avatarIndex) {
				console.log("received invalid message");
				return;
			}
			store.dispatch(receiveMessage({
				"title": data.title,
				"id": data.id,
				"name": data.name,
				"avatarIndex": data.avatarIndex,
				"sendOut" : false
			}));
		});
	});
	socket.on("disconnect", function() {
		console.log("disconnected from chat server!");
	});
}