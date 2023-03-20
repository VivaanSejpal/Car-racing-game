//Class 3: Conditional Programming with SPRITES

//delcare variables for game objects
var ball;
var brick;
var paddle;


var BRICK_WIDTH;
var BRICK_HEIGHT;
var BRICK_MARGIN;
function setup() {
  //assign the sprite object to the declare variable
  ball = createSprite(100, 100, 20, 20); //create sprite object
  ball.setAnimation("volleyball2_1"); //set animation to sprite object
  ball.scale = 0.05; //adjust the scale according to the display

  ball.velocityX = 0;
  ball.velocityY = 0;

   paddle = createSprite(200, 350, 120, 10);

  BRICK_WIDTH = 50;
  BRICK_HEIGHT = 25;
  BRICK_MARGIN = 4;

  
  //create sprites around the canvas like a compound
  createEdgeSprites();
}
function draw() {
  //add color to background to avoid multiple objects to be displayed
  background("white");

  //move the paddle witht he mouse horizontally
  paddle.x = World.mouseX;

  /*
    conditions on the value of horizontal position of paddle
  */
  if (paddle.x < 60) {
    paddle.x = 60;
  } else if (paddle.x > 340) {
    paddle.x = 340;
  }

  /*
     apply a nested(double) loopto increase the horizontal position (hp) and
     vertical position (vp) of brick sprite objects, so that hey will placed 
     one after the other in the specified positions
  */
  for (var r = 0; r < 4; r++) {
    for (var c = 0; c < 6; c++) {
       brick = createSprite(
        65 + c * (BRICK_WIDTH + BRICK_MARGIN),
        80 + r * (BRICK_HEIGHT + BRICK_MARGIN),
        BRICK_WIDTH,
        BRICK_HEIGHT
      );
      brick.shapeColor = color(255, 0, 0);
    }
  }
  /*
    ball will be bounced off the topEdge and bottom edge
    only source will bounce target remains same 
    source = ball
    target = edges
  */
  ball.bounceOff(topEdge);
  ball.bounceOff(leftEdge);
  ball.bounceOff(rightEdge);
  ball.bounceOff(paddle);

  //display Sprites
  drawSprites();
}

/*
function defnition to give velocity to ball when mouse button is pressed
This is PREDEFINED FUNCTION. It does NOT need to be CALLED separeately.
It is triggered when the mouse button is clicked on its own
*/
function mousePressed() {
  ball.velocityX = 4;
  ball.velocityY = 3;
}
