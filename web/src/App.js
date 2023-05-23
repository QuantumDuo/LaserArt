import './App.css';
import React, {useEffect} from "react";
import {Header} from "./components/Header";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from 'react-router-dom'
import {Box, CssBaseline, Stack, Typography} from "@mui/material";
import {LoginPage} from "./components/pages/LoginPage";
import {initialize, initializedSelector, setInitialized} from "./store/app";
import {RegisterPage} from "./components/pages/RegisterPage";
import {ConfirmPage} from "./components/pages/ConfirmPage";
import {Preloader} from "./components/common/Preloader";
import {useUpdate} from "./utils/hook/hooks";
import {selector, setUpdated} from "./store/auth";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {MaterialsPage} from "./components/pages/MaterialsPage";
import {EmployeesPage} from "./components/pages/EmployeesPage";
import {MachinesPage} from "./components/pages/MachinesPage";
import {OrdersPage} from "./components/pages/OrdersPage";
import {NewOrderPage} from "./components/pages/NewOrderPage";
import {UnacceptedOrdersPage} from "./components/pages/UnacceptedOrdersPage";
import mainimg from "./img/laser.png"

const theme = createTheme({
    components: {
        MuiPaper: {
            defaultProps: {
                elevation: 3
            },
        },
    },
});
const TempMain = () => <Stack justifyContent="center" alignItems="center" sx={{height:"100%",width:"100%"}}>
    <img src={mainimg} />
    <h1>Your ad could be here!</h1>
</Stack>;
const Footer = () => <footer style={{textAlign: "center"}}>
    <Box sx={{backgroundColor: 'primary.main'}} padding={2}>
        <Typography color="white">
            &copy; ООО My Defense. All rights not reserved! For all legal matters contact noone
        </Typography>
    </Box>
</footer>;
const Temp404 = () => <div>404 NOT FOUND</div>
export const App = () => {
    const initialized = useSelector(initializedSelector)
    const updated = useUpdate(selector, setUpdated)
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
            <Stack spacing={5} sx={{minHeight: "100vh"}}>
                <CssBaseline/>
                <Header/>
                <Box component="main" sx={{height: "100%"}} flexGrow={1}>
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
                <Footer/>
            </Stack>
        </ThemeProvider>
}
