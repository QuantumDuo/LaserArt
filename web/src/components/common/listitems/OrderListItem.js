import {Box, Button, Card, Chip, Stack, Typography} from "@mui/material";
import React, {memo, useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {acceptOrder, doOrder} from "../../../store/order";
import {selector} from "../../../store/auth";
import {baseUrl} from "../../../api/api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import DownloadIcon from '@mui/icons-material/Download';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';

dayjs.extend(utc)

const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
};


export const OrderListItem = memo(
    ({order, readonly}) => {

        const dispatch = useDispatch()
        const info = useSelector(selector("info"))
        const date = dayjs.utc(order.time).toDate();
        const formattedTime = Intl.DateTimeFormat('en', options).format(date)
        const onAccept = useCallback(
            () => {
                dispatch(acceptOrder(order.id))
            },
            [dispatch, order]
        )
        const onDo = useCallback(
            () => {
                dispatch(doOrder(order.id))
            },
            [dispatch, order]
        )
        const onDownload = () => {
            const link = document.createElement("a");
            link.href = `${baseUrl}Order/Doc?id=${order.id}`;
            link.click();
        };

        const style = useMemo(
            () => ({
                "Unaccepted": "error",
                "Accepted": "info",
                "Done": "success"
            }),
            [order.status]
        )

        return <Card sx={{padding: 1}}>
            <Stack direction="row" alignItems="stretch" spacing={1}>
                <Box sx={{flexGrow: 1}}>
                    <Typography variant='h6'>
                        Price: {`$${(order.price)}`}
                    </Typography>
                    <Typography variant='h6'>
                        Time: {formattedTime}
                    </Typography>
                    <Typography variant='h6'>
                        Height: {order.height} | Width: {order.width}
                    </Typography>
                    <Typography variant='h6'>
                        Material: {order.material.name}
                    </Typography>
                </Box>
                <Stack direction="row" alignItems="end" spacing={1}>
                    <Box></Box>
                    {
                        readonly || order.status === "Unaccepted" &&
                        <Button onClick={onAccept} variant="outlined" color="success" size='large'
                                endIcon={<AddTaskIcon/>}>Accept</Button>
                    }
                    {
                        readonly || order.status === "Accepted" && order.employeeId === info.id &&
                        <Button onClick={onDo} variant="outlined" color="success" size='large'
                                startIcon={<DoneOutlinedIcon/>}>Do</Button>
                    }
                </Stack>
                <Stack alignItems="stretch" justifyContent="space-between">
                    <Chip variant="outlined" sx={{fontSize:"1.1em"}} color={style[order.status]} label={order.status}/>
                    <Button onClick={onDownload} variant="outlined" size='large' color='primary'
                            endIcon={<DownloadIcon/>}>
                        Download
                    </Button>
                </Stack>

            </Stack>
        </Card>
    }
)