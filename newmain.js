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

    const updateCellDisplay = (cellToUpdate, currentPlayer) => {
        cellToUpdate.textContent = currentPlayer.symbol;
    }

    const getGridCells = () => {
        return gridCells;
    }

    return { getGridCells, updateCellDisplay };
})();