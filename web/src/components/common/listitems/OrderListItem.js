import {Box, Button, Card, Stack, Typography} from "@mui/material";
import React, {memo, useCallback} from "react";
import {useDispatch} from "react-redux";
import {applyOrder} from "../../../store/order";


export const OrderListItem = memo(
    ({order,readonly}) => {

        const dispatch = useDispatch()
        const onApply = useCallback(
            () => {
                dispatch(applyOrder(order.id))
            },
            [dispatch,order]
        )

        return <Card sx={{padding: 1}}>
            <Stack direction="row" alignItems="center">
                <Box sx={{flexGrow: 1}}>
                    <Typography>
                        {`$${(order.price)}`}
                    </Typography>
                    <Typography>
                        {order.status}
                    </Typography>
                    <Typography>
                        {order.time}
                    </Typography>
                    <Typography>
                        {order.height}
                    </Typography>
                    <Typography>
                        {order.width}
                    </Typography>
                    <Typography>
                        {order.path}
                    </Typography>
                    <Typography>
                        {order.material.name}
                    </Typography>
                </Box>
                {
                    readonly && <Button onClick={onApply}>Apply</Button>
                }
            </Stack>
        </Card>
    }
)