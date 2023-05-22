import {Stack, Typography} from "@mui/material";
import React, {memo} from "react";
import {useTranslation} from "react-i18next";

export const Errors = memo(
    ({errors}) => {
        const {t} = useTranslation()
        if (errors && errors["Common"])
            return <Stack spacing={2}>
                {errors["Common"].map(error =>
                    <Typography variant="body1" align="center" key={error}>
                        {t(error)}
                    </Typography>)}
            </Stack>;
    }
)