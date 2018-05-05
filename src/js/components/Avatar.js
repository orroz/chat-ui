// src/js/components/List.js
import React from "react";
import { connect } from "react-redux";
import avatarStore from "../modules/avatarStore";

const mapStateToProps = state => {
	return { avatarIndex: state.avatarIndex };
};
const ConnectedAvatarIcon = ({ avatarIndex }) => {
	let avatarUrl = avatarStore.getAvatarUrlByIndex(avatarIndex);
	return (<div className="avatarWrapper">
		<img className="avatarIcon" src={avatarUrl}></img>
	</div>)
};
const AvatarIcon = connect(mapStateToProps)(ConnectedAvatarIcon);
export default AvatarIcon;