import React, {memo, useCallback, useState} from 'react'
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
        const navigate = useNavigate()
        const role = useSelector(selector("role"))
        const onLogoClick = useCallback(
            () => navigate("/"),
            [navigate]
        )

        const onMakeOrderClick = useCallback(
            () => navigate("/new_order"),
            [navigate]
        )
        const onOrdersClick = useCallback(
            () => navigate("/orders"),
            [navigate]
        )
        const onEmployeesClick = useCallback(
            () => navigate("/employees"),
            [navigate]
        )
        const onMaterialsClick = useCallback(
            () => navigate("/materials"),
            [navigate]
        )
        const onUnacceptedOrdersClick = useCallback(
            () => navigate("/orders/unaccepted"),
            [navigate]
        )
        return (
            <AppBar component="header" position="sticky" sx={{display: "flex"}}>
                <Toolbar>
                    <Stack direction="row" alignItems="center"
                           spacing={3}
                           sx={{flexGrow: 1}}
                           component="nav">
                        <Typography variant="h4" component="p" onClick={onLogoClick}>
                            LaserArt
                        </Typography>
                        {
                            role && role !== roles.Admin &&
                            <Button variant="inherit" color="success" onClick={onOrdersClick}>
                                {"My orders"}
                            </Button>
                        }
                        {
                            role === roles.Customer &&
                            <Button variant="contained" color="success" onClick={onMakeOrderClick}>
                                {"Make order"}
                            </Button>
                        }
                        {
                            role === roles.Admin &&
                            <Button variant="inherit" color="success" onClick={onEmployeesClick}>
                                {"Employees"}
                            </Button>
                        }
                        {
                            role === roles.Admin &&
                            <Button variant="inherit" color="success" onClick={onMaterialsClick}>
                                {"Materials"}
                            </Button>
                        }
                        {
                            role === roles.Employee &&
                            <Button variant="inherit" color="success" onClick={onUnacceptedOrdersClick}>
                                {"Unaccepted orders"}
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
