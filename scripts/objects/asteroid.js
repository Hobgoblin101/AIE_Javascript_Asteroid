//Asteroid
var asteroid = {
    image: document.createElement("img"),
    Location: [100, 100],
    width: 69,
    height: 75,
    direction: [0, 0],
    speed: 0.8,
    isDead: false
};
asteroid.image.src = "sprites/rock_large.png"

function UpdateAsteroid(){
  //Test it intersecting or dead
  if(bullet.isDead == false){
    bullet.x += bullet.velocityX;
    bullet.y += bullet.velocityY;
    context.drawImage(bullet.image,
    bullet.x - bullet.width/2,
    bullet.y - bullet.height/2);

    if(asteroid.isDead == false){
      var hit = intersects(
        bullet.x, bullet.y,
        bullet.width, bullet.height,
        asteroid.x, asteroid.y,
        asteroid.width, asteroid.height);
      if(hit == true){
        bullet.isDead = true;
        asteroid.isDead = true;
      }
    };
  };

  //Handle Asteroid Movement
  asteroid.direction[0] = 10;
  asteroid.direction[1] = 8;
  // 'normalize' the velocity (the hypotenuse of the triangle
  // formed by x,y will equal 1)
  var magnitude = Math.sqrt((asteroid.direction[0] * asteroid.direction[0])
  + (asteroid.direction[1] * asteroid.direction[1]));
  if (magnitude != 0) {
      asteroid.direction[0] /= magnitude;
      asteroid.direction[1] /= magnitude;
  }
  //Draw Asteroid
  // update and draw the asteroid (we don't need to
  // worry about rotation here)
  var velocityX = asteroid.direction[0] * asteroid.speed;
  var velocityY = asteroid.direction[1] * asteroid.speed;
  asteroid.Location[0] += velocityX;
  asteroid.Location[1] += velocityY;
  context.drawImage(asteroid.image, asteroid.Location[0] - asteroid.width / 2, asteroid.Location[1] - asteroid.height / 2);
}
