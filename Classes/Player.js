/*
    ● A new player object should be created every time a new user logs in. It should contain all the information
    about the player - name, position in the game etc. 
    
    ● For now it can just have the name property. It
    should also be able to read and write player
    -> databaseReference.on() creates a listener which keeps listening to the
    gameState from the database. When the gameState is changed in
    the database, the function passed as an argument to it is executed.
  
    Note: Here the function is directly written inside the .on() listener.
  
    -> databaseReference.update() will update the database reference.
    Here "/" refers to the main database inside which gameState is created.
  
    writing code to create objects even though the blueprint/ CLASS isn't
    defined yet. This is called writing code using abstraction.
*/
class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0;
    this.fuel = 185;
    this.life = 185;
    this.score = 0;
  }

  addPlayer() {
    var playerIndex = "PLAYERS/PLAYER" + this.index;

    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    databaseOBJ.ref(playerIndex).set({
      NAME: this.name,
      POSITIONX: this.positionX,
      POSITIONY: this.positionY,
      RANK: this.rank, 
      SCORE: this.score,
      LIFE: this.life
    });
  }
  /*
    function definition to retrieve existing value of playerCount from database
  */
  getCount() {
    var playerCountRef = databaseOBJ.ref("PLAYERCOUNT");
    playerCountRef.on("value", (data) => {
      playerCount = data.val();
    });
  }
  /*
    function definition to change existing value of playerCount to a 
    new one based on the value of paramter passed in the database
  */
  updateCount(count) {
    databaseOBJ.ref("/").update({
      PLAYERCOUNT: count,
    });
  }

  /*
    function definition to get/read/retrieve existing value of carsAtEnd from database
  */
  getCarsAtEnd() {
    var carsAtFinishLineRef = databaseOBJ.ref("CARSATEND");
    carsAtFinishLineRef.on("value", function (data) {
      carsAtFinishLine = data.val();
    });
  }

  /*
    function definition to change existing value of carsAtFinishLine to a 
    new one based on the value of paramter passed in the database
  */
  static updateCarsAtEnd(newValueInput) {
    var carsAtFinishLineRef = databaseOBJ.ref("/");
    carsAtFinishLineRef.update({
      CARSATEND: newValueInput,
    });
  }

  /*
    Static functions are those common functions which are called by the
    class themselves rather than by objects of the class. We use the
    'static' keyword before the function to make it a static function. 
  
    function definition to retrieve existing players records: name and distance 
    value for all registered players according to the index in the database  
  
    The players data will be stored as JSON - since the firebase database
    structure is of JSON type
  */
  static getPlayersInfo() {
    var playerInfoRef = databaseOBJ.ref("PLAYERS");
    playerInfoRef.on("value", (data) => {
      allPlayers = data.val();
      //console.log(allPlayers);
    });
  }

  /*
    function defintiion to change existing value of NAME to a new one based based on the indes(number of the playerObj)
    according value of paramter passed in the database.
  
    .set() is used to set the value in the database
  */
  updatePlayerInfo() {
    var playerIndex = "PLAYERS/PLAYER" + this.index;
    databaseOBJ.ref(playerIndex).set({
      POSITIONX: this.positionX,
      POSITIONY: this.positionY,
      RANK: this.rank,
      SCORE: this.score,
      LIFE: this.life
    });
  }
  getDistance() {
    var playerDistanceRef = databaseOBJ.ref("PLAYERS/PLAYER" + this.index);
    playerDistanceRef.on("value", (data) => {
      var data = data.val();
      this.positionX = data.POSITIONX;
      this.positionY = data.POSITIONY;
    });
  }
}
