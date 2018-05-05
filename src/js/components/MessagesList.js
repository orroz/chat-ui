// src/js/components/List.js
import React, {Component} from "react";
import { connect } from "react-redux";
import avatarStore from "../modules/avatarStore";
import uuidv1 from "uuid";
const mapStateToProps = state => {
	return { messages: state.messages };
};

export class MessagesList extends Component {
	constructor(props) {
		super(props);
		//this.mapMessages = this.mapMessages.bind(this);
	};
	render() {
		let messages = this.props.messages || [];
		return ( <ul className="list-group list-group-flush">
				{messages.map(el => {
					let avatarUrl = avatarStore.getAvatarUrlByIndex(el.avatarIndex);
					let wrapperClass = el.isMe ? "isMe" : "isOther";
					return (<li className="list-group-item" key={el.id}>
						<div className={wrapperClass}><span><img className="chatAvatar" src={avatarUrl}/> </span> <span
							className="chatName">{el.name}</span> : <span className="chatContent">{el.content}</span></div>
					</li>);
				})}
			</ul>);
	}
}

const connectedMessagesList = connect(mapStateToProps)(MessagesList);
export default connectedMessagesList;