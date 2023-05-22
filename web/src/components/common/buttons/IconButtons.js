import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

export const EditIconButton = props =>
    <IconButton {...props}>
        <EditIcon/>
    </IconButton>;
export const DeleteIconButton = props =>
    <IconButton {...props}>
        <DeleteIcon/>
    </IconButton>;
export const RenameIconButton = props =>
    <IconButton {...props}>
        <DriveFileRenameOutlineIcon/>
    </IconButton>;
export const DishesIconButton = props =>
    <IconButton {...props}>
        <RestaurantMenuIcon/>
    </IconButton>;