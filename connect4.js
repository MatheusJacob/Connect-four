/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;


let currPlayer = 'one'; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++){
    board.push([])
    for (let j = 0; j < WIDTH; j++){
      board[i].push(null)
    }
  }
}



/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');
  // TODO: add comment for this code
  //create a top row  that allows for a clicking event
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick)

  //create data cells within 'column-top' that is the same as the width of the board
  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //Use a loop to create the 'rows' of the board based on the given HEIGHT 
  for (var y = 0; y < HEIGHT; y++) {
    let row = document.createElement("tr");
    // Within each 'row' create the 'cells' based on the given WIDTH.
    for (var x = 0; x < WIDTH; x++) {
      var cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top-most empty y (null if filled) */
function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // goes through the x column, index by index, and looks for the first open spot. 
 
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) { 
      return y;
    }
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
   // TODO: make a div and insert into correct table cell
   let div = document.createElement('div');
   div.className = `piece ${currPlayer}`;

   let spot = document.getElementById(`${y}-${x}`)
   spot.append(div)
}

/** endGame: announce game end */
function endGame(msg) {
  // TODO: pop up alert message
  setTimeout(function () {alert(msg)}, 500);
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === undefined){
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = `${currPlayer}`

    // TODO: add line to update in-memory board
    placeInTable(y, x);
  
  // check for win
  if(checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  
    // switch players
  currPlayer = (currPlayer === 'one') ? 'two' : 'one';

    // check for tie
    let gameOver = board.every(function (row) {
      return row.every(function (cells) {
        return cells;
      })
    })
  
    if(gameOver) {
      alert("It's a tie!")
      return;
    }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

//checks to make sure the pieces are within the board and the piece corresponds to the player
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  //goes through 'rows' in the board
  for (var y = 0; y < HEIGHT; y++) {
    //goes through each cell within the 'rows'
    for (var x = 0; x < WIDTH; x++) {
    //defines the various ways the pieces will connect four times
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      //if any of the variables are true, return true;
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

const reset = document.querySelector('button');
reset.addEventListener('click', function () {
  window.location.reload();
})
