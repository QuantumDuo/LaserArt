import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React, {memo} from "react";

export const CustomSelect = memo(({name, formik, items, label, labelId = "type-label"}) => {

    return <FormControl>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select name={name}
                label={label}
                labelId={labelId}
                value={formik.values[name]}
                onChange={formik.handleChange}
                error={formik.touched[name] && Boolean(formik.errors[name])}
                helperText={formik.touched[name] && formik.errors[name]}>
            {items.map(item => <MenuItem value={item}>{item}</MenuItem>)}
        </Select>
    </FormControl>;
}
)