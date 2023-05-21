import {createSlice} from "@reduxjs/toolkit";
import {PagedArray} from "../utils/pagedArray";
import {commonGet, commonInitialState, commonReducers, getSelector, handleResponse} from "./common";
import {del, patch, post} from "../api/api";

const {actions, name, reducer} = createSlice({
    name: 'service.employees',
    initialState: {
        ...commonInitialState,
        employees: new PagedArray()
    },
    reducers: {
        ...commonReducers,
        employeesSuccess: (state, {payload}) => {
            state.employees = new PagedArray(payload)
        },
    },
});
export default {name, reducer}
export const selector = getSelector(name)
export const {employeesSuccess, resetErrors, setErrors, setUpdated} = actions
export const getEmployees = (filter = null) => commonGet('Account/GetEmployees', filter, employeesSuccess)
export const register = data => async dispatch => {
    const response = await post(`Account/Register/Employee`, data, {callbackUrl: "/register/confirm"});
    await handleResponse(response, dispatch, setUpdated, setErrors);
}
export const rename = ({name, id}) => async dispatch => {
    const response = await patch(`Account/ChangeName/${id}`, {name});
    await handleResponse(response, dispatch, setUpdated, setErrors);
}
export const deleteEmployee = id => async dispatch => {
    const response = await del(`Account/Delete/${id}`)
    await handleResponse(response, dispatch, setUpdated, setErrors);
}