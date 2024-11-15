import { configureStore, createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState: true,
    reducers: {
        toggleTheme: (state) => state = !state

    }
})

export const { toggleTheme } = themeSlice.actions

export const store = configureStore({
    reducer: {
        themeKey: themeSlice.reducer
    }
});