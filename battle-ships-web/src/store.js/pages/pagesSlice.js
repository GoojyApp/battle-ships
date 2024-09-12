import { createSlice } from '@reduxjs/toolkit'
import { appPages } from '../../constants/pages'

const initialState = {
    pages: Object.values(appPages),
    selectedPageId: appPages.BATTLE_SHIPS.id,
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.selectedPageId = action.payload
    },
  },
  selectors: {
    getPages: (state) => state.pages,
    getSelectedPage: (state) => state.pages.find(p => p.id === state.selectedPageId)
  }
})

// Action creators are generated for each case reducer function
export const { setPage } = navigationSlice.actions
export const navigationSelectors = navigationSlice.selectors
export default navigationSlice
