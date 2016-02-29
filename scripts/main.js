//Load required
require("./scripts/2dVector.js");
require("./scripts/physics.js");
require("./settings.js");
require("./scripts/objects/player.js");
require("./scripts/input.js");
require("./scripts/objects/asteroid.js");

console.debug("Running Main Script...");

/**Tick**/
function run() {
    //Handel Delta
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    //Handle Input
    InputHandeler();

    //Fill Background
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var TickEvents = ["UpdatePlayer", "UpdateAsteriod"]
    UpdatePlayer();
    UpdateAsteroid();
    UpdateBullet();

    //Handel Delta
    lastTime = now;
}

/**On Window Resize**/
function EventResize() {
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
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
