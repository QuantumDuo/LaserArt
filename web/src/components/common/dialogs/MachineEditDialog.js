


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
            ...machine
        }
        const validationSchema = yup.object({
            name: stringRequired,
            laserType: stringRequired,
            power: numberValidation,
            height: numberValidation,
            width: numberValidation
        })
        const formik = useFormik({initialValues, validationSchema, onSubmit, enableReinitialize: true})
        const fields = [
            <CustomTextField name="name" formik={formik} label="Name"/>,
            <CustomTextField name="laserType" formik={formik} label="Laser Type"/>,
            <CustomTextField name="price" formik={formik} label="Price"/>,
            <CustomTextField name="price" formik={formik} label="Price"/>,
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