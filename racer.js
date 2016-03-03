//check page has loaded
document.addEventListener("DOMContentLoaded", function() {
    
    var distance = 10; //how long the race track is
    var ship1Pos = 0; //ship1's position
    var ship2Pos = 0; //ship2's position
    var ship1Positions = document.querySelectorAll("tr.player1_strip td"); //a list of all the table cells in player1's track
    var ship2Positions = document.querySelectorAll("tr.player2_strip td"); //a list of all the table cells in player2's track

    newGame(); //start a new game
    
    function updatePlayerPosition(ship) {  
      //if ship1 is moving, iterate through the list of table cells to find ship1, remove the 'ship-1' class, and add that class to the next table cell along      
      if(ship === "ship-1") {
        for (var i = 0; i < ship1Positions.length; ++i) {        
          if(i === ship1Pos) {
            ship1Positions[ship1Pos].className = ship1Positions[ship1Pos].className.replace( /(?:^|\s)ship-1(?!\S)/g , '' );
            ship1Pos += 1;            
            ship1Positions[ship1Pos].className = "ship-1";
            break;
          }
        }  
        //if ship1's new position is = to the distance of the race track, signal victory to player1             
        if(ship1Pos == distance) {
          alert("Player 1 wins!")
          document.removeEventListener("keyup", checkKeyPressed, false); 
        }   
      }
      //if ship2 is moving, iterate through the list of table cells to find ship2, remove the 'ship-2' class, and add that class to the next table cell along             
      else if(ship === "ship-2") {        
        for (var i = 0; i < ship2Positions.length; ++i) {        
          if(i === ship2Pos) {
            ship2Positions[ship2Pos].className = ship2Positions[ship2Pos].className.replace( /(?:^|\s)ship-2(?!\S)/g , '' );
            ship2Pos += 1;
            ship2Positions[ship2Pos].className = "ship-2";
            break;
          }
        }   
        //if ship2's new position is = to the distance of the race track, signal victory to player2              
        if(ship2Pos == distance) {
          alert("Player 2 wins!")
          document.removeEventListener("keyup", checkKeyPressed, false); 
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
      returnShipToStart("ship-1"); //return ship1 to start
      returnShipToStart("ship-2"); //return ship2 to start
      document.addEventListener("keyup", checkKeyPressed, false); //turn on eventlistener for keyboard
      setDistance(distance); //reset the distance variable 
      ship1Positions = document.querySelectorAll("tr.player1_strip td"); //reset the lists of table cells
      ship2Positions = document.querySelectorAll("tr.player2_strip td");    
    }

    //return ships to starting positions. First find each ship's position on the table, then remove the "ship" class from that cell and append it to the starting cell. Reset the variable for the position of each ship.
    function returnShipToStart(ship) {
      if(ship === "ship-1") {
        for (var i = 0; i < ship1Positions.length; ++i) {        
          if(i === ship1Pos) {
            ship1Positions[ship1Pos].className = ship1Positions[ship1Pos].className.replace( /(?:^|\s)ship-1(?!\S)/g , '' );
            ship1Pos = 0;
            ship1Positions[ship1Pos].className = "ship-1";
            break;
          }
        } 
      }    
      else if(ship === "ship-2") {
        for (var i = 0; i < ship2Positions.length; ++i) {        
          if(i === ship2Pos) {
            ship2Positions[ship2Pos].className = ship2Positions[ship2Pos].className.replace( /(?:^|\s)ship-2(?!\S)/g , '' );
            ship2Pos = 0;
            ship2Positions[ship2Pos].className = "ship-2";
            break;
          }
        }
      }    
    }

    //fetch the value of the selected option in the distance select panel, then reset the game
    function changeDistance(e) {      
      distance = e.srcElement.value || e.target.value;
      newGame();
    }    

    //create the track according to selected distance, but first delete the current track
    function setDistance(dist) {            
      var rows = [
        {
          elements: document.querySelectorAll("tr.strip"),
          name: "gen",
          rowsCells: 
            [
              document.querySelectorAll("tr.strip.a td"),
              document.querySelectorAll("tr.strip.b td"),
              document.querySelectorAll("tr.strip.c td"),
              document.querySelectorAll("tr.strip.d td")
            ]
        },
        { 
          elements: document.querySelectorAll("tr.player1_strip"), //player1's track
          name: "p1row", 
          rowsCells: [document.querySelectorAll("tr.player1_strip td")] //a list of all the cells in player1's track
        }, 
        {
          elements: document.querySelectorAll("tr.player2_strip"), //player2's track
          name: "p2row",
          rowsCells: [document.querySelectorAll("tr.player2_strip td")] //a list of all the cells in player2's track
        }  
      ];

      rows = rows.map(function(row) {
        var rowLength = row.rowsCells[0].length;
        console.log(row.rowsCells[0].length);
        console.log(row.rowsCells[0][0]);
        for(var i=rowLength; i>1; i--) {
          for(var j=0; j<row.elements.length; j++) {
            console.log(row.rowsCells[j][i-1]);
            row.elements[j].removeChild(row.rowsCells[j][i-1]);
          }
        }
        for(var i=0; i<dist; i++) {
          for(var j=0; j<row.elements.length; j++) {    
            var newCell = document.createElement("td"); //new cell
            row.elements[j].appendChild(newCell); //add new cells to end of row   
          }                 
        } 
        if(row.name === "p1row") {
          row.elements[0].innerHTML = row.elements[0].innerHTML + "<td rowspan = \"2\" class = \"finish_line\" style = \"width:300;\"></td>";
        }       
        return row;        
      });
    }    
    
    //set up eventListener for the 'New Game' button    
    var newGameBtn = document.getElementById("newGame");
    newGameBtn.addEventListener("click", newGame, false);  

    //set up eventListener for the select panel
    var distanceSelect = document.getElementById("distance");
    distanceSelect.addEventListener("change", changeDistance, false);
    
});