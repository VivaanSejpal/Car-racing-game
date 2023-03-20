/*
C-36 Multiplayer Car racing game

Developer:

Topics: REALTIME DATABASE, CRUD- CREATE READ UPDATE DELETE

C36 - Goals:
● Create a form to log the players' names in the game.
● Create a Database Structure and connect with the game.
● Use OOPs programming style.

C37 - Gials:
● Update player count in the database.
● Change game state.
● Create player sprites.

C39 - Goals: 
● Add a track in the background.
● Replace the car sprites with images of real cars.
● Write a condition to end the gameObj.

*/

/* READ READ READ READ

CRUD - CREATING READING UPDATING DELETING

.ref() is used to refer to the location of the
database value(field) we care about.

.on() creates a listener which keeps
listening to the changes in the database.

.set() is used to set the value in the
database



READ READ READ READ */

//Declare variables for gameObj objects and behaviour indicators(FLAGS)
var canvas, backgroundImage;
var databaseOBJ;

var formObj;
var gameObj, gameState;
var playerObj, playerCount, allPlayers;

var carsAtFinishLine;

var car1, car2, car3, car4, cars;
var startbg, endImage, track, car1_img, car2_img, car3_img, car4_img;
var fuels, powerCoins, obstacles;

var fuelImage, powerCoinImage, lifeImage;
var obstacle1Image, obstacle2Image;
var blastImage;

//Create Media library and load to use it during the course of the software
//executed only once at the start of the program
function preload() {
  backgroundImage = loadImage("./assets/background.png");
  car1_img = loadImage("../assets/car1.png");
  car2_img = loadImage("../assets/car2.png");
  track = loadImage("../assets/track.jpg");
  
  fuelImage = loadImage("./assets/fuel.png");
  powerCoinImage = loadImage("./assets/goldCoin.png");
  obstacle1Image = loadImage("./assets/obstacle1.png");
  obstacle2Image = loadImage("./assets/obstacle2.png");
  lifeImage = loadImage("./assets/life.png");
  blastImage = loadImage("./assets/explosion.png");

}

//define the initial environment of the software(before it is used)
//by defining the declared variables with default values

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  //initialize the database
  databaseOBJ = firebase.database();

  gameObj = new Game();

  gameState = 0; //0=WAIT, 1=PLAY, 2=END

  //function call to READ/RETRIEVE/GET existing value of gameState from database
  gameObj.getState();

  //function call to start the GAME i.e. gameState will activate  0 WAIT state
  gameObj.start();
}

//All modifications, changes, conditions, manipulations, actionscommands to be executed and checked, continuously or applied throughout the program are written inside function draw.
//function draw is executed for every frame created since the start of the program.
function draw() {
  background(backgroundImage);

  text(mouseX + "," + mouseY, mouseX, mouseY);
  //conditions for GAMESTATE to change from 0 to 1 to 2
  if (playerCount === 2) {
    
    /*
      function call to change existing value of gameState to a 
      new one based on the value of paramter passed in the database
    */
    gameObj.updateState(1);
  }

  if (gameState === 1) {
    clear();
    /*
      function call to activate the gameObj to START 1 mode and 
      aligned all players to starting positions at the start line
    */
    gameObj.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
