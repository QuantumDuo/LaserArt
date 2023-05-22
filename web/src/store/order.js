import {createSlice} from "@reduxjs/toolkit";
import {PagedArray} from "../utils/pagedArray";
import {
    commonDelete,
    commonGet,
    commonInitialState, commonPatch,
    commonPost,
    commonPut,
    commonReducers,
    getSelector
} from "./common";


const {actions, name, reducer} = createSlice({
    name: 'order',
    initialState: {
        ...commonInitialState,
        order: new PagedArray(),
    },
    reducers: {
        ...commonReducers,
        orderSuccess: (state, {payload}) => {
            state.order = new PagedArray(payload)
        }
    }
});

export default reducer

export const selector = getSelector(name)
export const {orderSuccess, resetErrors, setErrors, setUpdated} = actions
export const getOrders = (filter = null) => commonGet('Order', filter, orderSuccess)
export const addOrders = order => commonPost('Order', order, setUpdated, setErrors)
export const deleteOrders = id => commonDelete('Order', id, setUpdated, setErrors)
export const acceptOrder = id => commonPatch('Order/Accept', {id}, setUpdated, setErrors)
export const doOrder = id => commonPatch('Order/Do', {id}, setUpdated, setErrors)
export const getUnaccepted = (filter = null) => commonGet('Order/Unaccepted', filter, orderSuccess)