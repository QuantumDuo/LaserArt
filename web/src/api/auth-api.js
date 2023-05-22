import {del, get, patch, post} from "./api";
import {baseUrl} from "./api";
export const authAPI = {

    info: async () =>
        await get(`Account/Info`),

    role: async () =>
        await get(`Account/Role`),

    login: async (email, password) =>
        await post(`Account/Login`, {email, password}),

    logout: async () =>
        await del(`Account/Logout`),

    register: async (name, email, password, confirmPassword) =>
        await post(`Account/Register`, {name, email, password, confirmPassword}, {callbackUrl: `${window.location.origin}/register/confirm`}),

    confirmEmail: async (id, code) =>
        await get(`Account/ConfirmEmail`, {id, code}),

    delete: async () =>
        await del(`Account/Delete`),

    changeName: async name =>
        await patch(`Account/ChangeName`, {name}),

    forgotPassword: async (email, callbackUrl) =>
        await post(`Account/ForgotPassword`, {email}, {callbackUrl}),

    resetPassword: async (email, password, confirmPassword, code) =>
        await post(`Account/ResetPassword`, {email, password, confirmPassword, code}),

    changePassword: async (oldPassword, newPassword, confirmPassword) =>
        await post(`Account/ChangePassword`, {oldPassword, newPassword, confirmPassword}),

}
