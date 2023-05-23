import React, {memo, useCallback, useMemo} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Stack, Typography} from "@mui/material";
import {EditDialogButton} from "../dialogs/EditDialogButton";
import {DeleteButton} from "../buttons/DeleteButton";
import {ChangeNameDialog} from "../dialogs/ChangeNameDialog";
import {deleteEmployee, rename} from "../../../store/employee";

import {RenameIconButton} from "../buttons/IconButtons";
import {MachineEditDialog} from "../dialogs/MachineEditDialog";
import {MachineListItem} from "./MachineListItem";
import {addMachines} from "../../../store/machine";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export const EmployeeListItem = memo(
    ({employee}) => {


        const AddMachineButton = useCallback(
            props =>
                <Button {...props} size="large" startIcon={<AddOutlinedIcon/>}>
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
                <Stack mb={1} direction="row" alignItems="center" spacing="3">
                    <Box sx={{flexGrow: 1}}>
                        <Typography variant='h6'>
                            User name: {employee.name}
                        </Typography>
                        <Typography variant='h6'>
                            Email: {employee.email}
                        </Typography>
                    </Box>
                    <EditDialogButton EditDialog={ChangeNameDialog} EditButton={RenameIconButton} editAction={rename}
                                      user={employee}/>
                    <DeleteButton deleteAction={deleteEmployee} id={employee.id}/>
                </Stack>

                {
                    machine.id
                        ? <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant='h6'>Machine</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <MachineListItem machine={machine}/>

                            </AccordionDetails>
                        </Accordion>
                        : <EditDialogButton EditDialog={MachineEditDialog}
                                            EditButton={AddMachineButton}
                                            editAction={addMachines}
                                            machine={machine}/>
                }
            </Card>
        )
    }
)