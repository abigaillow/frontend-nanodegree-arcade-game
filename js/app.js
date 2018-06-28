// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  this.x = x;
  this.y = y;
  this.speed = speed;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + this.speed * dt;
  if (this.x > 505) {
    this.x = -80;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
};

 //applause will be played when the game is won
Player.prototype.win = function() {
  var snd = new Audio('sounds/applause.wav');
  snd.play();
  that = this;
  setTimeout(function() {
    that.y = 400;
    that.x = 200;
  }, 3000);
};
//clash sound when the colliasion happens
Player.prototype.crash = function() {
  var snd = new Audio('sounds/crash.wav');
  snd.play();
  this.y = 400;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {
  // tbd
  for (var i = 0; i < allEnemies.length; i++) {
    var enemy = allEnemies[i];
    if (Math.abs(this.y - enemy.y) <= 20) {
      if (Math.abs(this.x - enemy.x) <= 80) {
        this.crash();
      }
    }
  }
};
 //set control keys for the game
Player.prototype.handleInput = function(key) {
  // tbd
  switch (key) {
    case 'left':
      if (this.x != 0) {
        this.x = this.x - 100;
      }
      break;

    case 'right':
      if (this.x != 400) {
        this.x = this.x + 100;
      }
      break;

    case 'up':
      if (this.y > 0) {
        this.y = this.y - 80;
        if (this.y == 0) {
          this.win();
        }
      }
      break;

    case 'down':
      if (this.y < 400) {
        this.y = this.y + 80;
      }
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy = new Enemy(0, 60, 200);
var enemy2 = new Enemy(60, 140, 100);
var enemy3 = new Enemy(120, 220, 150);

var allEnemies = [enemy, enemy2, enemy3];

var player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  console.log(e.keyCode);

  player.handleInput(allowedKeys[e.keyCode]);
});
