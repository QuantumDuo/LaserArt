import React, {memo} from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import {Errors} from "../Errors";
import Button from "@mui/material/Button";

export const EditDialog = memo(
    ({title, formik, onClose, open, errors, fields}) =>
        <Dialog open={open} keepMounted onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <DialogTitle>{title}</DialogTitle>
                    <Stack spacing={2}>
                        <Errors errors={errors}/>
                        {fields}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Revert</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </form>
        </Dialog>
)