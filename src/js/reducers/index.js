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
		case RECEIVE_MESSAGE:
			let message = { name: action.payload.name || state.name, avatarIndex : action.payload.avatarIndex || state.avatarIndex,
				text: action.payload.text, id: action.payload.id, isMe: action.payload.sendOut};
				if(!message.text || !message.id || !message.name || !message.avatarIndex) {
					console.log("not adding invalid message");
					return state;
				}
			return { ...state, messages: [...state.messages, message] };
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