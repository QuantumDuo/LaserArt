import {CustomTextField} from "../inputs/CustomTextField";
import React, {memo} from "react";
import {resetErrors, selector} from "../../../store/materials";
import {useFormik} from "formik";
import {EditDialog} from "./EditDialog";
import {numberValidation, stringRequired} from "../../../utils/validation";
import * as yup from "yup";
import {useErrors, useReset} from "../../../utils/hook/hooks";


export const MaterialEditDialog = memo(
    ({material, open, onClose, onSubmit}) => {
        const errors = useErrors(selector, resetErrors)
        const title = material.id ? "Edit material" : "Add material"
        const initialValues = {
            name: "",
            price: 0,
            ...material
        }
        const validationSchema = yup.object({
            name: stringRequired,
            price: numberValidation
        })
        const formik = useFormik({initialValues, validationSchema, onSubmit, enableReinitialize: true})
        const fields = [
            <CustomTextField name="name" formik={formik} label="Name"/>,
            <CustomTextField name="price" formik={formik} label="Price"/>,
        ]
        useReset(open, formik.resetForm);
        return <EditDialog title={title}
                           open={open}
                           onClose={onClose}
                           formik={formik}
                           errors={errors}
                           fields={fields}/>;
    }
)