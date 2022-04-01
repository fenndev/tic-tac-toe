const gameBoard = (() => {
    let boardArray = {};
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
    let symbol = "";
    return { boardIndex, symbol };
} 