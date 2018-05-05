import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import rootReducer from '../src/js/reducers'
import { ADD_MESSAGE, CHANGE_USERNAME, RECEIVE_MESSAGE } from "../src/js/constants/action-types";

const userName = "Or Rosenthal";
const mockMessage = { name: "mock message", avatarIndex : 1, content: "this is a mock message", id: 1, isMe: true};


describe('>>>R E D U C E R --- Test state change on different actions dispatch to reducer',()=>{
	it('+++ should change user name to ' + userName, () => {
		let state = {};
		state = rootReducer(state,{type:CHANGE_USERNAME,payload: userName});
		expect(state.name).toEqual(userName);
	});
	it('+++ should add a message to the messages array on state', () => {
		let state = {messages: []};
		state = rootReducer(state,{type:ADD_MESSAGE,payload: mockMessage});
		expect(state.messages.length).toEqual(1);
	});
	it('+++ should add a message to the messages array on state', () => {
		let state = {messages: [{ name: "message before", avatarIndex : 0, content: "this is a mock message", id: 0, isMe: false}]};
		state = rootReducer(state,{type:RECEIVE_MESSAGE,payload: mockMessage});
		expect(state.messages.length).toEqual(2);
	});
});