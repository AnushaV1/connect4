const Width= 7;
const Height = 6;
let board = [];
let playerId = 1;

const newGameBtn = document.getElementById('btnStartGame');
const form = document.querySelector('form');
let p1 = document.getElementById('p1-color');
let p2 = document.getElementById('p2-color');
form.addEventListener('submit',function(e){
    e.preventDefault();
    if(p1.value === p2.value){
      alert("Please choose different colors");
      p1.value = " ";
      p2.value= " ";
       p1.focus();
    }
    else {
  newGameBtn.style.backgroundColor = '#00AAFF';
  newGame();
    }
});
const newGame = () => {
     // Clear the table rows
  const Game = document.querySelectorAll('#board tr');
  for(let row of Game){
    row.remove();
    }
    playerId = 1;
     createBoard();
      makeHTML();
   }

 
const createBoard=()=> {  // create board array[height][width]
 board= [];
  for (let y = 0; y <Height; y++) {
    board.push(Array.from({ length:Width }));
  }
 }


function makeHTML() {
const board = document.getElementById('board');
// create Head Row
const headRow = document.createElement('tr');
headRow.setAttribute('id','top_row');
headRow.addEventListener('click', clickhandler);
for(let i=0; i < Width; i++){
let headCell = document.createElement('td');
headCell.setAttribute('id', i);
headRow.appendChild(headCell);
}
board.append(headRow);

// create board 
for(let x=0; x < Height; x++){
    const row = document.createElement('tr');
     for(let y=0; y < Width; y++){
         const cell = document.createElement('td');
         cell.setAttribute('id', `${x}-${y}`);
         row.appendChild(cell);
     }
     board.appendChild(row);    
}
}

function clickhandler(e){
  //  1: Get the column 
  const x = e.target.id;
 
  //  2: Find the free spot in the column
  const y = findSpotForCol(x);
  
  if(y === null){
    return ;
  }
      // 3: Place the player piece in board array
    board[y][x] = playerId;
    let p1 = document.getElementById('p1-color').value;
    let p2 = document.getElementById('p2-color').value;
    //4: Add css to place the piece
    if(board[y][x] == 1) {
        switchBG(p1);
        let createDiv = placeInTable(y,x,p1);
     }
     else {
        switchBG(p2);
       let createDiv = placeInTable(y,x,p2);
     }
  //  5: Check for rows,cols,diagonal for winning
  if (checkForWin()) {
    return endGame(`Player ${playerId} won!`);
  }

  // 6: check for tie
  if (board[0].every(value => value > 0)) {
    return endGame(`Game Over - Tie!`);
  }
    //7: Switch player
  playerId= playerId === 1 ? 2 : 1
}


// find position for piece 
const findSpotForCol = x =>{
  for(let i = Height - 1; i >= 0; i--){
  if(!board[i][x]){
   return i;
  }
}
 return null;
  }
  
 function switchBG(color) {
 if (playerId === 1) {
 document.getElementById('p1').style.backgroundColor = color;
 document.getElementById('p2').style.backgroundColor ='';
 
}  else {
    document.getElementById('p2').style.backgroundColor = color;
 document.getElementById('p1').style.backgroundColor ='';
 }
  
 }

const placeInTable= (y, x, p) => {
 const newDiv = document.createElement('div');
 newDiv.classList.add('dot');
  newDiv.style.backgroundColor = p;
  
  // Append the element into the appropriate table location defined by a string 'yLoc-xLoc' formatted as '0-0' ... 'n-n'
  const destCell = document.getElementById(`${y}-${x}`);
   destCell.append(newDiv);

  dropGamePiece(y, x, newDiv);
}
//** dropGamePiece  */
function dropGamePiece(y, x, div) {
  const endElement = document.getElementById(`${y}-${x}`);
   const posEnd = endElement.offsetTop;
   div.style.top = posEnd + 'px';
 } 
 
// check for winning game
const checkForWin = () => {
  
  for(let y = 0; y < Height; y++) {
    for(let x = 0; x < Width; x++) {
        const vertical = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagonalRight = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagonalLeft = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
       const horizontal = [[y,x],[y,x+1],[y,x+2],[y,x+3]];
       if (win(horizontal) || win(vertical) || win(diagonalRight) || win(diagonalLeft)) {      
                 return true;
      }
 }
}
// Check four cells to see if they're all color of current player
    //  - returns true if all are legal coordinates & all match current player
  function win(cells) {
        return cells.every(
      ([y, x]) =>
        x >= 0 &&
        x < Width &&
        y >= 0 &&
        y < Height &&
        board[y][x] === playerId
    );
  }
}
function endGame(msg) { 
  document.getElementById('top_row').removeEventListener('click', clickhandler);
  newGameBtn.style.backgroundColor = '#40414b';
  alert(msg);
  p1.value = " ";
  p2.value = " ";
  }

createBoard();
makeHTML();