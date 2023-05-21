import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import React from "react";
import {CustomTextField} from "../inputs/CustomTextField";
import {resetErrors, selector} from "../../../store/service/caterings";
import {EditDialog} from "./EditDialog";
import {useErrors, useReset} from "../../../utils/hook/hooks";
import {
    confirmPasswordValidation,
    emailValidation,
    passwordValidation,
    stringRequired
} from "../../../utils/validation";
import * as yup from "yup";
import {useDispatch} from "react-redux";

export const EmployeeRegisterDialog = ({cateringId, open, onClose, onSubmit}) => {
    const errors = useErrors(selector, resetErrors)
    const dispatch = useDispatch()
    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        cateringId
    }
    const validationSchema = yup.object({
        name: stringRequired,
        email: emailValidation,
        password: passwordValidation,
        confirmPassword: confirmPasswordValidation
    });
    const formik = useFormik({initialValues, validationSchema, onSubmit});
    const fields = [
        <CustomTextField key="name" name="name" formik={formik} label={"Name"}/>,
        <CustomTextField key="email" name="email" formik={formik} label={"Email"}/>,
        <CustomTextField key="password" name="password" type="password" formik={formik} label={"Password"}/>,
        <CustomTextField key="confirmPassword" name="confirmPassword" type="password" formik={formik}
                         label={"Confirm password"}/>
    ]
    useReset(open, formik.resetForm);
    return <EditDialog title={"Add employee"}
                       open={open}
                       onClose={onClose}
                       formik={formik}
                       errors={errors}
                       fields={fields}/>;
};