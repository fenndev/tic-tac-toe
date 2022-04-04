# tic-tac-toe

## Summary

This Tic Tac Toe application will have mutliple, encapsulated elements that store both private and public variables and functions.

## Play function
Main game loop function. Contains a gameBoard, a displayManager, a logicManager, and two players.

## gameBoard
The game board is responsible for maintaining a list of all spaces and whether or not those spaces are occupied. 


## displayManager
The displayManager is responsible for updating the display (adding player's names, adding player's symbols to the visual board, etc.)


## logicManager
The logic manager is responsible for overseeing the game in a holistic way. Its job is to enforce the turn order and allow or disallow players to make a move depending on whether or not that move is legal.

## Player
Each player should have a symbol (X or O), a name, and optionally a win count

## Game Board Array

The gameBoard Object has an array within it that stores the game board cells. The cells are ordered from left to right, top to bottom, looking like this:

```
{Cell 1, Cell 2, Cell 3, Cell 4, Cell 5, Cell 6, Cell 7, Cell 8, Cell 9}
```

Cells 1-3 represent the first row, Cells 4-6 represent the second, and so on.

## Checking for a Win

We should begin checking for a win condition after the first player has marked their third cell and every move afterwards for both players. Since the game board array reads left to right, top to bottom, we can check for wins using some simple math.

In order to do this, each cell should have properties that denote which row and column the cell is in. Using the row and column information, we can check the relevant nearby cells for win conditions.

For example, say that Player Two marks the middle cell. This is their third move. The center cell is Cell 5 in our array and has four possible win condition paths:

1. Cells 4, 5, and 6 are all the same
2. Cells 2, 5, and 8 are all the same
3. Cells 1, 5, and 9 are all the same
4. Cells 3, 5, and 7 are all the same

We can check for these conditions by querying the array at the specified index for whether or not those cells have been checked.

The win conditions each cell has available look something like this: 

* Cell 5 will have four
  * Horizontal, Vertical, and Two Diagonal
* Cells 1, 3, 7, and 9 will have three win conditions
  * Horizontal, Vertical, and One Diagonal
* Cells 2, 4, 6, and 8 will have only two win conditions
  * Horizontal and Vertical

## Storing the Cells

As noted previously, each cell needs to have a number of variables and available information. Each cell will, therefore, be its own object and will look something like this:

```js
const gameCell = {
    boardCol = 1;
    boardRow = 1;
    vertWinCells = { cell4, cell7 };
    horizWinCells = { cell2, cell3 };
    diagWinCells = { cell5, cell9 };
    isMarked = false; // Check if marked at all
    cellMark = ""; // Can be either "O" or "X" 
    cellDOM = currentCell.addEventListener("click", () => {
        addMark();
    });
}
```