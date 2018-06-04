$(document).ready(function() {

  var $ball = $("#ball");
  var paddle;
  var firebrick;
  var $gameScreen = $("#gameScreen");
  var lives = 3;
  var score = 0;

  var interval;
  var timeRunning = false;

  var posX = 0;
  var posY = 0;

  var directionX = "+";
  var directionY = "+";

  $("#btn").click(function(){

    if (timeRunning == "true") {
      clearInterval(interval)
      timeRunning = !timeRunning;
    } else {
      interval = setInterval(function () {
        var ballLeft = $ball.offset.left;
        var balltop = $ball.offset.top;

        if (directionX === "+") {
          $ball.css({'left': posX + "px"});
          posX += 1;
        }
        else if (directionX === "-") {
          $ball.css({"left" : posX + "px"});
          posX -= 1;
        }
        if (directionY === "+") {
          $ball.css({'top': posY + "px"});
          posY += 1;
        }
        else if (directionY === "-") {
          $ball.css({"top" : posY + "px"});
          posY -= 1;
        }

        timeRunning = !timeRunning;

      }, 10);
    }

  })

})
