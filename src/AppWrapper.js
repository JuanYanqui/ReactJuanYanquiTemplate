import React, { useEffect } from 'react';
import { Route, Routes, useLocation ,Navigate} from 'react-router-dom';
import App from './App';
import ControlArticulos from './components/ControlArticulos';
import AprobarArticulos from './components/AprobarArticulos';
import NotFound from './pages/NotFound';
import EstadosCuenta from './components/EstadosCuenta';

const AppWrapper = ({userData, usuarioUppercase}) => {
    let location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/rsap/" />} />
            <Route path="/rsap/*" element={<App  usuarioUppercase={usuarioUppercase} userData={userData}/>} >
            <Route path="ControlArticulos" element={<ControlArticulos />} />
            <Route path="AprobarArticulos" element={<AprobarArticulos />} />
            <Route path="EstadosCuenta" element={<EstadosCuenta />} />
            <Route path="NotFound" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppWrapper;
