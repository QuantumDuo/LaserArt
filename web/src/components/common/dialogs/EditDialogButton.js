import {useDispatch} from "react-redux";
import {useOpen} from "../../../utils/hook/hooks";
import React, {memo, useCallback} from "react";
import {EditIconButton} from "../buttons/IconButtons";

export const EditDialogButton = memo(
    ({EditDialog, EditButton = EditIconButton, editAction, convertValues = values => values, ...restProps}) => {
        const dispatch = useDispatch()
        const [open, onClick, onClose] = useOpen()
        const onSubmit = useCallback(
            values => {
                values = convertValues(values)
                dispatch(editAction(values))
                onClose()
            },
            [dispatch, onClose]
        )
        return <>
            <EditDialog open={open} onClose={onClose} onSubmit={onSubmit} {...restProps}/>
            <EditButton onClick={onClick}/>
        </>
    }
)