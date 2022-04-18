// Player

const Player = (name) => {
    let symbol = "";
    let currentTurn = 1;
    let wins = 0;
    return { name, symbol, currentTurn, wins };
};

// Results Manager

const ResultsManager = (() => {
    let horizontalResults = [];
    let verticalResults = [];
    let diagResultsOne = [];
    let diagResultsTwo = [];

    const addHorizontalResults = (resultsToAdd) => {
        horizontalResults = resultsToAdd;
    }

    const addVerticalResults = (resultsToAdd) => {
        verticalResults = resultsToAdd;
    }

    const addDiagResults = (resultsToAdd, resultArrayNum) => {
        console.log(resultArrayNum);
        if(resultArrayNum === 1) {
            console.log(resultsToAdd);
            diagResultsOne = resultsToAdd;
        }
        else if(resultArrayNum === 2) {
            console.log(resultsToAdd);
            diagResultsTwo = resultsToAdd;
        }
        else
            console.error("No valid array number added.");
    }

    const getHorizontalResults = () => {
        return horizontalResults;
    }

    const getVerticalResults = () => {
        return verticalResults;
    }

    const getDiagResults = (resultArrayNum) => {
        if(resultArrayNum == 1)
            return diagResultsOne;
        else if(resultArrayNum == 2)
            return diagResultsTwo;
    }

    return { addHorizontalResults, addVerticalResults, addDiagResults, getHorizontalResults, getVerticalResults, getDiagResults }
})();

// Array Manager

const ArrayManager = (() => {
    let horizontalArray = [];
    let verticalArray = [];
})();

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
            checkForWin(cell);
            currentPlayer.currentTurn++;
        }   
    }

    const checkForWin = (cell) => {
        let arrayToCheck = getNeighbors(cell);
        console.log(arrayToCheck);
        let playerHasWon = checkArrays(arrayToCheck);
        if(playerHasWon)
            console.log(`Congratulations, ${currentPlayer}! You won!`);
        
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
            console.log(cell.dataset.diag)  
            let tempArray = [];
            tempArray = Array.from(DisplayManager.getGridCells()).filter(cell => cell.getAttribute('data-diag') == 1 || cell.getAttribute('data-diag') == 2);
            return tempArray;
        }
        else {
            let tempArray = [];
            tempArray.push(Array.from(DisplayManager.getGridCells()).filter(gridCell => gridCell.getAttribute('data-diag') == 'center'));
            tempArray.push(Array.from(DisplayManager.getGridCells()).filter(gridCell => cell.getAttribute('data-diag') == gridCell.getAttribute('data-diag') && cell.getAttribute('data-col') != gridCell.getAttribute('data-col')));
            return tempArray;
        }
    }

    const getNeighbors = (cell) => {
        let neighborArray = [];
        neighborArray.push(getColNeighbors(cell));
        neighborArray.push(getRowNeighbors(cell));
        if('diag' in cell.dataset) {
            neighborArray.push(getDiagNeighbors(cell));
        }
        return neighborArray;
    }

    const checkArrays = (array) => {
        console.log(array.length)
        if(array.length == 3) {
            ResultsManager.addHorizontalResults(array[0].every(checkCell));
            ResultsManager.addVerticalResults(array[1].every(checkCell));
            ResultsManager.addDiagResults(array[2][0].every(checkCell), 1);
            console.log(array[2])
            if(array[2].length === 2) {
                ResultsManager.addDiagResults(array[2][1].every(checkCell), 2);
            }
            
            
            console.log(ResultsManager.getHorizontalResults());
            console.log(ResultsManager.getVerticalResults());
            console.log(ResultsManager.getDiagResults(1));
            console.log(ResultsManager.getDiagResults(2));
        }
        else {
            ResultsManager.addHorizontalResults(array[1].every(checkCell));
            ResultsManager.addVerticalResults(array[0].every(checkCell));
            console.log(ResultsManager.getHorizontalResults());
            console.log(ResultsManager.getVerticalResults());
        }
    }

    const checkCell = (cell) => {
        console.log(cell);
        if(cell.textContent == currentPlayer.symbol)
            return true;
        else
            return false;
    }
    return { playGame };
})();

GameManager.playGame();