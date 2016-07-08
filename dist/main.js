
var enemy;

function Character() {
  this.health = 4;
  this.attackPwr = 1;
  this.accuracy = 0.5;
  this.alive = true;
  this.turn = true;
}

Character.prototype.basicAttack = function functionName() {
  if (Math.random()<this.accuracy) {
    console.log('Hit!');
    enemy.health--;
  } else {
    console.log('Miss!');
  }
  this.turn = false;
  enemy.turn = true;
};

function Hero() {
  Character.apply(this, arguments);
}
function Villain() {
  Character.apply(this, arguments);
}
Hero.prototype = Object.create(Character.prototype);
Hero.prototype.constructor = Hero;  
Villain.prototype = Object.create(Character.prototype);
Villain.prototype.constructor = Villain;
