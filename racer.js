var ship1Pos = 0;
var ship2Pos = 0;
var ship1Positions = document.querySelectorAll("td.player1_strip");
var ship2Positions = document.querySelectorAll("td.player2_strip");

function updatePlayerPosition(ship) {
  var shipEl = document.querySelector(ship);
  shipEl.className = shipEl.className.replace( /(?:^|\s)MyClass(?!\S)/g , '' );
  if(ship === "ship-1") {
    ship1Positions[ship1Pos].className = ship1Positions[ship1Pos].className.replace( /(?:^|\s)MyClass(?!\S)/g , '' );
    ship1Pos += 1;
    ship1Pos.className = "ship-1"; 
    if(ship1Pos === 4) {
      window.alert("Player 1 wins!")
    }   
  }
  else if(ship === "ship-2") {
    ship2Positions[ship1Pos].className = ship2Positions[ship1Pos].className.replace( /(?:^|\s)MyClass(?!\S)/g , '' );
    ship2Pos += 1;
    ship2Pos.className = "ship-2";
    if(ship2Pos === 4) {
      window.alert("Player 2 wins!")
    }    
  }  
}

var el = document.querySelector("table.racer_table");
el.addEventListener("keyup", updatePlayerPosition, false);