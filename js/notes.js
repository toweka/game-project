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

  // making multiple bricks
  var brickPositonLeft = -50;
  var brickPositonTop = 20;

  createBrickField();
  createBrickField1();
  createBrickField2();


  // var offset = $ball.offset;

  $("#startBtn").click(function(){

    //Score being entered into the hmtl doc
    $("#score").html(score);
    $("#lives").html(lives);
    timeRunning = false;

    ballStartPosition();

    //initiates game
    interval = setInterval(function () {
      winner();

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

      var brickLeft;
      var brickTop;
      var brickRight;
      var brickBottom;

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
      if(ballTop >= paddleTop && lives >= 0) {
        continue1();
        lives -= 1;
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
      for (var i = 0; i < $('.brick').length; i++) {
        collisonDetection($("#"+i), i);
      }

      if (lives < 0) {
        gameOver();
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
    clearInterval(interval);
    score = 0;
  })

  $("#resetBtn").click(function(){
    $(".brick").remove();
    $("#startBtn").html("Start");
    $('#resetBtn').css({display : "none"});
    score = 0;
    lives = 3;
    brickPositonLeft = -50;
    brickPositonTop = 20;
    createBrickField();
    createBrickField1();
    createBrickField2();
    clearInterval(interval);
  })

  $(".continue").click(function(){
    $('#lostLife').css({display : "none"});
    $("#startBtn").html("Restart");
  })

  function gameOver() {
    clearInterval(interval);
    $('#gameOverModal').css({display : "block"});
  }

  function continue1() {
    $('#lostLife').css({display : "block"});
    $('#resetBtn').css({display : "inline-block"});
    clearInterval(interval);
    ballStartPosition();
  }

  function collisonDetection($this, i) {
   brickLeft = $this.offset().left;
   brickTop = $this.offset().top;
   brickRight =  brickLeft + $this.outerWidth();
   brickBottom =  brickTop + $this.outerHeight();

   var ballLeft = $ball.offset().left;
   var ballTop = $ball.offset().top;
   var ballRight = ballLeft + $ball.outerWidth();
   var ballBottom = ballTop + $ball.outerHeight();

   if (ballTop <= brickBottom && ballLeft <= brickRight && ballRight >= brickLeft) {
     brickCollisionBottom($("#"+i), i);
   }
  }

  function brickCollisionBottom($this, i) {
    $('#'+i).css({display: "none"});
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
    if (score >= 210) {
      $('#winner').css({display : "block"});
    }
  }

  function createBrickField() {
    for (var i = 0; i < 7; i++) {
      jQuery('<div/>', {
        id: i,
        class: 'brick '+i,
      }).appendTo('#gameScreen');
      brickPositonLeft += 60;
      $("#"+i).css({
        left: brickPositonLeft + "px",
      });
    }
  }

  function createBrickField1(){
    for (var i = 7; i < 14; i++) {
      jQuery('<div/>', {
        id: i,
        class: 'brick '+i,
      }).appendTo('#gameScreen');
      brickPositonLeft += 60;
      $("#"+i).css({
        left: (brickPositonLeft - 420) + "px",
        top: brickPositonTop + "px",
      });
    }
  }

  function createBrickField2(){
    for (var i = 14; i < 21; i++) {
      jQuery('<div/>', {
        id: i,
        class: 'brick '+i,
      }).appendTo('#gameScreen');
      brickPositonLeft += 60;
      $("#"+i).css({
        left: (brickPositonLeft - 840) + "px",
        top: (brickPositonTop + 20) + "px",
      });
    }
  }

})
