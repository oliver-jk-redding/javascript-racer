//check page has loaded
document.addEventListener("DOMContentLoaded", function() {
    
    var distance = 10; //how long the race track is
    var ships = [];
    var asteroids = [];
    var rows = [
      {
        element: document.querySelector("tr.strip.a"),
        name: "generic",
        row: 0,
        querySelector: "tr.strip.a td",
        rowCells: document.querySelectorAll("tr.strip.a td")
      },
      {
        element: document.querySelector("tr.strip.b"),
        name: "generic",
        row: 1,
        querySelector: "tr.strip.b td",
        rowCells: document.querySelectorAll("tr.strip.b td"),
      },
      { 
        element: document.querySelector("tr.player1_strip"), //player1's track
        name: "ship-1",
        row: 2, 
        querySelector: "tr.player1_strip td",
        rowCells: document.querySelectorAll("tr.player1_strip td"), //a list of all the cells in player1's track
      }, 
      {
        element: document.querySelector("tr.player2_strip"), //player2's track
        name: "ship-2",
        row: 3,
        querySelector: "tr.player2_strip td",
        rowCells: document.querySelectorAll("tr.player2_strip td"), //a list of all the cells in player2's track
      },
      {
        element: document.querySelector("tr.strip.c"),
        name: "generic",
        row: 4,
        querySelector: "tr.strip.c td",
        rowCells: document.querySelectorAll("tr.strip.c td"),
        objectsPos: []
      },
      {
        element: document.querySelector("tr.strip.d"),
        name: "generic",
        row: 5,
        querySelector: "tr.strip.d td",
        rowCells: document.querySelectorAll("tr.strip.d td"),
      }, 
    ];

    function Space_Object( name, x, y, dir) {
      this.name = name;
      this.posX = x;
      this.posY = y;
      this.cell = rows[this.posY].rowCells[this.posX];
      this.direction = dir; 
      this.move = function(backToStart) { 
        this.cell.className = this.cell.className.replace(this.name, '');
        if(backToStart === "back to start") {
          this.posX = 0;
          this.cell = rows[this.posY].rowCells[this.posX];
          this.cell.className = this.name;
        }
        else{
          if(this.direction === "up") {
            this.posY--;
            if(this.posY < 0) {
              this.direction = "down";
              this.posY = 1;
            }
          }
          else if(this.direction === "down") {
            this.posY++;  
            if(this.posY > 5) {
              this.direction = "up"; 
              this.posY = 4;    
            }
          }
          else if(this.direction === "right") {
            this.posX++;                 
          }
          this.cell = rows[this.posY].rowCells[this.posX];
          this.cell.className = this.name;
          checkForCollision(this);
        }
      };     
      this.spawn = function() {
        this.cell.className = this.name;
      }
    }

    function Ship(name, x, y, dir) {
      Space_Object.call(this, name, x, y, dir);
    }

    function Asteroid(name, x, y, dir) {
      Space_Object.call(this, name, x, y, dir);
    }

    newGame(); //start a new game
    
    function updatePlayerPosition(shipName) {
      var ship;      
      for(var i=0; i<ships.length; i++) {
        if(ships[i].name === shipName)
          ship = ships[i];
      }
      ship.move();
      checkForCollision();
      //check for victory
      if(ship.posX == distance) {
        alert(shipName + " wins!");
        document.removeEventListener("keyup", checkKeyPressed, false); 
        stopAsteroids(intervalID);
      }
    }
    function checkForCollision(ship) {
      for(var ship=0; ship<ships.length; ship++) {
        for(var asteroid=0; asteroid<asteroids.length; asteroid++) {
          if(ships[ship].posX == asteroids[asteroid].posX && ships[ship].posY == asteroids[asteroid].posY) {
            ships[ship].move("back to start");
          } 
        }
      }
    }    

    //check which key activated the eventlistener . If 81(q) move ship1 forward. Else if 80(p) move ship2 forward
    function checkKeyPressed(e) {        
      if (e.keyCode == "81") {                
        updatePlayerPosition("ship-1");      
      }
      else if (e.keyCode == "80") {                
        updatePlayerPosition("ship-2");        
      }
    }

    //start a new game
    function newGame() {      
      document.addEventListener("keyup", checkKeyPressed, false); //turn on eventlistener for keyboard
      setDistance(distance);
      // spawn ships and asteroids();  
      populateGalaxy();    
    }    
      
    //fetch the value of the selected option in the distance select panel, then reset the game
    function changeDistance(e) {      
      distance = e.srcElement.value || e.target.value;
      newGame();
    }    

    //create the track according to selected distance, but first delete the current track
    function setDistance(dist) {            
      rows = rows.map(function(row) {
        var rowLength = row.rowCells.length;
        for(var i=rowLength; i>1; i--) {
          row.element.removeChild(row.rowCells[i-1]);   
        }
        for(var i=0; i<dist; i++) {
          var newCell = document.createElement("td"); //new cell
          row.element.appendChild(newCell); //add new cells to end of row 
          row.rowCells = document.querySelectorAll(row.querySelector);          
        } 
        if(row.name === "ship-1") {
          row.element.innerHTML = row.element.innerHTML + "<td rowspan = \"2\" class = \"finish_line\"></td>";
          row.rowCells = document.querySelectorAll(row.querySelector); 
        }       
        return row;        
      });
    }  

    var intervalID;
    function populateGalaxy() {
      if(intervalID !== undefined) {
        stopAsteroids(intervalID);
      }
      ships = [];
      asteroids = [];
      //make ships
      ships.push(new Ship("ship-1", 0, 2, "right"));
      ships.push(new Ship("ship-2", 0, 3, "right"));
      for(var i=0; i<ships.length; i++)
        ships[i].spawn();
      //make asteroids
      var asteroidsX = [];;      
      for(var i=0; i<distance; i++) {
        asteroidsX.push(i);
      }
      asteroidsX = asteroidsX.filter(function(val) {
        return val % 3 == 0;
      });
      function asteroidsY() {
        return Math.floor(Math.random() * 6);
      }
      function asteroidDirection() {
        var dir = Math.floor(Math.random() * 2);
        if(dir === 0)
          return "up";
        else
          return "down";
      }
      for(var i=1; i<asteroidsX.length; i++) {
        var asteroid = new Asteroid("asteroid", asteroidsX[i], asteroidsY(), asteroidDirection());
        asteroids.push(asteroid);
        asteroid.spawn();
      }
      intervalID = setInterval(function() { 
        for(var i=0; i<asteroids.length; i++) {
          asteroids[i].move();
        }
      }, 500);
    } 

    function stopAsteroids(id) {
      clearInterval(id);
    } 
    
    //set up eventListener for the 'New Game' button    
    var newGameBtn = document.getElementById("newGame");
    newGameBtn.addEventListener("click", newGame, false);  

    //set up eventListener for the select panel
    var distanceSelect = document.getElementById("distance");
    distanceSelect.addEventListener("change", changeDistance, false);
    
});