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