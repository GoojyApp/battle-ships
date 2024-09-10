import { createSlice } from '@reduxjs/toolkit'
import { createNewBoard, createShips } from '../../games/battle-ships/battleShipsUtils'

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
        state.ships[index] = action.payload
      }
    },
  },
  selectors: {
    getBoard: (state) => state.board,
    getShips: (state) => state.ships,
  }
})

// Action creators are generated for each case reducer function
export const { setShip } = battleShipsGameSlice.actions
export const { getBoard, getShips } = battleShipsGameSlice.selectors

export default battleShipsGameSlice
