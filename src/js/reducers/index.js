import { ADD_MESSAGE, CHANGE_USERNAME, RECEIVE_MESSAGE } from "../constants/action-types";
import avatarStore from "../modules/avatarStore";

 function calculateInitialState(){
	let initialState =  {
		messages: [],
		name: localStorage["name"] || "",
		avatarIndex: parseInt(localStorage["avatarIndex"]) || null
	};
	if(!initialState.avatarIndex){
		initialState.avatarIndex = avatarStore.getRandomAvatarIndex();
		localStorage["avatarIndex"] = initialState.avatarIndex;
	}
	return initialState;
}

const rootReducer = (state = calculateInitialState(), action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			let message = { name: action.payload.name || state.name, avatarIndex : action.payload.avatarIndex || state.avatarIndex,
				content: action.payload.title, id: action.payload.id, isMe: action.payload.sendOut};
				if(!message.content || !message.id || !message.name || !message.avatarIndex) {
					console.log("not adding invalid message");
					return state;
				}
			return { ...state, messages: [...state.messages, message] };
		case RECEIVE_MESSAGE:
			let messageReceived = { name: action.payload.name || state.name, avatarIndex : action.payload.avatarIndex || state.avatarIndex,
				content: action.payload.title, id: action.payload.id, isMe: action.payload.sendOut};
			return { ...state, messages: [...state.messages, messageReceived] };
		case CHANGE_USERNAME:
			if(window.localStorage) {
				localStorage["name"] = action.payload;
			}
			return { ...state, name: action.payload };
			break;
		default:
			return state;
	}

};
export default rootReducer;