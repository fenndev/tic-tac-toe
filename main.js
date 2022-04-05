const gameBoard = (() => {
    let boardArray = {};

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
})();

const displayManager = (() => {
    let boardDisplay = document.querySelector("board-display");
    let renderBoard = (boardArray) => {
        boardArray.forEach(cell => {
            
        });
    }
})();

const logicManager = (() => {

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