var bearname;

function renderVictory() {
$('.victory').removeClass('hidden');
$('.victory').show();
$('.defeat').hide();
$('.results').show();
$('.' + bearname).hide();
$('.fight').addClass('hidden');
}

function renderDefeat() {
$('.defeat').removeClass('hidden');
$('.defeat').show();
$('.victory').hide();
$('.results').show();
$('.' + bearname).hide();
$('.fight').addClass('hidden');
$('.victory').removeClass('.hidden');
$('#' + protagonist).hide();
}

function renderFight(protagonist) {
  $('.character-container').hide();
  $('.fight').removeClass('hidden');
  $('.' + bearname).show();
}

$(document).ready(function() {
    $('.choose').on('click', function(evt) {
    bearname = $(this).parent().attr('href').slice(1);
      if (bearname === 'bedtime') {
        protagonist = bedtimebear;
        enemy.foe = bedtimebear;
        $('.bedtime').removeClass('hidden');
      } else if (bearname === 'grumpy') {
        protagonist = grumpybear;
        enemy.foe = grumpybear;
        $('.grumpy').removeClass('hidden');
      } else if (bearname === 'luck') {
        protagonist = luckbear;
        enemy.foe = luckbear;
        $('.luck').removeClass('hidden');
      } else if (bearname === 'cheer') {
        protagonist = cheerbear;
        enemy.foe = cheerbear;
        $('.cheer').removeClass('hidden');
      }
    renderFight();
    });

    $('.new-game').on('click', function(evt){
      $('.character-container').show();
      $('.results').hide();
      healthReset();
    });

    $('.attack').on('click', function () {
      protagonist.bothAttack();
    });

    $('.special').on('click', function () {
      protagonist.special();
    });

  });


var enemy;
var protagonist;
var roundNum = 0;
var heroSpecialCount = {
  effectCount: 0,
  cooldownCount: 0
};
// var villainSpecialCount = {
//   effectCount: 0,
//   cooldownCount: 0
// };

function Character() {
  this.health = 4;
  this.attackPwr = 1;
  this.accuracy = 0.5;
  this.alive = true;
  this.turn = true;
}

Character.prototype.basicAttack = function () {
  if (Math.random()<this.accuracy) {
    console.log('Hit!');
    this.foe.health--;
  } else {
    console.log('Miss!');
  }
  if (this.foe.health === 0){
    if (this.foe === protagonist) {
      console.log('Defeat!');
      // renderDefeat();
      renderDefeat();
    } else if (this.foe === enemy) {
      console.log('Victory!');
      // renderVictory();
      renderVictory();
    }
  }
  // var self = this;
  roundCount(this);
  console.log(this);
};

function Hero() {
  Character.apply(this, arguments);
  this.foe = enemy;
  this.bothAttack = function () {
    this.basicAttack();
    this.foe.basicAttack();
  };
}
function Villain() {
  Character.apply(this, arguments);
  this.foe = protagonist;
  this.turn = false;
}
Hero.prototype = Object.create(Character.prototype);
Hero.prototype.constructor = Hero;
Villain.prototype = Object.create(Character.prototype);
Villain.prototype.constructor = Villain;

function roundCount (char){
  if (heroSpecialCount.effectCount !== 0) {
    heroSpecialCount.effectCount--;
  }
  if (heroSpecialCount.cooldownCount !== 0) {
    heroSpecialCount.cooldownCount--;
  // } else if (villainSpecialCount.effectCount !== 0) {
  //   villainSpecialCount.effectCount--;
  // } else if (villainSpecialCount.cooldownCount !== 0) {
  //   villainSpecialCount.cooldownCount--;
  // } else if (villainSpecialCount.effectCount === 0) {
      // villainAbilityReset();
  }
  if (heroSpecialCount.effectCount === 0) {
    if (protagonist === grumpybear) {
      villainAbilityReset();
    } else {
      heroAbilityReset();
    }
  }
  healthRender();
  roundNum++;
  // console.log(this);
  char.turn = false;
  char.foe.turn = true;
}

function heroAbilityReset() {
  protagonist.attackPwr = 1;
  protagonist.accuracy = 0.5;
}

function villainAbilityReset() {
enemy.attackPwr = 1;
enemy.accuracy = 0.5;
}

function healthReset() {
  protagonist.health = 4;
  enemy.health = 4;
  $('.enemy-health').removeClass('hidden');
  $('.protagonist-health').removeClass('hidden');
  heroAbilityReset();
  villainAbilityReset();
}

function healthRender() {
  console.log('prot health', protagonist.health);
  console.log('enemy health', enemy.health);
  if (protagonist.health === 3) {
    $('.protagonist-health-4').addClass('hidden');
  }
  if (protagonist.health === 2) {
    $('.protagonist-health-3').addClass('hidden');
    $('.protagonist-health-4').addClass('hidden');
  }
  if (protagonist.health === 1) {
    $('.protagonist-health-2').addClass('hidden');
    $('.protagonist-health-3').addClass('hidden');
    $('.protagonist-health-4').addClass('hidden');
  }

  if (enemy.health === 3) {
    $('.enemy-health-4').addClass('hidden');
  }
  if (enemy.health === 2) {
    $('.enemy-health-3').addClass('hidden');
    $('.enemy-health-4').addClass('hidden');
  }
  if (enemy.health === 1) {
    $('.enemy-health-2').addClass('hidden');
    $('.enemy-health-3').addClass('hidden');
    $('.enemy-health-4').addClass('hidden');
  }
}

function heroSpecial(that) {
  if (protagonist!==bedtimebear || heroSpecialCount.effectCount!==0) {
  heroSpecialCount.effectCount = 6;
  heroSpecialCount.cooldownCount = 10;
  enemy.basicAttack();
} else if (protagonist===bedtimebear) {
    protagonist.basicAttack();
    protagonist.turn = true;
    heroSpecialCount.cooldownCount = 10;
  }
  roundCount(that);
}

// function villainSpecial() {
//   villainSpecialCount.effectCount = 2;
//   villainSpecialCount.cooldownCount = 5;
//   roundCount();
// }

var professorColdheart = new Villain();

//eventually this might be established by a click
enemy = professorColdheart;


// professorColdheart.special = function () {
//   if (heroSpecialCount.cooldownCount === 0) {
//   heroSpecial();
//   // protagonist.turn = true;
//   // enemy.turn = false;
//   console.log('Special ability activated!');
// } else {
//   console.log('Special not available yet!');
// }
// };

var luckbear = new Hero();

luckbear.special = function () {
if (heroSpecialCount.cooldownCount === 0) {
  this.accuracy = 0.75;
  heroSpecial(this);
  console.log('Special ability activated!');
} else {
  console.log('Special not available yet!');
}
};

var bedtimebear = new Hero();

bedtimebear.special = function () {
  if (heroSpecialCount.cooldownCount === 0) {
  heroSpecial(this);
  // protagonist.turn = true;
  // enemy.turn = false;
  console.log('Special ability activated!');
} else {
  console.log('Special not available yet!');
}
};

var cheerbear = new Hero();

cheerbear.special = function () {
  if (heroSpecialCount.cooldownCount === 0) {
  this.attackPwr = 2;
  heroSpecial(this);
  console.log('Special ability activated!');
} else {
  console.log('Special not available yet!');
}
};

var grumpybear = new Hero();

grumpybear.special = function () {
  if (heroSpecialCount.cooldownCount === 0) {
  enemy.accuracy = 0.25;
  heroSpecial(this);
  console.log('Special ability activated!');
} else {
  console.log('Special not available yet!');
}
};








if (enemy.turn === true) {
  enemy.basicAttack();
}




//
