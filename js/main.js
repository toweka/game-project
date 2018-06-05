$(document).ready(function() {

  var $ball = $("#ball");
  var $paddle = $("#paddle");
  var $brick = $(".brick");
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

    // making multiple bricks
    // var brickPositonLeft = -50;
    //
    // for (var i = 0; i < 7; i++) {
    //   brick = document.createElement("div");
    //   brick.className = "brick";
    //   brickPositonLeft += 60;
    //   brick.style.left = brickPositonLeft + "px";
    //   // brick.style.top = 10 + "px";
    //   document.body.children[0].children[3].appendChild(brick);
    // }

    $brick = $(".brick")

    lives = 3;
    score = 0;
    //Score being entered into the hmtl doc
    $("#score").html(score);
    $("#lives").html(lives);
    timeRunning = false;

    ballStartPosition();

       //initiates game
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

      var brickLeft = $brick.offset().left;
      var brickTop = $brick.offset().top;
      var brickRight = brickLeft + $brick.outerWidth();
      var brickBottom = brickTop + $brick.outerHeight();
      // var paddleX = ($gameScreen.outerWidth - $paddle.outerWidth)/2;
      // var paddleWidth = paddleRight - paddleLeft;
      //
      // var x = $gameScreen.outerWidth / 2;
      // var y = $gameScreen.outerHeight - 20;

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

      //Collision function for paddle and ball
      if (ballLeft <= paddleRight && ballRight >= paddleLeft && ballTop+10 >= paddleTop){
          directionY = '-';
      }
      //game over function
      if(ballTop >= paddleTop) {
        gameOver();
      }
        //Collision function for ball and walls
      if (ballRight >= gsRight) {
        directionX = "-";
      } else if (ballLeft <= gsLeft) {
        directionX = "+";
      } else if (ballTop <= gsTop) {
        directionY = "+";
      }

      // collison with brick
      if (ballTop <= brickBottom && ballLeft <= brickRight && ballRight >= brickLeft) {
        brickCollision();
        winner();
      }

      //paddle movement function w/ mouse
      $gameScreen.mouseenter(function(e){
        $(document).bind('mousemove', function(e){
          $("#paddle").css({left:  e.pageX - gsLeft - 35});
        });
      })
      //unbind move function when out of screen
      $gameScreen.mouseleave(function(e){
        $(document).unbind()
      });

    }, 1);
    timeRunning = !timeRunning;


  })

  //reset button for the modal
  $(".tryagainBtn").click(function(){
    $('#gameOverModal').css({display : "none"});
    $('#winner').css({display : "none"});
    ballStartPosition();
  })

  function gameOver() {
    clearInterval(interval);
    $('#gameOverModal').css({display : "block"});
    $brick.css({ display: "block"});
  }

  function brickCollision() {
    $brick.css({display: "none"});
    directionY = "+";
    score += 10;
    $("#score").html(score);
  }

  function ballStartPosition() {
    posX = ($paddle.offset().left - 375) + $paddle.outerWidth()/2;
    posY = 360;
    directionX = "+";
    directionY = "+";
    $ball.css({'left': posX + "px"});
    $ball.css({"top" : posY + "px"});
  }

  function winner() {
    if (score >= 10) {
      $('#winner').css({display : "block"});
    }
  }

})
