import {useTranslation} from "react-i18next";
import React, {memo, useCallback, useMemo} from "react";
import {Box, Button, Card, Stack, Typography} from "@mui/material";
import {EditDialogButton} from "../dialogs/EditDialogButton";
import {DeleteButton} from "../buttons/DeleteButton";
import {ChangeNameDialog} from "../dialogs/ChangeNameDialog";
import {deleteEmployee, rename} from "../../../store/employee";

import {RenameIconButton} from "../buttons/IconButtons";
import {MachineEditDialog} from "../dialogs/MachineEditDialog";
import {MachineListItem} from "./MachineListItem";
import {addMachines} from "../../../store/machine";

export const EmployeeListItem = memo(
    ({employee}) => {


        const AddMachineButton = useCallback(
            props =>
                <Button {...props}>
                    {"Add machine"}
                </Button>,
            []
        )
        const machine = useMemo(
            () => employee.machine || {employeeId: employee.id},
            [employee]
        )
        return (
            <Card sx={{padding: 1}}>
                <Stack direction="row" alignItems="center">
                    <Box sx={{flexGrow: 1}}>
                        <Typography>
                            {employee.name}
                        </Typography>
                        <Typography>
                            {employee.email}
                        </Typography>
                    </Box>
                    <EditDialogButton EditDialog={ChangeNameDialog} EditButton={RenameIconButton} editAction={rename}
                                      user={employee}/>
                    <DeleteButton deleteAction={deleteEmployee} id={employee.id}/>
                </Stack>
                {
                    machine.id
                        ? <MachineListItem machine={machine}/>
                        : <EditDialogButton EditDialog={MachineEditDialog}
                                            EditButton={AddMachineButton}
                                            editAction={addMachines}
                                            machine={machine}/>
                }
            </Card>
        )
    }
)