const gameManager = (() => {
    const runGame = () => {
        boardManager.createBoard();
        displayManager.displayBoard(boardManager.boardArray);
        for (cell in boardManager.boardArray) {
            console.log(boardManager.boardArray[cell].boardIndex);
            console.log(boardManager.getBoardNeighbors(boardManager.boardArray[cell]));
        }
    }

    return { runGame }; 
})();

// Manages the board's data
const boardManager = (() => {
    let boardArray = [];

    const createBoard = () => {
        let counter = 0;
        while(counter < 8) {
            let newCell = boardCell(counter);
            newCell.cellDiv.addEventListener('click', () => boardManager.addMark());
            boardArray.push(newCell);
            counter++;
        }
    }

    const getBoardNeighbors = (cell) => {
        return [ getVerticalNeighbors(cell), getHorizontalNeighbors(cell) ]
    }

    const getHorizontalNeighbors = (cell) => {
        let boardIndex = cell.boardIndex;
        switch (cell.getCellCol()) {
            case 0:
                return {
                    horizontalNeighborOne: boardIndex + 1,
                    horizontalNeighborTwo: boardIndex + 2
                }
            case 1:
                return {
                    horizontalNeighborOne: boardIndex + 1,
                    horizontalNeighborTwo: boardIndex - 1
                }
            case 2:
                return {
                    horizontalNeighborOne: boardIndex - 1,
                    horizontalNeighborTwo: boardIndex - 2
                }
        }
    }

    const getVerticalNeighbors = (cell) => {
        let boardIndex = cell.boardIndex;
        switch (cell.getCellRow()) {
            case 0:
                return {
                    vertNeighborOne: boardIndex + 3,
                    vertNeighborTwo: boardIndex + 6
                }
            case 1:
                return {
                    vertNeighborOne: boardIndex + 3,
                    vertNeighborTwo: boardIndex - 3
                }
            case 2:
                return {
                    vertNeighborOne: boardIndex - 3,
                    vertNeighborTwo: boardIndex - 6
                }
        }
    }

    return { boardArray, createBoard, getBoardNeighbors }
})();

// Responsible for updating the display
const displayManager = (() => {
    const boardDisplay = document.querySelector(".board-box");
    let displayBoard = (boardArray) => {
        boardArray.forEach(cell => {
            boardDisplay.appendChild(cell.cellDiv);
        });
    }

    const markCell = () => {

    }
    return { displayBoard, markCell }
})();

const turnManager = (() => {
    let playerOneTurn = false;

    const getPlayerTurn = () => {
        return playerOneTurn;
    }

    return { getPlayerTurn }

})();

let Player = (name) => {

}

const boardCell = (boardIndex) => {

    const cellDiv = document.createElement('div');

    const getCellCol = () => {
        console.log((boardIndex % 3));
        return (boardIndex % 3);
    }

    const getCellRow = () => {
        console.log((boardIndex) % 3);
        return (boardIndex % 3);
    }

    return { boardIndex, getCellCol, getCellRow, cellDiv }
}   

gameManager.runGame();