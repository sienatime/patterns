var MINIMUM_COLOR = 0;
var MAXIMUM_COLOR = 255;

$(document).ready(function() {
  $('#toggleLight').text('Switch to Dark');

  $('#toggleLight').click(function() {
    var body = $('body');
    if (body.css('background-color') === 'rgb(0, 0, 0)') {
      setBackgroundColor(body, MAXIMUM_COLOR, MAXIMUM_COLOR, MAXIMUM_COLOR);
      $(this).text('Switch to Dark');
    } else {
      setBackgroundColor(body, MINIMUM_COLOR, MINIMUM_COLOR, MINIMUM_COLOR);
      $(this).text('Switch to Light');
    }
  });

  $('#regenerateColors').click(generateColors);
  generateColors();
});

function generateColors() {
  $('#grid-container').empty();
  $('<div class="color-box-container"></div>').appendTo('#grid-container');

  var randomRed = getRandomIntInclusive();
  var randomGreen = getRandomIntInclusive();
  var randomBlue = getRandomIntInclusive();

  var NUMBER_OF_COLORS = 4;

  var tetradicColors = new TetradicColors(randomRed, randomGreen, randomBlue, NUMBER_OF_COLORS);

  for (var i = 0; i < NUMBER_OF_COLORS; i++) {
    var box = $('<div class="color-box"></div>').appendTo('.color-box-container');
    var rgb = tetradicColors.colors[i];
    setBackgroundColor(box, rgb.red, rgb.green, rgb.blue);
  }

  var grid = $('.color-box-container');
  grid.css('opacity', 0.33);

  for (var i = 0; i < 50; i++) {
    grid.clone().appendTo('#grid-container');
  }
}

function setBackgroundColor(element, red, green, blue) {
  element.css('background-color', 'rgb(' + red + ',' + green + ',' + blue +')');
}

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive() {
  min = MINIMUM_COLOR;
  max = MAXIMUM_COLOR;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var RedGreenBlue = function(red, green, blue) {
  this.red = red;
  this.green = green;
  this.blue = blue;
}

var TetradicColors = function(initialRed, initialGreen, initialBlue, numberOfColors) {
  this.rgb = new RedGreenBlue(initialRed, initialGreen, initialBlue);
  this.colors = [];
  for (var i = 0; i < numberOfColors; i++) {
    this.colors.push(this.shift());
  }
}

TetradicColors.prototype.shift = function() {
  var TETRADIC = Math.round(MAXIMUM_COLOR/4);
  var newColors = new RedGreenBlue(
    this.addColor(this.rgb.red, TETRADIC),
    this.addColor(this.rgb.green, TETRADIC),
    this.addColor(this.rgb.blue, TETRADIC)
  );
  this.rgb = newColors;
  return newColors;
}

TetradicColors.prototype.addColor = function(color, increase) {
  var initial = color + increase;
  if (initial <= MAXIMUM_COLOR) {
    return initial;
  } else {
    return initial - MAXIMUM_COLOR;
  }
}
