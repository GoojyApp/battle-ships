import { createMatrix, removeItem } from "../../utils"
import { cellState, cellType, orientations } from "./constants"



export const createNewBoard = (size, cellData) => {
    const board = createMatrix(size, (rIndex, cIndex) => ({ 
        id: `${rIndex},${cIndex}`,
        rIndex,
        cIndex,
        type: cellType.EMPTY,
        ...cellData
    }))
    return board
}

export const createShips = (shipSizes = [5, 4, 3, 2]) => {
    return shipSizes.map((size, i) => createShip(size, i + 1))
}

export const createShip = (size, id) => {
    return { size, id, position: [] }
}

export const randomPositionOnBoard = (board, ships) => {
    ships.forEach((ship) => {
        const cells = getCellsEditableOnBoard(board, ship)
        const position = getRandomPositionOnBoard(ship.size, board, cells)
        ship.position = position ?? []
        updateReadyShipOnBoard(board, ship)
        // printMatrix(board)
    })
    return { board, ships }
}

const getRandomPositionOnBoard = (size, board, cells) => {

    if (!cells.length) return

    let cellsLeft = [...cells]
    const index = ~~(Math.random() * cellsLeft.length)
    const randomCell = cellsLeft[index]
    cellsLeft = removeItem(cellsLeft, index)
    const orientation = [orientations.HORIZONTAL, orientations.VERTICAL]
    let orientationIndex = ~~(Math.random() * 2)

    const position = getPositionFrom(randomCell, size, board, orientation[orientationIndex]) ?? 
        getPositionFrom(randomCell, size, board, orientation[(orientationIndex + 1) % 2])
    if (!position) return getRandomPositionOnBoard(size, board, cellsLeft)

    return position
}

const getPositionFrom = (from, size, board, orientation) => {
    const position = []
    let rIndex = from.rIndex
    let cIndex = from.cIndex
    for (let i = 0; i < size; i++) {
        if (orientation === orientations.HORIZONTAL) {
            cIndex++
        } else {
            rIndex++
        }
        const cell = board[rIndex]?.[cIndex]
        if (!isValidCellPosition(cell)) return
        position.push(cell)
    }
    return position
}

const isValidCellPosition = (cell) => {
    return cell && cell.type === cellType.EMPTY
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

export const getCellsEditableOnBoard = (board, ship) => {
    let emptyCells = []
    let nextValidPosition = undefined
    if (!ship) return emptyCells
    const { position } = ship
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

export const setShipOnBoard = (board, ship) => {
    ship.position.forEach(({ rIndex, cIndex }) => {
        const cell = board[rIndex][cIndex]
        cell.shipId = ship.id
        cell.type = cellType.SHIP
    });
    // printMatrix(copy)
}

export const updateReadyShipOnBoard = (board, ship) => {
    setShipOnBoard(board, ship)
    setShipMarginOnBoard(board, ship)
}
