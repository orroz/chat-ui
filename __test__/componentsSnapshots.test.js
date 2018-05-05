import React from 'react'
import renderer from 'react-test-renderer'
import {MessagesList} from '../src/js/components/MessagesList'
import {UserBox} from '../src/js/components/UserBox'
import {AvatarIcon} from '../src/js/components/Avatar'
import {MessageBox} from '../src/js/components/MessageBox'


const userName = "Or Rosenthal";
const mockMessage = { name: "mock message", avatarIndex : 1, title: "this is a mock message", id: 1, sendOut: false};

// Snapshot for MessageList React Component
describe('>>> MessagesList --- Snapshot comparison',()=>{
	it('+++capturing Snapshot of MessagesList with no messages', () => {
		const renderedValue =  renderer.create(<MessagesList />).toJSON();
		expect(renderedValue).toMatchSnapshot();
	});
	it('+++capturing Snapshot of MessagesList with one message', () => {
		const renderedValue =  renderer.create(<MessagesList messages={[mockMessage]} />).toJSON();
		expect(renderedValue).toMatchSnapshot();
	});
});

describe('>>> UserBox --- Snapshot comparison',()=>{
	it('+++capturing Snapshot of UserBox with no name', () => {
		const renderedValue =  renderer.create(<UserBox />).toJSON();
		expect(renderedValue).toMatchSnapshot();
	});
	it('+++capturing Snapshot of UserBox with user name', () => {
		const renderedValue =  renderer.create(<UserBox name={userName} />).toJSON();
		expect(renderedValue).toMatchSnapshot();
	});
});

describe('>>> AvatarIcon --- Snapshot comparison',()=>{
	it('+++capturing Snapshot of AvatarIcon with with icon index 2 - pikachu', () => {
		const renderedValue =  renderer.create(<AvatarIcon avatarIndex="2" />).toJSON();
		expect(renderedValue).toMatchSnapshot();
	});
});

describe('>>> MessageBox --- Snapshot comparison',()=>{
	it('+++capturing Snapshot of MessageBox', () => {
		const renderedValue =  renderer.create(<MessageBox />).toJSON();
		expect(renderedValue).toMatchSnapshot();
	});
});

