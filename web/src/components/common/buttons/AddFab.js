import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

export const AddFab = props => {
    const style = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };
    return <Fab color="primary" style={style} {...props}>
        <AddIcon/>
    </Fab>;
};