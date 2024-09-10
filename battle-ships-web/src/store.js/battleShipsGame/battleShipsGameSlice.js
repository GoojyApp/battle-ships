import { createSlice } from '@reduxjs/toolkit'
import { createNewBoard, createShips, updateReadyShipOnBoard } from '../../games/battle-ships/battleShipsUtils'

const initialState = {
    id: 1,
    board: createNewBoard(10),
    ships: createShips()
}

const battleShipsGameSlice = createSlice({
  name: 'battleShipsGame',
  initialState,
  reducers: {
    setShip: (state, action) => {
      const { id } = action.payload
      const index = state.ships.findIndex(s => s.id === id)
      if (index !== -1) {
        const ship = { ...action.payload, ready: true }
        state.ships[index] = ship
        updateReadyShipOnBoard(state.board, ship)
      }
    },
  },
  selectors: {
    getBoard: (state) => state.board,
    getShips: (state) => state.ships,
    getIsGameReady: (state) => state.ships.every((s) => s.ready),
  }
})

// Action creators are generated for each case reducer function
export const { setShip } = battleShipsGameSlice.actions
export const { getBoard, getShips } = battleShipsGameSlice.selectors

export default battleShipsGameSlice
