import {Box, CircularProgress} from "@mui/material";
import React, {memo} from "react";

const preloaderStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
};
export const Preloader = memo(
    () =>
        <Box sx={preloaderStyle}>
            <CircularProgress/>
        </Box>
)
