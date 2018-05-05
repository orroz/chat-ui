// src/js/components/Form.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { changeUsername } from "../actions/index";
const mapDispatchToProps = dispatch => {
	return {
		changeUsername: name => dispatch(changeUsername(name))
	};
};
const mapStateToProps = state => {
	return { name: state.name };
};
export class UserBox extends Component {
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			name : ""
		};
	}
	handleChange(event) {
		this.setState({ [event.target.id]: event.target.value });
		this.props.changeUsername(event.target.value);
	}
	componentWillMount(){
		console.log("componentWillMount:", this.props);
		this.setState({"name" : this.props.name});
	}
	render() {
		return (
				<div className="form-group">
					<input
						type="text"
						className="form-control"
						id="name"
						value={this.state.name}
						onChange={this.handleChange}
					/>
				</div>
		);
	}
}
const ConnectedUserBox = connect(mapStateToProps, mapDispatchToProps)(UserBox);
export default ConnectedUserBox;