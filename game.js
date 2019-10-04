var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

// the starting files...
var started = false;

// maintains the level number on your screen...
var level = 0;

// start the game when a key is pressed in the keyboard
try {
  $(document).keydown(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
} finally {
  $(document).click(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
}

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  // response to users click...
  animatePress(userChosenColor);
  playSound(userChosenColor);

  // console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // executes when the user answers wrong...
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // TODO: to restart the game with any keypress instead of refreshing
    $("#level-title").text("Game Over, Refresh to Play Again");
    startOver();
  }
}

function nextSequence() {
  // reset the userclickedpattern for an empty array
  userClickedPattern = [];

  // increase the level one more each time, function is called...
  level++;

  // show the level inplace of h1 element
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  // $("#" + currentColor).addClass("pressed").delay(100).removeClass("pressed");

  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  // reset the values of gamePattern, started, level
  var started = false;
  var level = 0;
  var gamePattern = [];
}
