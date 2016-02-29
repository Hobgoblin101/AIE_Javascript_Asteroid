require("./settings.js");
require("./scripts/2dVector.js");
require("./scripts/input.js");
require("./scripts/objects/bullet.js");
require("./scripts/physics.js");

console.debug('Running Player...');

//Player
var player = {
    image: document.createElement("img"),
    Location: [SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2],
    Velocity: [0, 0],
    worldVelocity: [0, 0],
    rotation: 0,
    direction: [0, 0],
    VectorRotation: [0, 0],
    ForwardThrust: 0.25,
    TurnSpeed: 0.08,
    s: 0,
    c: 0
};
player.image.src = "sprites/ship.png"

function playerShoot() {
    //we can only have 1 bullet at a time
    if (bullet.isDead == false){
        return;
    }

    //start off with a velocity that shoots the bullet straight up
    bullet.Velocity[1] = 1;

    //Now rotate this vector acording to the ship's current rotation
    var s = Math.sin(player.rotation);
    var c = Math.cos(player.rotation);

    //For an explenation of this formula, see http://en.wikipedia.org/wiki/Rotation_matrix
    bullet.Velocity[0] = (0 * c) - (1 * s);
    bullet.Velocity[1] = (0 * s) + (1 * c);

    //Don't bother storing a direction and calculation the velocity every frame, because it won't change.
    //Just store the pre-calculated velocity
    bullet.Velocity[0] = bullet.Velocity[0] * bullet.speed;
    bullet.Velocity[1] = bullet.Velocity[1] * bullet.speed;

    //Don't forget to set the bullet's position
    bullet.Location[0] = player.Location[0];
    bullet.Location[1] = player.Location[1];

    bullet.isDead = false;
};

function UpdatePlayer(dt){
  //Get Rotation
  player.direction[0] = (0 * Math.cos(player.rotation)) - (1 * Math.sin(player.rotation))
  player.direction[1] = (0 * Math.cos(player.rotation)) + (1 * Math.cos(player.rotation));

  //Handle Velocity and Movement
  player.Location[0] += player.Velocity[0];
  player.Location[1] += player.Velocity[1];
  player.Velocity[0] = player.Velocity[0] / Friction;
  player.Velocity[1] = player.Velocity[1] / Friction;

  //Draw Player
  context.save();
  context.translate(player.Location[0], player.Location[1]);
  context.rotate(player.rotation);
  context.drawImage(player.image, -player.image.width / 2, -player.image.height / 2);
  context.restore();
};

console.debug('confirm Load');
