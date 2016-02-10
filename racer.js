// document.addEventListener("DOMContentLoaded", function() {
    
    var ship1Pos = 0;
    var ship2Pos = 0;
    var ship1Positions = document.querySelectorAll("td.player1_strip");
    var ship2Positions = document.querySelectorAll("td.player2_strip");

    function updatePlayerPosition1(ship) {  
      console.log("check");
      if(ship === "ship-1") {
        console.log("check1");     
        for (var i = 0; i < ship1Positions.length; ++i) {
          var position = ship1Positions[i];
          if(i === ship1Pos) {
            position.className = position.className.replace( /(?:^|\s)ship-1(?!\S)/g , '' );
          }
        }           
        ship1Pos += 1;
        ship1Pos.className = "ship-1"; 
        if(ship1Pos === 4) {
          window.alert("Player 1 wins!")
        }   
      }
      else if(ship === "ship-2") {
        console.log("check2");
        for (var i = 0; i < ship1Positions.length; ++i) {
          var position = ship1Positions[i];
          if(i === ship1Pos) {
            position.className = position.className.replace( /(?:^|\s)ship-1(?!\S)/g , '' );
          }
        }  
        ship2Positions[ship1Pos].className = ship2Positions[ship1Pos].className.replace( /(?:^|\s)ship-2(?!\S)/g , '' );
        ship2Pos += 1;
        ship2Pos.className = "ship-2";
        if(ship2Pos === 4) {
          window.alert("Player 2 wins!")
        }    
      }  
      console.log("check3");
    }   

    /*function dealWithKeyboard(e) {  
      console.log("checkoy");
    }*/

    var el = document.getElementById("racer_table");
    el.addEventListener("keyup", dealWithKeyboard(), false);

    function dealWithKeyboard(e) {  
      console.log("checkoy");
    }

    /*function checkKeyPressed(e) {
        if (e.keyCode === "81") {
          console.log("hi1");
          updatePlayerPosition("ship-1");
        }
        else if (e.keyCode === "80") {
          updatePlayerPosition("ship-2");
          console.log("hi1");
        }
    }*/
// });