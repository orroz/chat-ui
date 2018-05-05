// src/js/components/Form.js
import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addMessage } from "../actions/index";

const mapDispatchToProps = dispatch => {
	return {
		addMessage: message => dispatch(addMessage(message))
	};
};
export class MessageBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		this.setState({ [event.target.id]: event.target.value });
	}
	handleSubmit(event) {
		event.preventDefault();
		if(!this.state.text){
			return;
		}
		const { text } = this.state;
		const id = uuidv1();
		this.props.addMessage({ text, id, sendOut: true });
		this.setState({ text: "" });
	}
	render() {
		const { text } = this.state;
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<input
						type="text"
						className="form-control"
						id="text"
						value={text}
						onChange={this.handleChange}
					/>
				</div>
				<button type="submit" className="sendButton btn btn-success btn-lg">
					Send
				</button>
			</form>
		);
	}
}
const ConnectedMessageBox = connect(null, mapDispatchToProps)(MessageBox);
export default ConnectedMessageBox;