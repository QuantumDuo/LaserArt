import * as yup from "yup";

export const stringRequired = yup
    .string()
    .required('Required')
export const emailValidation = yup
    .string()
    .email('Enter a valid email')
    .required('Email is required')
export const passwordValidation = yup
    .string()
    .matches(/[a-z]/g, "Password should contain at least 1 lowercase letter")
    .matches(/[A-Z]/g, "Password should contain at least 1 uppercase letter")
    .matches(/[0-9]/g, "Password should contain at least 1 digit")
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required');

export const confirmPasswordValidation = yup
    .string()
    .required('Confirm your password')
    .test('confirmPassword', 'Passwords must match', function(value){
        return this.parent.password === value
    })

export const numberValidation = yup
    .number()
    .typeError("Must be number")
    .positive("Must be positive")
    .required('Required')
    .round()
