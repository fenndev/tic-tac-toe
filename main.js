// Player

const Player = (name) => {
    let symbol = "";
    let currentTurn = 1;
    let wins = 0;
    return { name, symbol, currentTurn, wins };
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

    const getGridSection = (nameOfSection, numOfSection) => {
        let tempGrid = Array.from(gridCells);
        let section = tempGrid.filter(cell => cell.getAttribute(`data-${nameOfSection}`) == numOfSection);
        return section;
    }

    return { getGridCells, updateCellDisplay, getGridSection };
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
            if(currentPlayer.currentTurn >= 3) {
                checkForWin(cell);
            }
            else
                turnShift();
            currentPlayer.currentTurn++;
        }   
    }

    const checkForWin = (cell) => {
        let cellPos = [cell.getAttribute('data-col'), cell.getAttribute('data-row')];
        let colNeighbors = getColNeighbors(cellPos[0], cellPos[1]);
        let rowNeighbors = getRowNeighbors(cellPos[1], cellPos[0]);
        console.log(colNeighbors);
        console.log(rowNeighbors);
        turnShift();
    }

    const getColNeighbors = (columnNum, rowNum) => {
        return Array.from(DisplayManager.getGridCells()).filter(cell => cell.getAttribute('data-col') == columnNum && cell.getAttribute('data-row') != rowNum);
    }

    const getRowNeighbors = (rowNum, columnNum) => {
        return Array.from(DisplayManager.getGridCells()).filter(cell => cell.getAttribute('data-row') == rowNum && cell.getAttribute('data-col') != columnNum);
    }

    return { playGame };
})();

GameManager.playGame();