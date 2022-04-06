const gameBoard = (() => {
    let boardArray = [];

    const createBoard = () => {
        let counter = 0;
        while(counter > 8) {
            let newCell = new boardCell(counter);
            boardArray.push(newCell);
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

    return { boardArray, getBoardNeighbors }
})();

const displayManager = (() => {
    let boardDisplay = document.querySelector("board-display");
    let displayBoard = () => {
        gameBoard.boardArray.forEach(cell => {
            let displayCell = document.createElement('div');
            displayCell.addEventListener('click', () => {

            });
            boardDisplay.appendChild(displayCell);
        });
    }

    const markCell = () => {

    }

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

    const getCellCol = () => {
        return (boardIndex % 3) + 1;
    }

    const getCellRow = () => {
        return (boardIndex % 3) + 1;
    }

    return { boardIndex, getCellCol, getCellRow }
} 

const gameManager = (() => {

})();