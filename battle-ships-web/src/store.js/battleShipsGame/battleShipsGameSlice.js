import { createSlice } from '@reduxjs/toolkit'
import { createNewBoard, createShips, updateReadyShipOnBoard, randomPositionOnBoard } from '../../games/battle-ships/battleShipsUtils'
import { cellState } from '../../games/battle-ships/constants'



const initialState = {
    id: 1,
    moves: 0,
    start: false,
    moves: 0,
    player: {
      name: 'Avi',
      shoots: [],
      board: createNewBoard(10),
      ships: createShips([5, 4, 3, 2]),
    },
    bot: {
      name: 'BOT 2024',
      shoots: [],
      markerBoard: createNewBoard(10, { state: cellState.HIDDEN }),
      ...randomPositionOnBoard(createNewBoard(10), createShips([5, 4, 3, 2]))
    }
}

const battleShipsGameSlice = createSlice({
  name: 'battleShipsGame',
  initialState,
  reducers: {
    setShip: (state, action) => {
      const { id } = action.payload
      const index = state.player.ships.findIndex(s => s.id === id)
      if (index !== -1) {
        const ship = { ...action.payload, ready: true }
        state.player.ships[index] = ship
        updateReadyShipOnBoard(state.player.board, ship)
      }
    },
    setPlayerShoots: (state, action) => {
      state.moves++
      state.player.shoots.push(action.payload)
    }
  },
  selectors: {
    getBoard: (state) => state.player.board,
    getShips: (state) => state.player.ships,
    getIsPrepare: (state) => state.player.ships.every((s) => s.size === s.position.length),
    getBot: (state) => state.bot,
    getPlayer: (state) => state.player,
    getIsPlayerTurn: (state) => state.moves % 2 === 0
  }
})

// Action creators are generated for each case reducer function
export const { setShip, setPlayerShoots } = battleShipsGameSlice.actions
export const { getBoard, getShips, getIsPrepare, getBot, getPlayer, getIsPlayerTurn } = battleShipsGameSlice.selectors

export default battleShipsGameSlice
