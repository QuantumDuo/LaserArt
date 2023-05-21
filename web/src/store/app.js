import {createSlice} from '@reduxjs/toolkit'
import {getInfo, getRole} from "./auth";

// Slice
const {actions, reducer} = createSlice({
    name: 'app',
    initialState: {
        initialized: false
    },
    reducers: {
        setInitialized: (state, {payload}) => {
            state.initialized = payload;
        },
    },
});
export default reducer
export const {setInitialized} = actions
export const initialize = () => async dispatch => {
    try {
        await dispatch(getRole())
        await dispatch(getInfo())
    } catch (e) {
        console.error(e.message)
    }
    dispatch(setInitialized(true))
}

// Selectors
export const initializedSelector = state => state.app.initialized
