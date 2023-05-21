import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selector} from "../../store/auth";

export const withAuth = WrappedComponent =>
    (props) => {
        const role = useSelector(selector("role"))
        return !role ? <Navigate to='/login'/> : <WrappedComponent {...props}/>;
    };

export const withRole = useRole =>
    WrappedComponent =>
        props => {
            const role = useSelector(selector("role"))
            return role !== useRole ? <Navigate to='/'/> : <WrappedComponent {...props}/>;
        };