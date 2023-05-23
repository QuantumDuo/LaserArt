import {CustomTextField} from "../inputs/CustomTextField";
import React, {memo} from "react";
import {resetErrors, selector} from "../../../store/machine";
import {useFormik} from "formik";
import {EditDialog} from "./EditDialog";
import {numberValidation, stringRequired} from "../../../utils/validation";
import * as yup from "yup";
import {useErrors, useReset} from "../../../utils/hook/hooks";
import {CustomSelect} from "../inputs/CustomSelect";


export const MachineEditDialog = memo(
    ({machine, open, onClose, onSubmit}) => {
        const errors = useErrors(selector, resetErrors)
        const title = machine.id ? "Edit machine" : "Add machine"
        const initialValues = {
            name: "",
            laserType: "",
            power: 0,
            height: 0,
            width: 0,
            speed: 0,
            ...machine
        }
        const validationSchema = yup.object({
            name: stringRequired,
            laserType: stringRequired,
            power: numberValidation,
            height: numberValidation,
            width: numberValidation,
            speed: numberValidation
        })
        const formik = useFormik({initialValues, validationSchema, onSubmit, enableReinitialize: true})
        const fields = [
            <CustomTextField name="name" formik={formik} label="Name"/>,
            <CustomSelect name="laserType" formik={formik} label="Laser Type" items={['Gas','Solid']}/>,
            <CustomTextField name="power" formik={formik} label="Power" InputProps={{endAdornment:'W'}}/>,
            <CustomTextField name="height" formik={formik} label="Height" InputProps={{endAdornment:'cm'}}/>,
            <CustomTextField name="width" formik={formik} label="Width" InputProps={{endAdornment:'cm'}}/>,
            <CustomTextField name="speed" formik={formik} label="Speed" InputProps={{endAdornment:'cm/s'}}/>,
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