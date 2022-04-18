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
            checkForWin();
            turnShift();
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

        let hasWon = false;
        if(rowOne.every(cell => doesSymbolMatch(cell.textContent))) hasWon = true;
        else if(rowTwo.every(cell => doesSymbolMatch(cell.textContent))) hasWon = true;
        else if(rowThree.every(cell => doesSymbolMatch(cell.textContent))) hasWon = true;
        else if(colOne.every(cell => doesSymbolMatch(cell.textContent))) hasWon = true;
        else if(colTwo.every(cell => doesSymbolMatch(cell.textContent))) hasWon = true;
        else if(colThree.every(cell => doesSymbolMatch(cell.textContent))) hasWon = true;
        else if(diagOne.every(cell => doesSymbolMatch(cell.textContent))) hasWon = true;
        else if(diagTwo.every(cell => doesSymbolMatch(cell.textContent))) hasWon = true;
        return hasWon;
    }

    const getGridSection = (grid, sectionType, sectionNum) => {
        if(sectionType != 'diag') {return grid.filter(cell => cell.getAttribute(`data-${sectionType}`) == sectionNum)}
        else {return grid.filter(cell => cell.getAttribute(`data-${sectionType}`) == sectionNum) || cell.getAttribute(`data-${sectionType}`) == 'center'};
    }
    
    const doesSymbolMatch = (symbol) => {
        if(symbol == currentPlayer.symbol) return true;
    }

    return { playGame };
})();
GameManager.playGame();