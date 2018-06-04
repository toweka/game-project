$(document).ready(function() {

  var $ball = $("#ball");
  var $paddle = $("#paddle");
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


  // var offset = $ball.offset;

  $("#btn").click(function(){

    if (timeRunning == "true") {
      // reset the ball to original position and set timeRunning to false
      clearInterval(interval)
      timeRunning = !timeRunning;
    } else {
      interval = setInterval(function () {

      //Defining the relative positions of the ball and gamescreen
        var ballLeft = $ball.offset().left;
        var ballTop = $ball.offset().top;
        var ballRight = ballLeft + $ball.outerWidth();
        var ballBottom = ballTop + $ball.outerHeight();

        var gsLeft = $gameScreen.offset().left;
        var gsTop = $gameScreen.offset().top;
        var gsRight = gsLeft + $gameScreen.outerWidth();
        var gsBottom = gsTop + $gameScreen.outerHeight();

        var paddleLeft = $paddle.offset().left;
        var paddleTop = $paddle.offset().top;
        var paddleRight = paddleLeft + $paddle.outerWidth();
        var paddleBottom = paddleTop + $paddle.outerHeight();


        // sets direction of movement
        if (directionX === "+") {
          $ball.css({'left': posX + "px"});
          // sets the number of pixels the ball moves per set time interval
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

        if (ballBottom >= gsBottom) {
          directionY = '-';
        }  else if (ballRight >= gsRight) {
          directionX = "-";
        } else if (ballLeft <= gsLeft) {
          directionX = "+";
        } else if (ballTop <= gsTop) {
          directionY = "+";
        }

        $gameScreen.mouseenter(function(e){
          $(document).bind('mousemove', function(e){
            $("#paddle").css({
              left:  e.pageX - gsLeft - 35,
            });
          });
        })
        $gameScreen.mouseleave(function(e){
          $(document).unbind()
        });


        // if (paddleLeft >= gsLeft || paddleRight <= gsRight)
        // {
        //   $(document).bind('mousemove', function(e){
        //     $("#paddle").css({
        //       left:  e.pageX - gsLeft,
        //     });
        //   });
        // } else {
        //   $(document).unbind('mousemove');
        // }

      }, 10);
      timeRunning = !timeRunning;
    }

  })


})
