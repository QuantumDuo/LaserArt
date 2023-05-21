import React, {memo} from 'react';
import {useTranslation} from "react-i18next";
import {Box, Typography} from "@mui/material";

export const Footer = memo(
    () => {
        const {t} = useTranslation()
        return <footer style={{textAlign: "center"}}>
            <Box sx={{backgroundColor: 'primary.main'}} padding={2}>
                <Typography color="white">
                    &copy;{t("Geneirodan Jekin. All rights not reserved! For all legal matters contact noone.")}
                </Typography>
            </Box>
        </footer>;
    }
)
