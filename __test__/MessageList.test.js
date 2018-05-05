import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import {MessagesList} from '../src/js/components/MessagesList'

const mockMessage = { name: "mock message", avatarIndex : 1, content: "this is a mock message", id: 1, isMe: true};

// Snapshot for MessageList React Component
describe('>>> ConnectedList --- Snapshot comparison',()=>{
	it('+++capturing Snapshot of ConnectedList', () => {
		const renderedValue =  renderer.create(<MessagesList messages={[mockMessage]} />).toJSON();
		expect(renderedValue).toMatchSnapshot();
	});
});