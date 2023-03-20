/*
    ● Game object  should be able to hold the state of the game. 
    It should be able to display form when the game state is 0(WAIT) 
    or the game when the game state is 1(PLAY) or 
    leaderboard when the game state is 2(END).
    ● GAMESTATES: 0 WAIT 1 START 2 END
*/

class Game {
  /*   
    writing code to create objects even though the blueprint/CONSTRUCTOR isn't
    defined yet. This is called writing code using abstraction 
  */
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetBtn = createButton("");

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.playerMoving = false;
    this.leftKeyActive = false;
    this.blast = false;
  }

  /*
    function definition to get/read/retrieve existing value of gameState from database
  */
  getState() {
    var gameStateRef = databaseOBJ.ref("GAMESTATE");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  /*
    function definition to change existing value of gameState to a 
    new one based on the value of paramter passed in the database
  */
  updateState(newValueInput) {
    // var gameStateRef = databaseOBJ.ref("GAMESTATE");
    // gameStateRef.update({
    //   GAMESTATE: newValueInput,
    // });
    databaseOBJ.ref("/").update({
      GAMESTATE: newValueInput,
    });
  }

  start() {
    playerObj = new Player();
    playerCount = playerObj.getCount();

    formObj = new Form();
    formObj.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.05;
    car1.addImage("blastImage", blastImage);

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.05;
    car2.addImage("blastImage", blastImage);
    cars = [car1, car2];

    fuels = new Group();
    powerCoins = new Group();

    obstacles = new Group();

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
      { x: width / 2, y: height - 5300, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Image },
    ];

    // Adding fuel sprite in the game
    this.addSprites(fuels, 4, fuelImage, 0.02);

    // Adding coin sprite in the game
    this.addSprites(powerCoins, 18, powerCoinImage, 0.09);

    //Adding obstacles sprite in the game
    this.addSprites(
      obstacles,
      obstaclesPositions.length,
      obstacle1Image,
      0.04,
      obstaclesPositions
    );
  }

  //function definition to add sprite object to a group
  // it is added only after the sprite object is created fully
  // and has been applied full modifications such as image, velocity, scale, position, etc
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
    /* In this loop, i variable = 0 and if i is less than the number of sprites in 
    the group then the game should add another i. Everytime the loop repeats it creates a new sprite, 
    gives it a random x and y, gives it the animation or picture, stes the scale and then adds it to the
    group that we have created. The loop function will repeat as long as the given condition is true.
    Basically it gives the sprites the properties and makes a new sprite which is part of the group.*/

    for (var i = 0; i < numberOfSprites; i++) {
      /* This command is for the condition that is given in order for the loop to work.
      The loop will only work as long as this condition is true and if it is not true the functions wont
      take place and a new sprite wont be created.*/
      var newX, newY;

      //
      if (positions.length > 0) {
        /* this line is saying that if the length of the x and y positions is more than 0 the 
        commands bellow will be executed*/

        newX = positions[i].x;
        /*This command is there to create a new x position for every new sprite that is created.*/

        newY = positions[i].y;
        /*This command is there to create a new y position for every new sprite that is created.*/

        spriteImage = positions[i].image;
      } else {
        //
        newX = random(width / 2 + 150, width / 2 - 150);
        //
        newY = random(-height * 4.5, height - 400);
      }
      //
      var sprite = createSprite(newX, newY);
      /* this command is to create a new sprite with a random x and y everytime the condition for the
      loop is true.*/
      sprite.addImage("sprite", spriteImage);

      //
      sprite.scale = scale;
      //
      spriteGroup.add(sprite);
    }
  }

  handleResetBtn() {
    this.resetBtn.mousePressed(() => {
      databaseOBJ.ref("/").set({
        PLAYERCOUNT: 0,
        GAMESTATE: 0,
        CARSATEND: 0,
        PLAYERS: {},
      });
      window.location.reload();
    });
  }
  handleElements() {
    formObj.hide();
    formObj.titleImg.position(40, 50);
    formObj.titleImg.class("gameTitleAfterEffect");

    //C39
    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetBtn.class("resetButton");
    this.resetBtn.position(width / 2 + 230, 100);

    this.leadeboardTitle.html("Leaderboard");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }

  showLife() {
    push();
    image(
      lifeImage,
      width / 2 - 130,
      height - playerObj.positionY - 400,
      20,
      20
    );
    fill("white");
    rect(width / 2 - 100, height - playerObj.positionY - 400, 185, 20);
    fill("#f50057");
    rect(
      width / 2 - 100,
      height - playerObj.positionY - 400,
      playerObj.life,
      20
    );
    noStroke();
    pop();
  }

  showFuelBar() {
    push();
    image(
      fuelImage,
      width / 2 - 130,
      height - playerObj.positionY - 350,
      20,
      20
    );
    fill("white");
    rect(width / 2 - 100, height - playerObj.positionY - 350, 185, 20);
    fill("#ffc400");
    rect(
      width / 2 - 100,
      height - playerObj.positionY - 350,
      playerObj.fuel,
      20
    );
    noStroke();
    pop();
  }

  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].RANK === 0 && players[1].RANK === 0) |
      (players[0].RANK === 1)
    ) {
      // &emsp;    This tag is used for displaying four spaces.
      leader1 =
        players[0].RANK +
        "&emsp;" +
        players[0].NAME +
        "&emsp;" +
        players[0].SCORE;

      leader2 =
        players[1].RANK +
        "&emsp;" +
        players[1].NAME +
        "&emsp;" +
        players[1].SCORE;
    }

    if (players[1].RANK === 1) {
      leader1 =
        players[1].RANK +
        "&emsp;" +
        players[1].NAME +
        "&emsp;" +
        players[1].SCORE;

      leader2 =
        players[0].RANK +
        "&emsp;" +
        players[0].NAME +
        "&emsp;" +
        players[0].SCORE;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  /*
    function defintion to activate the gameObj to START 1 mode and 
    aligned all players to starting positions at the start line
  */
  play() {
    this.handleElements();
    this.handleResetBtn();
    /*
      static function call to retrieve existing playerObj records: name and distance 
      value for all registered players according to the index in the database  
    */
    Player.getPlayersInfo();

    /*
      function call to retrieve existing value of CarsAtEnd from database
    */
    playerObj.getCarsAtEnd();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      this.showFuelBar();
      this.showLife();
      this.showLeaderboard();

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;
        //use data form the database to display the cars in x and y direction
        var calculatedX = allPlayers[plr].POSITIONX;
        var calculatedY = height - allPlayers[plr].POSITIONY;

        // console.log("calculatedX: " + calculatedX);
        // console.log("calculatedY " + calculatedY);

        // console.log(
        //   " cars[index - 1].position.x: " + cars[index - 1].position.x
        // );
        // console.log(
        //   " cars[index - 1].position.y: " + cars[index - 1].position.y
        // );

        cars[index - 1].position.x = calculatedX;
        cars[index - 1].position.y = calculatedY;

        //console.log(allPlayers[plr].LIFE);
        var currentLife = allPlayers[plr].LIFE;

        if (currentLife <= 0) {
          //console.log(allPlayers[plr].LIFE);
          cars[index - 1].changeImage("blastImage", blastImage);
        }

        if (index === playerObj.index) {
          stroke(10);
          fill("lightpink");
          ellipse(calculatedX, calculatedY, 90, 90);

          this.handleFuel(index);
          this.handlePowerCoins(index);
          this.handleCarACollisionWithCarB(index);
          this.handleObstacleCollision(index);

          if (playerObj.life <= 0) {
            this.blast = true;
            this.playerMoving = false;
          }
          // Changing camera position in y direction
          camera.position.x = cars[index - 1].position.x;
          camera.position.y = cars[index - 1].position.y;
        }
      }
      if (this.playerMoving) {
        playerObj.positionY += 5;
        playerObj.updatePlayerInfo();
      }

      // handling keyboard events
      this.handlePlayerControls();
      //Creating finish line
      const finishLine = height * 6 - 100;

      if (playerObj.positionY > finishLine) {
        gameState = 2;
        playerObj.rank += 1;
        Player.updateCarsAtEnd(playerObj.rank);
        playerObj.updatePlayerInfo();
        this.showRank();
      }
      drawSprites();
    }
  }

  handlePlayerControls() {
    //handling keyboard events
    if (keyIsDown(UP_ARROW)) {
      playerObj.positionY += 10;
      playerObj.updatePlayerInfo();
    }
    if (keyIsDown(RIGHT_ARROW) && playerObj.positionX < width / 2 + 300) {
      this.leftKeyActive = false;
      playerObj.positionX += 5;
      playerObj.updatePlayerInfo();
    }
    if (keyIsDown(LEFT_ARROW) && playerObj.positionX > width / 3 - 50) {
      this.leftKeyActive = true;
      playerObj.positionX -= 5;
      playerObj.updatePlayerInfo();
    }
  }

  handleFuel(index) {
    // Adding fuel
    cars[index - 1].overlap(fuels, function (collector, collected) {
      playerObj.fuel = 185;
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
    });

    // Reducing Player car fuel
    if (playerObj.fuel > 0 && this.playerMoving) {
      playerObj.fuel -= 0.3;
    }

    if (playerObj.fuel <= 0) {
      gameState = 2;
      this.gameOver();
    }
  }

  handlePowerCoins(index) {
    cars[index - 1].overlap(powerCoins, function (collector, collected) {
      playerObj.score += 21;
      playerObj.updatePlayerInfo();
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
    });
  }

  handleObstacleCollision(index) {
    if (cars[index - 1].collide(obstacles)) {
      if (this.leftKeyActive) {
        playerObj.positionX += 100;
      } else {
        playerObj.positionX -= 100;
      }

      //Reducing Player Life
      if (playerObj.life > 0) {
        playerObj.life -= 185 / 4;
      }

      playerObj.updatePlayerInfo();
    }
  }

  handleCarACollisionWithCarB(index) {
    if (index === 1) {
      if (cars[index - 1].collide(cars[1])) {
        if (this.leftKeyActive) {
          playerObj.positionX += 100;
        } else {
          playerObj.positionX -= 100;
        }

        //Reducing Player Life
        if (playerObj.life > 0) {
          playerObj.life -= 185 / 4;
        }

        playerObj.updatePlayerInfo();
      }
    }
    if (index === 2) {
      if (cars[index - 1].collide(cars[0])) {
        if (this.leftKeyActive) {
          playerObj.positionX += 100;
        } else {
          playerObj.positionX -= 100;
        }

        //Reducing Player Life
        if (playerObj.life > 0) {
          playerObj.life -= 185 / 4;
        }

        playerObj.updatePlayerInfo();
      }
    }
  }

  showRank() {
    swal({
      title: `Awesome!${"\n"}Rank${"\n"}${playerObj.rank}`,
      text: "You reached the finish line successfully",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok",
    });
  }

  gameOver() {
    swal({
      title: `GAME OVER !!`,
      text: "Ooops you lost the race !!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing",
    });
  }
}
