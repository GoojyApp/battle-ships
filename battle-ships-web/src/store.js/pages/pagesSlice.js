import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pages: [],
    selectedPageId: 1,
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.selectedPageId = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPage } = navigationSlice.actions

export default navigationSlice
