import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import AppWrapper from './AppWrapper';
import reportWebVitals from './reportWebVitals';
import UsuarioService from './service/UsuarioService';
import Keycloak from 'keycloak-js';
import CategoriaCoralService from './service/CategoriaCoralService';
import ArticulosService from './service/ArticulosService';
/*const keycloakConfig = {
    realm: "gocorp",
    url: "https://goauth.gerardoortiz.com/auth/",
    clientId: "react-test",
    port: 0,
    onLoad: 'login-required',
};*/

const keycloakConfig = {
    realm: "prueba",
    url: "http://127.0.0.1:8080/auth/",
    clientId: "restcli",
    port: 0,
    onLoad: 'login-required',
};

const initKeycloak = () => {
    const keycloak = new Keycloak(keycloakConfig);
    return new Promise((resolve, reject) => {
        keycloak.init({ onLoad: 'login-required' })
            .then((authenticated) => {
                if (authenticated) {
                    localStorage.setItem('keycloakConfig', JSON.stringify(keycloakConfig));
                    resolve(keycloak);
                } else {
                    reject(new Error('User not authenticated'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

initKeycloak()
    .then((keycloak) => {
        // Save user info in local storage
        const usuario = keycloak.idTokenParsed.preferred_username;
        const firstName = keycloak.idTokenParsed.given_name;
        const lastName = keycloak.idTokenParsed.family_name;
        const email = keycloak.idTokenParsed.email;

        localStorage.setItem('usernamecap', usuario);
        localStorage.setItem('nombrecap', firstName);
        localStorage.setItem('apellidocap', lastName);
        localStorage.setItem('emailcap', email);

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
            <React.StrictMode>
                <HashRouter>
                        <UsuarioService>
                        </UsuarioService>
                </HashRouter>
            </React.StrictMode>
        );

        reportWebVitals();
    })
    .catch((error) => {
        console.error('Error initializing Keycloak:', error);
    });

