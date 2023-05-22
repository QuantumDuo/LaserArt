import {TextField} from "@mui/material";
import React from "react";
import {getIn} from "formik";

export const CustomTextField = ({formik: {errors, handleChange, touched, values}, name, ...restProps}) => {
    return <TextField
        name={name}
        value={values[name]}
        onChange={handleChange}
        error={getIn(touched, name) && Boolean(getIn(errors, name))}
        helperText={getIn(touched, name) && getIn(errors, name)}
        {...restProps}
    />;
};