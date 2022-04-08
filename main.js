// Player

const Player = (name) => {
    let symbol = "";
    let wins = 0;
    return { name, symbol, wins };
};

// Display Manager

const DisplayManager = (() => {
    let grid = document.querySelector(".grid");
    const gridCells = grid.querySelectorAll(".grid__cell");

    const updateCellDisplay = (cellToUpdate, currentPlayer) => {
        cellToUpdate.textContent = currentPlayer.symbol;
    }

    const getGridCells = () => {
        return gridCells;
    }

    return { getGridCells, updateCellDisplay };
})();

// Game Manager

const GameManager = (() => {
    const playerOne = Player("Bob");
    const playerTwo = Player("Jeremy");
    let currentPlayer;
    let gameRunning = true;

    const playGame = () => {
        setTurns();
        makeCellsClickable();
    }

    const setTurns = () => {
        let randomNum = Math.floor(Math.random() * 2);
        switch(randomNum) {
            case 0:
                playerOne.symbol = "X";
                playerTwo.symbol = "O";
            default:
                playerOne.symbol = "O";
                playerTwo.symbol = "X";
        }
        currentPlayer = (randomNum == 0 ? playerOne : playerTwo);
    }

    const turnShift = () => {
        if(currentPlayer == playerOne)
            currentPlayer = playerTwo;
        else
            currentPlayer = playerOne;
    }

    const makeCellsClickable = () => {
        DisplayManager.getGridCells().forEach(cell => {
            cell.addEventListener('click', () => {
                markCell(cell, currentPlayer);
            });
        });
    }

    const markCell = (cell, currentPlayer) => {
        if(gameRunning && cell.textContent == "*") {
            DisplayManager.updateCellDisplay(cell, currentPlayer);
            turnShift();
        }   
    }

    return { playGame };
})();

GameManager.playGame();