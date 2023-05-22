import {createSlice} from "@reduxjs/toolkit";
import {PagedArray} from "../utils/pagedArray";
import {
    commonDelete,
    commonGet,
    commonInitialState,
    commonPost,
    commonPut,
    commonReducers,
    getSelector
} from "./common";

const {actions, name, reducer} = createSlice({
    name: 'machine',
    initialState: {
        ...commonInitialState,
        machines: new PagedArray(),
    },
    reducers: {
        ...commonReducers,
        machinesSuccess: (state, {payload}) => {
            state.machines = new PagedArray(payload)
        }
    }
});

export default reducer

export const selector = getSelector(name)
export const {machinesSuccess, resetErrors, setErrors, setUpdated} = actions
export const getMachines = (filter = null) => commonGet('Machine', filter, machinesSuccess)
export const editMachines = machine => commonPut('Machine', machine, setUpdated, setErrors)
export const addMachines = machine => commonPost('Machine', machine, setUpdated, setErrors)
export const deleteMachines = id => commonDelete('Machine', id, setUpdated, setErrors)