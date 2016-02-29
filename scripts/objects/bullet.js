//Bullet
var bullet = {
    image: document.createElement("img"),
    Location: [player.Location[0], player.Location[0]],
    width: 5,
    height: 5,
    Velocity: [0, 0],
    speed: 1.5,
    isDead: true
};
bullet.image.src = "sprites/bullet.png"

function UpdateBullet(){
  if(bullet.isDead == false){
    bullet.Location[0] += bullet.Velocity[0];
    bullet.Location[1] += bullet.Velocity[1];
    context.drawImage(bullet.image,
    bullet.Location[0] - bullet.width/2,
    bullet.Location[1] - bullet.height/2);
  }

  if(bullet.x < 0 || bullet.x > SCREEN_WIDTH || bullet.y < 0 || bullet.y > SCREEN_HEIGHT){
    bullet.isDead = true;
  }
};
