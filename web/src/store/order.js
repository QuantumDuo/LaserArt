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
export const applyOrder = id => commonPatch('url', {id}, setUpdated, setErrors)