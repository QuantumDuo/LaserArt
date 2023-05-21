import React, {memo, useCallback, useState} from 'react'
import {useTranslation} from 'react-i18next';
import {AppBar, IconButton, MenuItem, Popover, Stack, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selector, signOut} from "../store/auth";
import {roles} from "../utils/constants";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";

const AccountButtonComponent = memo(
    () => {
        const dispatch = useDispatch()
        const info = useSelector(selector("info"))
        const [anchorEl, setAnchorEl] = useState(null)
        const handleMenu = useCallback(
            event => setAnchorEl(event.currentTarget),
            [setAnchorEl]
        )
        const onClose = useCallback(
            () => setAnchorEl(null),
            [setAnchorEl]
        )
        const logoutCallback = useCallback(
            () => {
                dispatch(signOut())
            },
            [dispatch]
        )
        return (
            <div>
                <IconButton size="large" onClick={handleMenu} color="inherit">
                    <AccountCircle/>
                </IconButton>
                <Popover
                    anchorEl={anchorEl}
                    anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                    keepMounted
                    transformOrigin={{vertical: "top", horizontal: "right"}}
                    open={Boolean(anchorEl)}
                    onClose={onClose}>
                    <Stack padding={2} direction="row" alignItems="center">
                        {info.name}
                    </Stack>
                    <MenuItem onClick={logoutCallback}>
                        {"Logout"}
                    </MenuItem>
                </Popover>
            </div>
        )
    }
)
const LoginButton = memo(
    () => {
        const navigate = useNavigate()
        const onClick = useCallback(() => navigate("/login"), []);
        return (
            <IconButton size="large" onClick={onClick} color="inherit">
                <LoginIcon/>
            </IconButton>
        )
    }
)

export const Header = memo(
    () => {
        const {t} = useTranslation()
        const navigate = useNavigate()
        const role = useSelector(selector("role"))
        const onLogoClick = useCallback(
            () => navigate("/"),
            [navigate]
        )
        const onMakeOrderClick = useCallback(
            () => navigate("/my_orders/new"),
            [navigate]
        )
        return (
            <AppBar component="header" position="sticky" sx={{display: "flex"}}>
                <Toolbar>
                    <Typography variant="h5" component="p" onClick={onLogoClick}>
                        LaserArt
                    </Typography>
                    <Stack direction="row"
                           ml={3}
                           spacing={3}
                           sx={{flexGrow: 1}}
                           component="nav">
                        {
                            role !== roles.Admin &&
                            <Button variant="contained" color="success" onClick={onMakeOrderClick}>
                                {t("Make order")}
                            </Button>
                        }
                        {
                            role === roles.Customer &&
                            <Button variant="contained" color="success" onClick={onMakeOrderClick}>
                                {t("Make order")}
                            </Button>
                        }
                    </Stack>
                    <Stack direction="row" justifyContent="flex-end" spacing={3}>
                        {role
                            ? <AccountButtonComponent/>
                            : <LoginButton/>}
                    </Stack>
                </Toolbar>
            </AppBar>
        )
    }
)
