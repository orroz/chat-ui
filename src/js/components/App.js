import React from "react";
import ConnectedMessagesList from "./MessagesList";
import ConnectedMessageBox from "./MessageBox";
import ConnectedUserBox from "./UserBox";
import ConnectedAvatar   from "./Avatar";

const App = () => (
	<div className="row mt-5">
		<div className="col-md-12 chatBox">
			<h2>Chat Room</h2>
			<ConnectedMessagesList />
		</div>
		<div className="col-md-12 controlBox">
			<div className="col-md-1">
				<ConnectedAvatar />
			</div>
			<div className="col-md-3">
				<h2>Whats Your Name</h2>
				<ConnectedUserBox />
			</div>
			<div className="col-md-6">
				<h2>Send A Message</h2>
				<ConnectedMessageBox />
			</div>
		</div>
	</div>
);
export default App;