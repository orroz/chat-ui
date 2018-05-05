import React from "react";
import MessagesList from "./MessagesList";
import MessageBox from "./MessageBox";
import UserBox from "./UserBox";
import Avatar   from "./Avatar";

const App = () => (
	<div className="row mt-5">
		<div className="col-md-12 chatBox">
			<h2>Chat Room</h2>
			<MessagesList />
		</div>
		<div className="col-md-12 controlBox">
			<div className="col-md-1">
				<Avatar></Avatar>
			</div>
			<div className="col-md-3">
				<h2>Whats Your Name</h2>
				<UserBox />
			</div>
			<div className="col-md-6">
				<h2>Send A Message</h2>
				<MessageBox />
			</div>
		</div>
	</div>
);
export default App;