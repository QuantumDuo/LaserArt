import React, {memo, useCallback, useEffect} from "react";
import {Alert, Box, Snackbar, Stack, Step, StepLabel, Stepper} from "@mui/material";
import {useFormik} from "formik";
import 'dayjs/locale/uk'
import 'dayjs/locale/en'
import {Step1} from "./Step1";
import {Step2} from "./Step2";
import {useDispatch} from "react-redux";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import {numberValidation, stringRequired} from "../../utils/validation";
import {withRole} from "../../utils/hoc/withAuth";
import {addOrders, resetErrors, selector, setUpdated} from "../../store/order";
import {useErrors, useStepping, useUpdate} from "../../utils/hook/hooks";
import {Errors} from "../common/Errors";
import {roles} from "../../utils/constants";

const StepperComponent = memo(
    ({activeStep}) => {
        const steps = ['Select material', 'Submit order'];
        return <Stepper activeStep={activeStep}>
            {
                steps.map(
                    label => (
                        <Step key={label}>
                            <StepLabel>
                                {label}
                            </StepLabel>
                        </Step>
                    )
                )
            }
        </Stepper>
    }
)

const SuccessSnackbar = memo(
    ({open}) => {
        const navigate = useNavigate()
        const onClose = useCallback(
            () => navigate("/orders"),
            []
        )
        return (
            <Snackbar open={open}
                      autoHideDuration={6000}
                      onClose={onClose}
                      anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
                <Alert onClose={onClose} severity="success">
                    {"Successfully created"}
                </Alert>
            </Snackbar>
        )
    }
)

export const NewOrderPage = memo(
    withRole(roles.Customer)(
        () => {
            const dispatch = useDispatch()

            const updated = useUpdate(selector, setUpdated);
            const errors = useErrors(selector, resetErrors);
            const [step, handleNext, handleBack] = useStepping();

            const initialValues = {
                time: '',
                material: '',
                height: '',
                width: '',
                file: null
            }
            const validationSchema = yup.object({
                time: stringRequired,
                file: yup.mixed().required('Required'),
                height: numberValidation,
                width: numberValidation
            });
            const onSubmit = useCallback(
                values => {
                    dispatch(addOrders(values))
                },
                [dispatch]
            )
            const formik = useFormik({initialValues, validationSchema, onSubmit})

            const stepsComponents = [
                <Step1 nextStep={handleNext} formik={formik}/>,
                <Step2 backStep={handleBack} formik={formik}/>,
            ]

            useEffect(
                () =>
                    () => {
                        dispatch(setUpdated(false))
                    },
                []
            )
            return (
                <form onSubmit={formik.handleSubmit} style={{height: "100%"}}>
                    <Stack sx={{width: '100%', height: '100%'}} spacing={2}>
                        <StepperComponent activeStep={step}/>
                        <Box flexGrow="1">
                            <Errors errors={errors}/>
                            {stepsComponents[step]}
                        </Box>
                        <SuccessSnackbar open={updated}/>
                    </Stack>
                </form>
            )
        }
    )
)