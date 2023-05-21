import {Box, Card, Stack, Typography} from "@mui/material";
import React, {memo} from "react";
import {EditDialogButton} from "../dialogs/EditDialogButton";
import {DeleteButton} from "../buttons/DeleteButton";


export const MachineListItem = memo(
    ({machine}) => {

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
                            {machine.employee.name}
                        </Typography>
                    </Box>
                    <EditDialogButton EditDialog={ChangeNameDialog} editAction={rename}
                                      machine={machine}/>
                    <DeleteButton deleteAction={deleteMachine} id={machine.id}/>
                </Stack>
            </Card>
        )
    }
)