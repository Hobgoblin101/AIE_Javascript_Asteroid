require("./scripts/objects/player.js");

/**Input Handler**/
function InputHandeler() {
    if (KeysDown[KEY_UP] == true) {
        player.Velocity[0] += player.direction[0] * player.ForwardThrust
        player.Velocity[1] += player.direction[1] * player.ForwardThrust
    };
    if (KeysDown[KEY_LEFT] == true) {
        player.rotation -= player.TurnSpeed;
    };
    if (KeysDown[KEY_RIGHT] == true) {
        player.rotation += player.TurnSpeed;
    };
    if (KeysDown[KEY_SPACE] == true){
        playerShoot();
    };
};

/**Take RAW input**/
function onKeyDown(event) { KeysDown[event.keyCode] = true };
function onKeyUp(event) { KeysDown[event.keyCode] = false };

/**Add Event Listenter**/
window.addEventListener('keydown', function (evt) { onKeyDown(evt); }, false);
window.addEventListener('keyup', function (evt) { onKeyUp(evt); }, false);
