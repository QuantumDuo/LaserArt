import React, {memo, useCallback} from 'react';
import {useFormik} from 'formik';
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {confirmPasswordValidation, emailValidation, passwordValidation, stringRequired} from "../../utils/validation";
import * as yup from "yup";
import {register, resetErrors, selector} from "../../store/auth"
import {Button, Container, Stack, Typography} from "@mui/material";
import {Errors} from "../common/Errors";
import {CustomTextField} from "../common/inputs/CustomTextField";
import {useErrors, useReset, useUpdate} from "../../utils/hook/hooks";


export const RegisterPage = memo(
    () => {
        const errors = useErrors(selector, resetErrors)
        const role = useSelector(selector("role"))
        const isRegistered = useUpdate(selector)
        const dispatch = useDispatch()

        const initialValues = {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
        const validationSchema = yup.object({
            name: stringRequired,
            email: emailValidation,
            password: passwordValidation,
            confirmPassword: confirmPasswordValidation
        });
        const onSubmit = useCallback(
            values => {
                dispatch(register(values));
            },
            []
        )
        const formik = useFormik({initialValues, validationSchema, onSubmit});
        useReset(open, formik.resetForm);
        return isRegistered
            ? <Navigate to={"/register/confirm"}/>
            : role
                ? <Navigate to={"/"}/>
                : <form onSubmit={formik.handleSubmit}>
                    <Container maxWidth="sm">
                        <Stack spacing={4}>
                            <Typography variant="h3" align="center">
                                {"Register"}
                            </Typography>
                            <Errors errors={errors}/>
                            <CustomTextField name="name" formik={formik} label={"Name"}/>
                            <CustomTextField name="email" formik={formik} label={"Email"}/>
                            <CustomTextField name="password" type="password" formik={formik} label={"Password"}/>
                            <CustomTextField name="confirmPassword" type="password" formik={formik}
                                             label={"Confirm password"}/>
                            <Stack spacing={2}>
                                <Button variant="contained" type="submit">
                                    {"Sign up"}
                                </Button>
                            </Stack>
                        </Stack>
                    </Container>
                </form>;

    }
)