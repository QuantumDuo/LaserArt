import './App.css';
import React, {useEffect} from "react";
import {Header} from "./components/Header";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from 'react-router-dom'
import {Box, CssBaseline, Stack} from "@mui/material";
import {LoginPage} from "./components/pages/LoginPage";
import {initialize, initializedSelector, setInitialized} from "./store/app";
import {RegisterPage} from "./components/pages/RegisterPage";
import {ConfirmPage} from "./components/pages/ConfirmPage";
import {Preloader} from "./components/common/Preloader";
import {useUpdate} from "./utils/hook/hooks";
import {selector} from "./store/auth";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {MaterialsPage} from "./components/pages/MaterialsPage";
import {EmployeesPage} from "./components/pages/EmployeesPage";
import {MachinesPage} from "./components/pages/MachinesPage";
import {OrdersPage} from "./components/pages/OrdersPage";
import {NewOrderPage} from "./components/pages/NewOrderPage";
import {UnacceptedOrdersPage} from "./components/pages/UnacceptedOrdersPage";

const theme = createTheme({
    components: {
        MuiPaper: {
            defaultProps: {
                elevation: 3
            },
        },
    },
});
const TempMain = () => <div>Dima is chort</div>;
const Temp404 = () => <div>404 NOT FOUND</div>
export const App = () => {
    const initialized = useSelector(initializedSelector)
    const updated = useUpdate(selector)
    const dispatch = useDispatch()
    useEffect(
        () => {
            dispatch(setInitialized(false));
            dispatch(initialize())
        },
        [updated]
    )
    return !initialized
        ? <Preloader/>
        : <ThemeProvider theme={theme}>
            <Stack spacing={5} sx={{height: "100%"}}>
                <CssBaseline/>
                <Header/>
                <Box component="main" sx={{height: "100%"}}>
                    <Routes>
                        <Route path='/' element={<TempMain/>} exact/>
                        <Route path='/confirm' element={<ConfirmPage/>}/>
                        <Route path='/login' element={<LoginPage/>}/>
                        <Route path='/register' element={<RegisterPage/>}/>
                        <Route path='/materials' element={<MaterialsPage/>}/>
                        <Route path='/employees' element={<EmployeesPage/>}/>
                        <Route path='/machines' element={<MachinesPage/>}/>
                        <Route path='/orders' element={<OrdersPage/>}/>
                        <Route path='/orders/unaccepted' element={<UnacceptedOrdersPage/>}/>
                        <Route path='/new_order' element={<NewOrderPage/>}/>
                        <Route path='*' element={<Temp404/>}/>
                    </Routes>
                </Box>
            </Stack>
        </ThemeProvider>
}
