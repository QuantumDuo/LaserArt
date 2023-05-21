import {combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import {configureStore} from '@reduxjs/toolkit';
import auth from './auth'
import app from './app'
import materials from "./materials";


export default configureStore({
    reducer: combineReducers({
        app,
        auth,
        materials
    }),
    middleware: [thunkMiddleware]
});
