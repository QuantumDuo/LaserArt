import {useTranslation} from "react-i18next";
import React, {memo} from "react";
import {Box, Card, Stack, Typography} from "@mui/material";
import {EditDialogButton} from "../dialogs/EditDialogButton";
import {DeleteButton} from "../buttons/DeleteButton";
import {ChangeNameDialog} from "../dialogs/ChangeNameDialog";
import {deleteEmployee, rename} from "../../../store/employee";

import {RenameIconButton} from "../buttons/IconButtons";

export const EmployeeListItem = memo(
    ({employee}) => {

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
            </Card>
        )
    }
)