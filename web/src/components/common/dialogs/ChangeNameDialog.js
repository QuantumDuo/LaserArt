import {useFormik} from "formik";
import React, {memo} from "react";
import {CustomTextField} from "../inputs/CustomTextField";
import {EditDialog} from "./EditDialog";
import {stringRequired} from "../../../utils/validation";
import * as yup from "yup";
import {useDispatch} from "react-redux";

export const ChangeNameDialog = memo(
    ({user, open, onClose, onSubmit}) => {
        useDispatch();
        const initialValues = {
            name: "",
            ...user
        }
        const validationSchema = yup.object({
            name: stringRequired
        });
        const formik = useFormik({initialValues, validationSchema, onSubmit});
        const fields = <CustomTextField key="name" name="name" formik={formik} label={"Name"}/>
        return <EditDialog title={"Change name"}
                           open={open}
                           onClose={onClose}
                           formik={formik}
                           fields={fields}/>;
    }
)
