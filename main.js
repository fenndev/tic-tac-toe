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

    return { grid, gridCells, updateCellDisplay };
})();

// Game Manager

const GameManager = (() => {
    const playerOne = Player("Bob");
    const playerTwo = Player("Jeremy");
    let currentPlayer;
    let gameRunning = false;

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

    const makeCellsClickable = () => {
        DisplayManager.gridCells.forEach(cell => {
            cell.addEventListener('click', () => {
                markCell(cell, currentPlayer);
            });
        });
    }

    const markCell = (cell, currentPlayer) => {
        if(gameRunning) {
            DisplayManager.updateCellDisplay(cell, currentPlayer);
        }   
    }

    return { playGame };
})();

GameManager.playGame();