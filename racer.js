document.addEventListener("DOMContentLoaded", function() {
    
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
        if(ship1Pos === 4) {
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
        if(ship2Pos === 4) {
          alert("Player 2 wins!")
          document.removeEventListener("keyup", checkKeyPressed, false); 
        }    
      }        
    }

    function checkKeyPressed(e) { 
      console.log(e.keyCode)     
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
        
    var newGameBtn = document.getElementById("newGame");
    newGameBtn.addEventListener("click", newGame, false);  
    
});