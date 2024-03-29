import {Card, CardActionArea, Typography} from "@mui/material";
import React, {memo} from "react";


export const MaterialsListButton = memo(
    ({material, onClick}) => {

        return <Card>
            <CardActionArea sx={{padding: 1}} onClick={onClick}>
                <Typography variant='h6'>
                    Material: {material.name}
                </Typography>
                <Typography variant='h6'>
                    Price: {`${(material.price)}`}<span> $/cm<sup>2</sup></span>
                </Typography>
            </CardActionArea>
        </Card>
    }
)