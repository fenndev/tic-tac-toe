// Player

const Player = (name) => {
    let symbol = "";
    let wins = 0;
    return { name, symbol, wins };
};

// DOM Manager

const DOMManager = (() => {
    const startButton = document.querySelector(".start-btn");
    const modalSubmitButton = document.querySelector(".submit-btn");
    const modalForm = document.querySelector(".modal__prompt");
    const modal = document.querySelector(".modal");
    const currentPlayerDisplay = document.querySelector(".current-player");
    const playerOneNameInput = document.querySelector("#player-one");
    const playerTwoNameInput = document.querySelector("#player-two");
    let grid = document.querySelector(".grid");
    const gridCells = grid.querySelectorAll(".grid__cell");
    const updateCellDisplay = (cellToUpdate, currentPlayer) => cellToUpdate.textContent = currentPlayer.symbol;
    const getGridCells = () => gridCells;
    const getStartButton = () => startButton;
    const getSubmitButton = () => modalSubmitButton;
    const getModalForm = () => modalForm;
    const getCurrentPlayerDisplay = () => currentPlayerDisplay;
    const showModalForm = () => {
        startButton.style.display = "none";
        modalForm.style.display = "flex";
    }

    const hideModal = () => {
        modal.style.display = "none";
    }

    const updateCurrentPlayerDisplay = (currentPlayer) => currentPlayerDisplay.textContent = `${currentPlayer.name}'s Turn!`;

    const getPlayerOne = () => playerOneNameInput.value;
    const getPlayerTwo = () => playerTwoNameInput.value;



    return { getGridCells, updateCellDisplay, getStartButton, getSubmitButton, showModalForm, hideModal, getModalForm, updateCurrentPlayerDisplay, getPlayerOne, getPlayerTwo };
})();

// Game Manager

const GameManager = (() => {
    let playerOne;
    let playerTwo;
    let currentPlayer;
    let gameRunning = true;
    const playGame = () => {
        readyStartButton();
        readyForm();
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
        DOMManager.updateCurrentPlayerDisplay(currentPlayer);
    }
    const turnShift = () => {
        currentPlayer == playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne;
        DOMManager.updateCurrentPlayerDisplay(currentPlayer);
    }
    const makeCellsClickable = () => DOMManager.getGridCells().forEach(cell => cell.addEventListener('click', () => markCell(cell, currentPlayer)));
    const markCell = (cell, currentPlayer) => {
        if(gameRunning && cell.textContent == "*") {
            DOMManager.updateCellDisplay(cell, currentPlayer);
            if(checkForWin())
                console.log(`Congratulations, ${currentPlayer.name}! You win!`);
            else turnShift();
        }
    }

    const readyStartButton = () => DOMManager.getStartButton().addEventListener('click', () => { DOMManager.showModalForm(); })
    const readyForm = () => DOMManager.getModalForm().addEventListener('submit', (event) => {
        event.preventDefault();
        playerOne = Player(DOMManager.getPlayerOne());
        playerTwo = Player(DOMManager.getPlayerTwo());
        setTurns();
        DOMManager.hideModal();
        })

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