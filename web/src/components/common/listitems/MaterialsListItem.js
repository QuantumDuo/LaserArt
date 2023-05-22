import {Box, Card, Stack, Typography} from "@mui/material";
import React, {memo, useCallback} from "react";
import {EditDialogButton} from "../dialogs/EditDialogButton";
import {DeleteButton} from "../buttons/DeleteButton";
import {deleteMaterials, editMaterials} from "../../../store/materials";
import {MaterialEditDialog} from "../dialogs/MaterialEditDialog";





export const MaterialsListItem = memo(
    ({material}) => {

        return <Card sx={{padding: 1}}>
            <Stack direction="row" alignItems="center">
                <Box sx={{flexGrow: 1}}>
                    <Typography>
                        {material.name}
                    </Typography>
                    <Typography>
                        {`${(material.price)}`}<span> $/cm<sup>2</sup></span>
                    </Typography>
                </Box>
                <EditDialogButton EditDialog={MaterialEditDialog}
                                  editAction={editMaterials}
                                  material={material}/>
                <DeleteButton deleteAction={deleteMaterials} id={material.id}/>
            </Stack>
        </Card>
    }
)