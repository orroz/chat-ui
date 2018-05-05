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
class MessageBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		this.setState({ [event.target.id]: event.target.value });
	}
	handleSubmit(event) {
		event.preventDefault();
		if(!this.state.title){
			return;
		}
		const { title } = this.state;
		const id = uuidv1();
		this.props.addMessage({ title, id, sendOut: true });
		this.setState({ title: "" });
	}
	render() {
		const { title } = this.state;
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					{/*<label htmlFor="title">Title</label>*/}
					<input
						type="text"
						className="form-control"
						id="title"
						value={title}
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