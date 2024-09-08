import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: 1,
    size: 0,
    board: [],
}

const battleShipsGameSlice = createSlice({
  name: 'battleShipsGame',
  initialState,
  reducers: {
    incrementSize: (state) => {
      state.size += 1
    },
    decrementSize: (state) => {
      state.size -= 1
    },
    setSize: (state, action) => {
      state.size = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { incrementSize, decrementSize, setSize } = battleShipsGameSlice.actions

export default battleShipsGameSlice
