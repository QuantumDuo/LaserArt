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
import {get} from "../api/api";


const {actions, name, reducer} = createSlice({
    name: 'order',
    initialState: {
        ...commonInitialState,
        order: new PagedArray(),
        price: null
    },
    reducers: {
        ...commonReducers,
        orderSuccess: (state, {payload}) => {
            state.order = new PagedArray(payload)
        },
        priceSuccess: (state, {payload}) => {
            state.price = payload
        }
    }
});

export default reducer

export const selector = getSelector(name)
export const {orderSuccess, resetErrors, setErrors, setUpdated, priceSuccess} = actions
export const getOrders = (filter = null) => commonGet('Order', filter, orderSuccess)
export const addOrders = order => commonPost('Order', order, setUpdated, setErrors)
export const deleteOrders = id => commonDelete('Order', id, setUpdated, setErrors)
export const acceptOrder = id => commonPatch('Order/Accept', {id}, setUpdated, setErrors)
export const doOrder = id => commonPatch('Order/Do', {id}, setUpdated, setErrors)
export const getUnaccepted = (filter = null) => commonGet('Order/Unaccepted', filter, orderSuccess)
export const getPrice = order => async dispatch => {
    const response = await get("Order/Price", order)
    if (response.ok) {
        const data = await response.text()
        dispatch(priceSuccess(data))
    }
    else {
        const data = await response.json();
        dispatch(setErrors(data))
    }
}