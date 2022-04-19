// Player

const Player = (name) => {
    let symbol = "";
    let wins = 0;
    return { name, symbol, wins };
};

// DOM Manager

const DOMManager = (() => {
    let grid = document.querySelector(".grid");
    const gridCells = grid.querySelectorAll(".grid__cell");
    const updateCellDisplay = (cellToUpdate, currentPlayer) => cellToUpdate.textContent = currentPlayer.symbol;
    const getGridCells = () => gridCells;
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
    const turnShift = () => currentPlayer == playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne;
    const makeCellsClickable = () => DOMManager.getGridCells().forEach(cell => cell.addEventListener('click', () => markCell(cell, currentPlayer)));
    const markCell = (cell, currentPlayer) => {
        if(gameRunning && cell.textContent == "*") {
            DOMManager.updateCellDisplay(cell, currentPlayer);
            if(checkForWin())
                console.log(`Congratulations, ${currentPlayer.name}! You win!`);
            else turnShift();
        }
    }

    const checkForWin = () => {
        let gridArray = Array.from(DOMManager.getGridCells());
        
        const sectionArray = {
            rowOne : getGridSection(gridArray, 'row', 1),
            rowTwo : getGridSection(gridArray, 'row', 2),
            rowThree : getGridSection(gridArray, 'row', 3),
            colOne : getGridSection(gridArray, 'col', 1),
            colTwo : getGridSection(gridArray, 'col', 2),
            colThree : getGridSection(gridArray, 'col', 3),
            diagOne : getGridSection(gridArray, 'diag', 1),
            diagTwo : getGridSection(gridArray, 'diag', 2)
        };

        let tempResult = false;
        for (let section in sectionArray) {
            console.log(tempResult);
            if(checkGridSection(sectionArray[section])) {
                tempResult = true;
                break;
            }
        }
        return tempResult;
    }

    const getGridSection = (grid, sectionType, sectionNum) => {
        if(sectionType != 'diag') {return grid.filter(cell => cell.getAttribute(`data-${sectionType}`) == sectionNum)}
        else {return grid.filter(cell => cell.getAttribute(`data-${sectionType}`) == sectionNum) || cell.getAttribute(`data-${sectionType}`) == 'center'};
    }

    const checkGridSection = (sectionToCheck) => { if(sectionToCheck.every(cell => doesSymbolMatch(cell.textContent))) return true; }
    
    const doesSymbolMatch = (symbol) => { if(symbol == currentPlayer.symbol) return true; }

    return { playGame };
})();
GameManager.playGame();