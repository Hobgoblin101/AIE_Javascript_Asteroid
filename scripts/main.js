var dt = 1.0;
var blur = 2;
var score = 0;
var startTime = Date.now();

//Load required
require("./scripts/2dVector.js");
require("./scripts/physics.js");
require("./settings.js");
require("./scripts/objects/player.js");
require("./scripts/input.js");
require("./scripts/objects/asteroid.js");

console.debug("Running Main Script...");

function reset(){
  //Asteroid
  var ASTEROID_SPEED = 1.3; //0.8
  var spawnTimer = 1;
  asteroids = [];
  //Player
  player.Location = [SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2];
  player.Velocity = [0, 0];
  player.rotation = 0;
  player.direction = [0, 0];
  player.VectorRotation = [0, 0];
  player.ForwardThrust = 15;
  player.TurnSpeed = 4;
  //Bullets
  bullets = [];
  BULLET_SPEED = 10;
  //Reset inputs
  KeysDown = [];
  startTime = Date.now();
  score = 0;
};

/**Tick**/
function run() {
    //Handel Delta
    var now = Date.now();
    dt = (now - lastTime) / 1000.0;
    lastTime = now;

    //Fill Background
    context.fillStyle = "rgba(0, 0, 0, " +  (1 / blur) + ")";
    context.fillRect(0, 0, canvas.width, canvas.height);

    InputHandeler(dt);
    UpdateBullet(dt);
    UpdatePlayer(dt);
    UpdateAsteroid(dt);

    //Draw Score
    Timer = Math.floor((Date.now() - startTime) / 1000);
    context.fillStyle = "rgb(209, 209, 209)"
    context.font = "15px Arial";
    context.fillText('Time: ' + Timer + ' sec',4,55);
    //Draw Score
    context.fillStyle = "rgb(209, 209, 209)"
    context.font = "28px Arial";
    context.fillText('Score: ' + score,4,32);

    blur = Timer / 30 + 0.1


}

/**On Window Resize**/
function EventResize() {
    SCREEN_WIDTH = window.innerWidth - 0;
    SCREEN_HEIGHT = window.innerHeight - 3.5;
    canvas.height = SCREEN_HEIGHT;
    canvas.width = SCREEN_WIDTH;
};
window.addEventListener("resize", function () { EventResize(); }, false);
EventResize();

//-------------------- Don't modify anything below here
// This code will set up the framework so that the 'run' function is
// called 60 times per second. We have some options to fall back on
// in case the browser doesn't support our preferred method.
(function () {
    var onEachFrame;
    if (window.requestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () { cb(); window.requestAnimationFrame(_cb); }
            _cb();
        };
    } else if (window.mozRequestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () { cb(); window.mozRequestAnimationFrame(_cb); }
            _cb();
        };
    } else {
        onEachFrame = function (cb) {
            setInterval(cb, 1000 / MAXFRAMECOUNT);
        }
    }
    window.onEachFrame = onEachFrame;
})();
window.onEachFrame(run);
