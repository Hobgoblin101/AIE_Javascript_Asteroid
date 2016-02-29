/**Setup**/
	//Defaults
	var canvas = document.getElementById("gameCanvas");
	var context = canvas.getContext("2d");
	var player = document.createElement("img");
	player.src = "sprites/ship.png";
	var Pos = [canvas.height / 2, canvas.width / 2];
	var Angle = 0;
	var Velocity = [0, 0];
	var Friction = 1.025;
	var ForwardThrust = 0.25;
	var TurnSpeed = 0.08;
	var lastTime;
	var KeysDown = [];
	var dt;
	
	//Controlls
	var KEY_UP = 38;
	var KEY_RIGHT = 39;
	var KEY_LEFT = 37;
	var KEY_SPACE = 32;

/**Input**/
function onKeyDown(event){
	KeysDown[event.keyCode] = true;
};

function onKeyUp(event){
	KeysDown[event.keyCode] = false;
};

window.addEventListener('keydown', function(evt){onKeyDown(evt);}, false);
window.addEventListener('keyup', function(evt){onKeyUp(evt);}, false);

function InputHandeler(){
	if (KeysDown[KEY_UP] == true){
		Velocity[0] += (0 * Math.cos(Angle)) - (ForwardThrust * Math.sin(Angle));
		Velocity[1] += (0 * Math.cos(Angle)) + (ForwardThrust * Math.cos(Angle));
	};
	if (KeysDown[KEY_LEFT] == true){
		Angle -= TurnSpeed;
	};
	if (KeysDown[KEY_RIGHT] == true){
		Angle += TurnSpeed;
	};
};

/**Tick**/
function run(){
	
	//Handel Delta
	var now = Date.now();
	var dt = (now - lastTime) / 1000.0;
	
	//Fill Background
	context.fillStyle = "#ccc";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	//Handle Input
	InputHandeler();
	
	//Handle Position & Velocity
	Pos[0] += Velocity[0];
	Pos[1] += Velocity[1];
	Velocity[0] = Velocity[0] / Friction;
	Velocity[1] = Velocity[1] / Friction;
	
	//Draw Player
	context.save();
		context.translate(Pos[0], Pos[1]);
		context.rotate(Angle);
		context.drawImage(player, -player.width/2, -player.height/2);
	context.restore();
	
	//Handel Delta
	lastTime = now;
}

//-------------------- Don't modify anything below here
// This code will set up the framework so that the 'run' function is
// called 60 times per second. We have some options to fall back on
// in case the browser doesn't support our preferred method.
(function() {
var onEachFrame;
if (window.requestAnimationFrame) {
onEachFrame = function(cb) {
var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
_cb();
};
} else if (window.mozRequestAnimationFrame) {
onEachFrame = function(cb) {
var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
_cb();
};
} else {
onEachFrame = function(cb) {
setInterval(cb, 1000 / 60);
}
}
window.onEachFrame = onEachFrame;
})();
window.onEachFrame(run);