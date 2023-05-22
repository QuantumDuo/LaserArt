import {Box, Button, Card, Stack, Typography} from "@mui/material";
import React, {memo, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {acceptOrder, doOrder} from "../../../store/order";
import {selector} from "../../../store/auth";
import {baseUrl} from "../../../api/api";


export const OrderListItem = memo(
    ({order,readonly}) => {

        const dispatch = useDispatch()
        const info = useSelector(selector("info"))
        const onAccept = useCallback(
            () => {
                dispatch(acceptOrder(order.id))
            },
            [dispatch,order]
        )
        const onDo = useCallback(
            () => {
                dispatch(doOrder(order.id))
            },
            [dispatch,order]
        )
        const onDownload = () => {
            const link = document.createElement("a");
            link.href = `${baseUrl}Order/Doc?id=${order.id}`;
            link.click();
        };

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
                    <Button onClick={onDownload} variant="contained" color="primary">
                        Download
                    </Button>
                    <Typography>
                        {order.material.name}
                    </Typography>
                </Box>
                {
                    readonly || order.status==="Unaccepted" && <Button onClick={onAccept}>Accept</Button>}{
                    readonly || order.status==="Accepted" && order.employeeId === info.id && <Button onClick={onDo}>Do</Button>
                }
            </Stack>
        </Card>
    }
)