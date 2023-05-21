import React, {memo, useCallback} from "react";
import {useDispatch} from "react-redux";
import {DeleteIconButton} from "./IconButtons";

export const DeleteButton = memo(
    ({deleteAction, id}) => {
        const dispatch = useDispatch()
        const onClick = useCallback(
            () => {
                dispatch(deleteAction(id))
            },
            [dispatch, id]
        )
        return <DeleteIconButton onClick={onClick}/>;
    }
)