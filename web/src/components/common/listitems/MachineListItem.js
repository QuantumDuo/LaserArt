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
            <Card sx={{padding: 1}}>
                <Stack direction="row" alignItems="center">
                    <Box sx={{flexGrow: 1}}>
                        <Typography>
                            {machine.name}
                        </Typography>
                        <Typography>
                            {machine.laserType}
                        </Typography>
                        <Typography>
                            {machine.power}
                        </Typography>
                        <Typography>
                            {machine.height}
                        </Typography>
                        <Typography>
                            {machine.width}
                        </Typography>
                        <Typography>
                            {machine.speed}
                        </Typography>
                    </Box>
                    <EditDialogButton EditDialog={MachineEditDialog}
                                      editAction={editMachines}
                                      machine={machine}/>
                    <DeleteButton deleteAction={deleteMachines} id={machine.id}/>
                </Stack>
            </Card>
        )
    }
)