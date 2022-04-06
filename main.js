const gameManager = (() => {
    const runGame = () => {
        boardManager.createBoard();
        displayManager.displayBoard(boardManager.boardArray);
        console.log(boardManager.boardArray);
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
        switch (cell.getCellCol()) {
            case 0:
                return {
                    vertNeighborOne : boardIndex + 1,
                    vertNeighborTwo : vertNeighborOne + 1
                }
            case 1:
                return {
                    vertNeighborOne : boardIndex + 1,
                    vertNeighborTwo : boardIndex - 1
                }
            default:
                return {
                    vertNeighborOne : boardIndex - 1,
                    vertNeighborTwo : vertNeighborOne - 1
                }
        }
    }

    const getVerticalNeighbors = (cell) => {
        let boardIndex = cell.boardIndex;
        switch (cell.getCellRow()) {
            case 0:
                return {
                    vertNeighborOne : boardIndex + 3,
                    vertNeighborTwo : vertNeighborOne + 3
                }
            case 1:
                return {
                    vertNeighborOne : boardIndex + 3,
                    vertNeighborTwo : boardIndex - 3
                }
            default:
                return {
                    vertNeighborOne : boardIndex - 3,
                    vertNeighborTwo : vertNeighborOne - 3
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
        return (boardIndex % 3) + 1;
    }

    const getCellRow = () => {
        return (boardIndex % 3) + 1;
    }

    return { boardIndex, getCellCol, getCellRow, cellDiv }
}

gameManager.runGame();