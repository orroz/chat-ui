// src/js/components/List.js
import React from "react";
import { connect } from "react-redux";
import avatarStore from "../modules/avatarStore";
const mapStateToProps = state => {
	return { messages: state.messages };
};
const ConnectedList = ({ messages }) => (
	<ul className="list-group list-group-flush">
		{messages.map(el => {
			let avatarUrl = avatarStore.getAvatarUrlByIndex(el.avatarIndex);
			let wrapperClass = el.isMe ? "isMe" : "isOther";
			return (<li className="list-group-item" key={el.id}>
				<div className={wrapperClass}><span><img className="chatAvatar" src={avatarUrl}/> </span> <span
					className="chatName">{el.name}</span> : <span className="chatContent">{el.content}</span></div>
			</li>);
		})}
	</ul>);
const List = connect(mapStateToProps)(ConnectedList);
export default List;