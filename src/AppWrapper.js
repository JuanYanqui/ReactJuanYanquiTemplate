import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import App from './App';
import AprobarArticulos from './components/AprobarArticulos';
import ControlArticulos from './components/ControlArticulos';
import NotFound from './pages/NotFound';
const AppWrapper = ({userData,usuarioUppercase}) => {
    let location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Routes>
        <Route path="/rsap/*" element={<App usuarioUppercase={usuarioUppercase} userData={userData}/>}>
        <Route path='AprobarArticulos' element={<AprobarArticulos />} />
        <Route path='ControlArticulos' element={<ControlArticulos />} />
        <Route path='NotFound' element={<NotFound />} />
        </Route>
        
    </Routes>
    );
};

export default AppWrapper;