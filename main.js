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
        let rowOne = getGridSection(gridArray, 'row', 1);
        let rowTwo = getGridSection(gridArray, 'row', 2);
        let rowThree = getGridSection(gridArray, 'row', 3);
        let colOne = getGridSection(gridArray, 'col', 1);
        let colTwo = getGridSection(gridArray, 'col', 2);
        let colThree = getGridSection(gridArray, 'col', 3);
        let diagOne = getGridSection(gridArray, 'diag', 1);
        let diagTwo = getGridSection(gridArray, 'diag', 2);
        
        if(checkGridSection(rowOne)) return true;
        else if(checkGridSection(rowTwo)) return true;
        else if(checkGridSection(rowThree)) return true;
        else if(checkGridSection(colOne)) return true;
        else if(checkGridSection(colTwo)) return true;
        else if(checkGridSection(colThree)) return true;
        else if(checkGridSection(diagOne)) return true;
        else if(checkGridSection(diagTwo)) return true;
        else return false;
    }

    const getGridSection = (grid, sectionType, sectionNum) => {
        if(sectionType != 'diag') {return grid.filter(cell => cell.getAttribute(`data-${sectionType}`) == sectionNum)}
        else {return grid.filter(cell => cell.getAttribute(`data-${sectionType}`) == sectionNum) || cell.getAttribute(`data-${sectionType}`) == 'center'};
    }

    const checkGridSection = (sectionToCheck) => {
        if(sectionToCheck.every(cell => doesSymbolMatch(cell.textContent))) return true;
    }
    
    const doesSymbolMatch = (symbol) => {
        if(symbol == currentPlayer.symbol) return true;
    }

    return { playGame };
})();
GameManager.playGame();