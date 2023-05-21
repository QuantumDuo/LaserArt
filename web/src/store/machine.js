








import {createSlice} from "@reduxjs/toolkit";
import {
    commonDelete,
    commonGet,
    commonInitialState,
    commonPost,
    commonPut,
    commonReducers,
    getSelector
} from "./common";
import {PagedArray} from "../utils/pagedArray";

const {actions, name, reducer} = createSlice({
    name: 'machines',
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
export const getMachines = (filter = null) => commonGet('Material', filter, materialsSuccess)
export const editMaterials = material => commonPut('Material', material, setUpdated, setErrors)
export const addMaterials = material => commonPost('Material', material, setUpdated, setErrors)
export const deleteMaterials = id => commonDelete('Material', id, setUpdated, setErrors)