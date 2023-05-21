import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import React from "react";
import {CustomTextField} from "../inputs/CustomTextField";
import {EditDialog} from "./EditDialog";
import {stringRequired} from "../../../utils/validation";
import * as yup from "yup";
import {useDispatch} from "react-redux";

export const ChangeNameDialog = ({user, open, onClose, onSubmit}) => {
    const {t} = useTranslation()
    useDispatch();
    const initialValues = {
        name: "",
        ...user
    }
    const validationSchema = yup.object({
        name: stringRequired(t)
    });
    const formik = useFormik({initialValues, validationSchema, onSubmit});
    const fields = <CustomTextField key="name" name="name" formik={formik} label={t("Name")}/>
    return <EditDialog title={t("Change name")}
                       open={open}
                       onClose={onClose}
                       formik={formik}
                       fields={fields}/>;
};