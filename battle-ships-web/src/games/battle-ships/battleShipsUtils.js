import { createMatrix } from "../../utils"
import { cellType, cellStatus } from "./constants"



export const createNewBoard = (size) => {
    const board = createMatrix(size, (rIndex, cIndex) => ({ 
        rIndex, 
        cIndex,
        type: cellType.EMPTY,
        id: `${rIndex},${cIndex}`
    }))
    return board
}

export const createShips = (shipSizes = [5, 4, 3, 2]) => {
    return shipSizes.map((size, i) => ({ size, id: i + 1, position: [] }))
}

const printMatrix = (matrix) => {
    matrix.forEach((row, rIndex) => {
        let str = `(row${rIndex}) `
        row.forEach((cell, cIndex) => {
            switch (cell.type) {
                case cellType.SHIP:
                    str += '1'
                    break;
                case cellType.MARGIN:
                    str += '2'
                    break;
                default:
                    str += '0'
                    break;
            }
        })
        console.log(str)
    })
    console.log('-----------------------')
}

export const setShipMarginOnBoard = (board, ship) => {
    const margin = []
    const directions = [-1, 0, 1]
    ship.position?.forEach(({ rIndex, cIndex }) => {
        directions.forEach((dir) => {
            for (let i = 0; i < directions.length; i++) {
                const m = board[rIndex + dir]?.[cIndex + directions[i]]
                margin.push(m)
            }
        })
    });
    margin.filter(m => m && m.type !== cellType.SHIP).forEach((m) => {
        board[m.rIndex][m.cIndex] = { ...m, type: cellType.MARGIN }
    })
}

const getShipOrientation = (position) => {
    if (!position.length) return
    const { rIndex, cIndex } = position[0]
    const horizontal = position.every(p => p.rIndex === rIndex)
    const vertical = position.every(p => p.cIndex === cIndex)
    return { horizontal, vertical }
}

const getValidEditPosition = (orientation, board, position) => {
    const cells = []
    const directions = [-1, 1]

    if (orientation?.horizontal) {
        position.forEach((edge) => {
            directions.forEach((dir) => {
                const cell = board[edge.rIndex][edge.cIndex + dir]
                if (cell && cell.type === cellType.EMPTY) {
                    if (!cells.find(c => c.id === cell.id)){
                        cells.push(cell)
                    }
                }
            })
        })
    }

    if (orientation?.vertical) {
        position.forEach((edge) => {
            directions.forEach((dir) => {
                const cell = board[edge.rIndex + dir]?.[edge.cIndex]
                if (cell && cell.type === cellType.EMPTY) {
                    if (!cells.find(c => c.id === cell.id)){
                        cells.push(cell)
                    }
                }
            })
        })
    }
    return cells
}

export const getCellsEditableOnBoard = (board, position) => {
    let emptyCells = []
    let nextValidPosition = undefined
    if (position.length) {
        const orientation = getShipOrientation(position)
        nextValidPosition = getValidEditPosition(orientation, board, position)
    } else {
        board.forEach((row) => {
            row.forEach((cell) => {
                if (cell.type === cellType.EMPTY) {
                    emptyCells.push(cell)
                }
            })
        })
    }
    return nextValidPosition ?? emptyCells
}

export const editShipPositionOnBoard = (board, ship) => {
    const copy = board.map((row) => row.map((column) => ({ ...column })))
    ship.position.forEach(({ rIndex, cIndex }) => {
        const cell = copy[rIndex][cIndex]
        copy[rIndex][cIndex] = { ...cell, shipId: ship.id, type: cellType.SHIP }
    });
    // printMatrix(copy)
    return copy
}

export const setShipPositionOnBoard = (board, ship) => {
    const copy = board.map((row) => row.map((column) => ({ ...column })))
    ship.position.forEach(({ rIndex, cIndex }) => {
        const cell = copy[rIndex][cIndex]
        cell.shipId = ship.id
        cell.type = cellType.SHIP
    });
    setShipMarginOnBoard(copy, ship)
    // printMatrix(copy)
    return copy
}