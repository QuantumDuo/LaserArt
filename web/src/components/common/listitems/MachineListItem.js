import {Box, Card, Stack, Typography} from "@mui/material";
import React, {memo} from "react";
import {EditDialogButton} from "../dialogs/EditDialogButton";
import {DeleteButton} from "../buttons/DeleteButton";
import {MachineEditDialog} from "../dialogs/MachineEditDialog";
import {deleteMachines, editMachines} from "../../../store/machine";


export const MachineListItem = memo(
    ({machine}) => {
console.log(machine)
        return (

                <Stack direction="row" alignItems="center">
                    <Box sx={{flexGrow: 1}}>
                        <Typography variant='h6'>
                            Laser name: {machine.name}
                        </Typography>
                        <Typography variant='h6'>
                            Laser type: {machine.laserType}
                        </Typography>
                        <Typography variant='h6'>
                            Power: {machine.power} | Speed: {machine.speed}
                        </Typography>
                        <Typography variant='h6'>
                            Height: {machine.height} | Width: {machine.width}
                        </Typography>
                    </Box>
                    <EditDialogButton EditDialog={MachineEditDialog}
                                      editAction={editMachines}
                                      machine={machine}/>
                    <DeleteButton deleteAction={deleteMachines} id={machine.id}/>
                </Stack>

        )
    }
)