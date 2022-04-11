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
        console.log(getNeighbors(cell));
        turnShift();
    }

    const getColNeighbors = (cell) => {
        let columnNum = cell.getAttribute('data-col');
        let rowNum = cell.getAttribute('data-row');
        return Array.from(DisplayManager.getGridCells()).filter(cell => cell.getAttribute('data-col') == columnNum && cell.getAttribute('data-row') != rowNum);
    }

    const getRowNeighbors = (cell) => {
        let columnNum = cell.getAttribute('data-col');
        let rowNum = cell.getAttribute('data-row');
        return Array.from(DisplayManager.getGridCells()).filter(cell => cell.getAttribute('data-row') == rowNum && cell.getAttribute('data-col') != columnNum);
    }

    const getDiagNeighbors = (cell) => {
        if(cell.dataset.diag == "center") {
            let neighborGroupOne = Array.from(DisplayManager.getGridCells()).filter(cell => cell.getAttribute('data-diag') == 1);
            let neighborGroupTwo = Array.from(DisplayManager.getGridCells()).filter(cell => cell.getAttribute('data-diag') == 2);
            return [neighborGroupOne, neighborGroupTwo];
        }
        else {
            return Array.from(DisplayManager.getGridCells()).filter(cell => (cell.getAttribute('data-diag') == cell.getAttribute('data-diag') && cell.getAttribute('data-col') != diagCell.getAttribute('data-col')) || (cell.getAttribute('data-diag') == 'center'));
        }
    }

    const getNeighbors = (cell) => {
        let colNum = cell.getAttribute('data-col');
        let rowNum = cell.getAttribute('data-row');
        let neighborArray = [];
        neighborArray.push(getColNeighbors(cell));
        neighborArray.push(getRowNeighbors(cell));
        if('diag' in cell.dataset)
            neighborArray.push(getDiagNeighbors(cell));
        return neighborArray;
    }
    return { playGame };
})();

GameManager.playGame();