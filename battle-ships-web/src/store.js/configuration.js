import { configureStore } from '@reduxjs/toolkit'
import battleShipsGameSlice from './battleShipsGame/battleShipsGameSlice'
import navigationSlice from './pages/pagesSlice'


const rootReducer = {
    [battleShipsGameSlice.name]: battleShipsGameSlice.reducer,
    [navigationSlice.name]: navigationSlice.reducer
}

export const configureAppStore = () => {
    return configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== 'production',
        // middleware: () => [],
        // enhancers: (getDefaultEnhancers) => getDefaultEnhancers()
    })
}
