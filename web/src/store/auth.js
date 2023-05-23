import {createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../api/auth-api";
import {commonInitialState, commonReducers, getSelector, handleResponse} from "./common";

const {actions, name, reducer} = createSlice({
    name: 'auth',
    initialState: {
        ...commonInitialState,
        confirmed: null,
        info: null,
        role: null
    },
    reducers: {
        ...commonReducers,
        confirmEmailSuccess: (state, {payload}) => {
            state.confirmed = payload;
        },
        infoSuccess: (state, {payload}) => {
            state.info = payload;
        },
        logoutSuccess: (state, action) => {
            state.role = null;
            state.info = null;
        },
        roleSuccess: (state, {payload}) => {
            state.role = payload;
        }
    },
});
export default reducer
export const selector = getSelector(name)
export const {
    resetErrors,
    setUpdated,
    infoSuccess,
    roleSuccess,
    setErrors,
    logoutSuccess,
    confirmEmailSuccess
} = actions

export const getInfo = () => async dispatch => {
    const response = await authAPI.info()
    if (response.ok) {
        const data = await response.json();
        dispatch(infoSuccess(data))
    }
}

export const getRole = () => async dispatch => {
    const response = await authAPI.role()
    if (response.ok) {
        const data = await response.text();
        dispatch(roleSuccess(data))
    }
}

export const signIn = ({email, password}) => async dispatch => {
    const response = await authAPI.login(email, password)
    await handleResponse(response, dispatch, setUpdated, setErrors);
}

export const signOut = () => async dispatch => {
    const response = await authAPI.logout()
    if (response.ok)
    {
        dispatch(logoutSuccess())
        dispatch(setUpdated(false))
    }
}

export const confirmEmail = ({id, code}) => async dispatch => {
    const response = await authAPI.confirmEmail(id, code)
    dispatch(confirmEmailSuccess(response.ok))
}
export const register = ({name, email, password, confirmPassword}) =>
    async dispatch => {
        const response = await authAPI.register(name, email, password, confirmPassword)
        await handleResponse(response, dispatch, setUpdated, setErrors)
    }

export const rename = ({name}) => async dispatch => {
    const response = await authAPI.changeName(name)
    await handleResponse(response, dispatch, setUpdated, setErrors)
}