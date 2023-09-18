import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Error from './pages/Error';
import NotFound from './pages/NotFound';
import Access from './pages/Access';
import Landing from './pages/Landing';
import ControlArticulos from './components/ControlArticulos';
import AprobarArticulos from './components/AprobarArticulos';
import EstadosCuenta from './components/EstadosCuenta';
import VentasTargetas from './components/VentasTargetas';

const AppWrapper = ({ userData, usuarioUppercase }) => {
    let location = useLocation();
    let navigate = useNavigate();
    const [redirected, setRedirected] = useState(false);

    useEffect(() => {
        // Comprueba si la redirección ya ha ocurrido en el almacenamiento local
        const hasRedirected = localStorage.getItem('hasRedirected');

        if (!hasRedirected) {
            navigate('/rsap/go/');
            setRedirected(true);

            // Marca que la redirección ha ocurrido en el almacenamiento local
            localStorage.setItem('hasRedirected', 'true');
        }

        window.scrollTo(0, 0);
    }, [navigate]);
    /*
                <Route path="login" element={<Login />} />
                <Route path="error" element={<Error />} />
                <Route path="notfound" element={<NotFound />} />
                <Route path="landing" element={<Landing />} />*/
    return (
        <Routes>
            <Route path="/rsap/*" >
                <Route path="access" element={<Access usuarioUppercase={usuarioUppercase} />} />
                <Route path="go/*" element={<App usuarioUppercase={usuarioUppercase} userData={userData} />}>
                    <Route path="ControlArticulos" element={<ControlArticulos />} />
                    <Route path="AprobarArticulos" element={<AprobarArticulos />} />
                    <Route path="EstadosCuenta" element={<EstadosCuenta />} />
                    <Route path="VentasTarjeta" element={<VentasTargetas />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppWrapper;