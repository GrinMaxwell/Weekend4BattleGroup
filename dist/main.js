var protagonist;

function renderVictory() {
$('.victory').removeClass(hidden);
$('#' + protagonist).hide();
}

function renderDefeat() {
$('.defeat').removeClass(hidden);
$('#' + protagonist).hide();
}

function renderFight(protagonist) {
  $('.character-container').hide();
  $('#' + protagonist).show();
}

$(document).ready(function() {
    $('.choose').on('click', function(evt) {
    protagonist = $(this).parent().attr('href').slice(1);
    renderFight();
    console.log(protagonist);
    });

    $('.new-game').on('click', function(evt){
      $('.character-container').show();
      $('.results').hide();
    });
  });
