// src/js/components/List.js
import React, {Component} from "react";
import { connect } from "react-redux";
import {AvatarIcon} from "./Avatar";
const mapStateToProps = state => {
	return { messages: state.messages };
};

export class MessagesList extends Component {
	constructor(props) {
		super(props);
	};
	render() {
		let messages = this.props.messages || [];
		return ( <ul className="list-group list-group-flush">
				{messages.map(el => {
					let wrapperClass = el.isMe ? "isMe" : "isOther";
					return (<li className="list-group-item" key={el.id}>
						<div className={wrapperClass}><AvatarIcon avatarIndex={el.avatarIndex} />
							<span className="chatName">{el.name}</span> : <span className="chatContent">{el.text}</span></div>
					</li>);
				})}
			</ul>);
	}
}

const connectedMessagesList = connect(mapStateToProps)(MessagesList);
export default connectedMessagesList;