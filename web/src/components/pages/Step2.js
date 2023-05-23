import React, {memo, useCallback, useEffect} from 'react';
import {Button, Container, IconButton, Stack, TextField, Typography} from "@mui/material";
import {CustomTextField} from "../common/inputs/CustomTextField";
import {LocalizationProvider, MobileDateTimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {useDispatch, useSelector} from "react-redux";
import {getPrice, priceSuccess, selector} from "../../store/order";

export const Step2 = memo(
    ({formik, backStep}) => {
        const onChange = useCallback(
            value => formik.setFieldValue("time", value.toString()),
            [formik]
        )
        const onFileChange = useCallback(
            event => formik.setFieldValue("file", event.currentTarget.files[0]),
            [formik]
        )
        const price = useSelector(selector("price"))
        const dispatch = useDispatch()
        useEffect(
            () => {
                dispatch(getPrice(formik.values))
            },
            [formik.values]
        )
        useEffect(
            () => () => {
                dispatch(priceSuccess(null))
            },
            []
        )

        return <Container maxWidth="sm">
            <Stack spacing={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDateTimePicker disablePast
                                          label={"Choose date and time"}
                                          value={formik.values.time}
                                          onChange={onChange}
                                          slotProps={{
                                              textField: {
                                                  error: formik.touched.time && Boolean(formik.errors.time),
                                                  helperText: formik.touched.time && formik.errors.time
                                              }
                                          }}/>
                </LocalizationProvider>
                <CustomTextField name="height" type="number" formik={formik} label={"Height"} InputProps={{endAdornment:'cm'}}/>
                <CustomTextField name="width" type="number" formik={formik} label={"Width"} InputProps={{endAdornment:'cm'}}/>
                <Typography variant='h6'>
                    Price: ${price}
                </Typography>
                <TextField label={"File"}
                           InputProps={{
                               readOnly: true,
                               startAdornment: (
                                   <IconButton position="start" variant="contained" component="label">
                                       <AttachFileIcon/> <input hidden id="file" name="file" type="file"
                                                          onChange={onFileChange}/>
                                   </IconButton>
                               )
                           }}
                           value={formik.values.file?.name}>

                </TextField>
                <Typography variant="body1" align="center">
                </Typography>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={backStep}>
                        Back
                    </Button>
                    <Button variant="contained" type="submit">
                        Create
                    </Button>
                </Stack>
            </Stack>
        </Container>
    }
)
