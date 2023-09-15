import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import App from './App';
import ControlArticulos from './components/ControlArticulos';
import AprobarArticulos from './components/AprobarArticulos';
import NotFound from './pages/NotFound';
import EstadosCuenta from './components/EstadosCuenta';
import VentasTargetas from './components/VentasTargetas';
import { Dialog } from 'primereact/dialog';

const AppWrapper = ({ userData, usuarioUppercase }) => {
    let location = useLocation();
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {

            /*const newMenuItem = {
                menId: 999,
                nombre: "Cambio Categoria Articulo",
                descripcion: "Descripción del nuevo menú",
                url: "#",
                icono: "fa fa-plus",
                hijos: [
                    {
                        menId: 1000,
                        nombre: "Control de Artículos",
                        descripcion: "Descripción del submenu 1",
                        url: "http://localhost:3000/rsap/ControlArticulos",
                        icono: "fa fa-pencil"
                    },
                    {
                        menId: 1001,
                        nombre: "Aprobar Artículos",
                        descripcion: "Descripción del submenu 2",
                        url: "http://localhost:3000/rsap/AprobarArticulos",
                        icono: "fa fa-check"
                    }
                ]
            };

            userData.object.push(newMenuItem);
            console.log(userData);*/
            setIsDataLoaded(true);
        }, 1000);
    }, [userData, location]);

    if (!isDataLoaded) {
        // Muestra el componente de diálogo mientras se carga la data
        return (
            <Dialog visible={true} modal closable={false} showHeader={false} style={{ width: '52px', height: '57px', borderRadius: '4px', overflow: 'hidden' }}>
                <div className="d-flex justify-content-center align-items-center h-100" style={{ borderRadius: '4px' }}>
                    <i className="pi pi-spin pi-spinner loading-icon" aria-hidden="true" style={{ transform: 'scale(0.5)', marginTop: '18px' }}></i>
                </div>
            </Dialog>
        );
    }

    // Resto del código para verificar las rutas permitidas y renderizar
    const existingUrls = userData.object.map(item => item.url);
    const existingUrlsHijos = userData.object.flatMap(item => {
        if (item.hijos && Array.isArray(item.hijos)) {
            return item.hijos.map(hijo => hijo.url);
        }
        return [];
    });

    const urlsPermitidas2 = existingUrls;
    const urlsPermitidas = existingUrlsHijos;
    const isURLPermitida = urlsPermitidas.includes(window.location.href);
    const isURLPermitida2 = urlsPermitidas2.includes(window.location.href);

    const redirectToNotFound = () => {
        window.location.href = 'not-found.html';
    };

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/rsap/" />} />
            <Route path="/rsap/*" element={<App usuarioUppercase={usuarioUppercase} userData={userData} />} >
                <Route
                    path="ControlArticulos"
                    element={isURLPermitida || isURLPermitida2 ? <ControlArticulos /> : redirectToNotFound()}
                />
                <Route
                    path="AprobarArticulos"
                    element={isURLPermitida || isURLPermitida2 ? <AprobarArticulos /> : redirectToNotFound()}
                />
                <Route
                    path="EstadosCuenta"
                    element={isURLPermitida || isURLPermitida2 ? <EstadosCuenta /> : redirectToNotFound()}
                />
                <Route
                    path="VentasTarjeta"
                    element={isURLPermitida || isURLPermitida2 ? <VentasTargetas /> : redirectToNotFound()}
                />
                <Route path="NotFound" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppWrapper;
