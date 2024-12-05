import { configureStore, createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState: true,
    reducers: {
        toggleTheme: (state) => state = !state

    }
})

const initialState = {
    _id: null,
    name: '',
    email: '',
    pic: '',
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearUserData: (state) => {
            return initialState;
        },
    }
})

const selectedChatSlice = createSlice({
    name: 'selectedChatSlice',
    initialState: {},
    reducers: {
        setSelectedChat: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearSelectedChat: (state) => {
            return initialState;
        },
    }
})

export const { toggleTheme } = themeSlice.actions
export const { setUserData, clearUserData } = userSlice.actions
export const { setSelectedChat, clearSelectedChat } = selectedChatSlice.actions

export const store = configureStore({
    reducer: {
        themeKey: themeSlice.reducer,
        userKey: userSlice.reducer,
        selectedChatKey: selectedChatSlice.reducer,
    }
});