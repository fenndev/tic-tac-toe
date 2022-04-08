// Player

const Player = (name) => {
    let turnPos;
    let symbol = "";
    let wins = 0;
    return { name, symbol, wins, turnPos };
};

// Display Manager

const DisplayManager = (() => {
    let grid = document.querySelector(".grid");
    const gridCells = grid.querySelectorAll(".grid__cell");
    console.log(gridCells);

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
    let gameRunning = true;

    const setTurns = () => {
        let randomNum = Math.floor(Math.random() * 2);
        console.log(randomNum);
        switch(randomNum) {
            case 0:
                playerOne.symbol = "X";
                playerOne.turnPos = 0;
                playerTwo.symbol = "O";
                playerTwo.turnPos = 1;
            default:
                playerOne.symbol = "O";
                playerOne.turnPos = 1;
                playerTwo.symbol = "X";
                playerTwo.turnPos = 0;
        }
        currentPlayer = (playerOne.turnPos == 0 ? playerOne : playerTwo);
        console.log(currentPlayer);
    }
    
    DisplayManager.gridCells.forEach(cell => {
        cell.addEventListener('click', () => {
            markCell(cell, currentPlayer);
        });
    });

    const markCell = (cell, currentPlayer) => {
        if(gameRunning) {
            DisplayManager.updateCellDisplay(cell, currentPlayer);
        }   
    }

    return { playerOne, playerTwo, markCell, setTurns };
})();

GameManager.setTurns();