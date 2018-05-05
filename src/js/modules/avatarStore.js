const avatars = [
	"https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png" ,
	"https://spotim-demo-chat-server.herokuapp.com/avatars/002-psyduck.png" ,
	"https://spotim-demo-chat-server.herokuapp.com/avatars/003-pikachu.png" ,
	"https://spotim-demo-chat-server.herokuapp.com/avatars/004-jigglypuff.png" ,
	"https://spotim-demo-chat-server.herokuapp.com/avatars/005-bullbasaur.png"
];

let getRandomAvatarIndex = function(){
	return Math.floor(Math.random() * avatars.length);
};

let getAvatarUrlByIndex = function(index){
	return avatars[index] || avatars[0];
};

module.exports = {
	getRandomAvatarIndex : getRandomAvatarIndex,
	getAvatarUrlByIndex : getAvatarUrlByIndex
};