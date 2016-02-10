document.addEventListener("DOMContentLoaded", function() {
    
    var distance = 10;
    var ship1Pos = 0;
    var ship2Pos = 0;
    var ship1Positions = document.querySelectorAll("tr.player1_strip td");
    var ship2Positions = document.querySelectorAll("tr.player2_strip td"); 

    newGame();   
    
    function updatePlayerPosition(ship) {        
      if(ship === "ship-1") {
        for (var i = 0; i < ship1Positions.length; ++i) {        
          if(i === ship1Pos) {
            ship1Positions[ship1Pos].className = ship1Positions[ship1Pos].className.replace( /(?:^|\s)ship-1(?!\S)/g , '' );
            ship1Pos += 1;            
            ship1Positions[ship1Pos].className = "ship-1";
            break;
          }
        }               
        if(ship1Pos == distance) {
          alert("Player 1 wins!")
          document.removeEventListener("keyup", checkKeyPressed, false); 
        }   
      }
      else if(ship === "ship-2") {        
        for (var i = 0; i < ship2Positions.length; ++i) {        
          if(i === ship2Pos) {
            ship2Positions[ship2Pos].className = ship2Positions[ship2Pos].className.replace( /(?:^|\s)ship-2(?!\S)/g , '' );
            ship2Pos += 1;
            ship2Positions[ship2Pos].className = "ship-2";
            break;
          }
        }               
        if(ship2Pos == distance) {
          alert("Player 2 wins!")
          document.removeEventListener("keyup", checkKeyPressed, false); 
        }    
      }        
    }

    function checkKeyPressed(e) {        
      if (e.keyCode == "81") {                
        updatePlayerPosition("ship-1");      
      }
      else if (e.keyCode == "80") {                
        updatePlayerPosition("ship-2");        
      }
    }

    function newGame() {      
      returnShipToStart("ship-1");
      returnShipToStart("ship-2");
      document.addEventListener("keyup", checkKeyPressed, false);
      setDistance(distance);   
      ship1Positions = document.querySelectorAll("tr.player1_strip td");
      ship2Positions = document.querySelectorAll("tr.player2_strip td");    
    }

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

    function changeDistance(e) {      
      distance = e.srcElement.value || e.target.value;
      newGame();
    }    

    function setDistance(dist) {            
      var player1Row = document.querySelector("tr.player1_strip");
      var player2Row = document.querySelector("tr.player2_strip"); 
      var player1Cells = document.querySelectorAll("tr.player1_strip td");
      var player2Cells = document.querySelectorAll("tr.player2_strip td");
      for(var i = player1Cells.length-2; i > 0; i--) {
        player1Row.removeChild(player1Cells[i]);
      }
      for(var i = player2Cells.length-1; i > 0; i--) {
        player2Row.removeChild(player2Cells[i]);
      }      
    for(var i = 0; i < dist; i++) {
        var player1Cell = document.createElement("td");
        var player2Cell = document.createElement("td");
        var finishLine = document.querySelector("tr.player1_strip td.finish_line")
        var player1Row = document.querySelector("tr.player1_strip");
        var player2Row = document.querySelector("tr.player2_strip"); 
        player1Row.insertBefore(player1Cell, finishLine);
        player2Row.appendChild(player2Cell);
      }
    }    
        
    var newGameBtn = document.getElementById("newGame");
    newGameBtn.addEventListener("click", newGame, false);  

    var distanceSelect = document.getElementById("distance");
    distanceSelect.addEventListener("change", changeDistance, false);
    
});