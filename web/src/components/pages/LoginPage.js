import React, {memo, useCallback} from 'react';
import {useFormik} from 'formik';
import {Navigate, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {emailValidation, passwordValidation} from "../../utils/validation";
import * as yup from "yup";
import {resetErrors, selector, signIn} from "../../store/auth";
import {Button, Container, Stack, Typography} from "@mui/material";
import {Errors} from "../common/Errors";
import {CustomTextField} from "../common/inputs/CustomTextField";
import {useErrors, useReset} from "../../utils/hook/hooks";

export const LoginPage = memo(
    () => {
        const errors = useErrors(selector, resetErrors)
        const role = useSelector(selector("role"))
        const dispatch = useDispatch()
        const initialValues = {email: '', password: ''};
        const validationSchema = yup.object({email: emailValidation, password: passwordValidation});
        const onSubmit = useCallback(
            values => {
                dispatch(signIn(values));
            },
            []
        )
        const formik = useFormik({initialValues, validationSchema, onSubmit});
        useReset(open, formik.resetForm);
        return role
            ? <Navigate to={"/"}/>
            : <form onSubmit={formik.handleSubmit}>
                <Container maxWidth="sm">
                    <Stack spacing={4}>
                        <Typography variant="h3" align="center">
                            {"Login"}
                        </Typography>
                        <Errors errors={errors}/>
                        <CustomTextField name="email" formik={formik} label={"Email"}/>
                        <CustomTextField name="password" type="password" formik={formik} label={"Password"}/>
                        <Typography variant="body1" align="center">
                            <NavLink to="/forgot">
                                {"Forgot password?"}
                            </NavLink>
                        </Typography>
                        <Stack spacing={2}>
                            <Button variant="contained" type="submit">
                                {"Log in"}
                            </Button>
                        </Stack>
                        <Typography variant="body1" align="center">
                            {"No account?"}&nbsp;
                            <NavLink to="/register">
                                {"Create one"}
                            </NavLink>
                        </Typography>
                    </Stack>
                </Container>
            </form>
    }
)
