import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import AppWrapper from './AppWrapper';
import reportWebVitals from './reportWebVitals';
import Keycloak from 'keycloak-js';
import CategoriaCoralService from './service/CategoriaCoralService';
import ArticulosService from './service/ArticulosService';
import { UsuarioService } from './service/UsuarioService';
import App from './App';

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
        const usuario = keycloak.idTokenParsed.preferred_username;
        const usuarioUppercase = usuario.toUpperCase();
        const usuarioService = new UsuarioService();

        usuarioService.PostUsuarioIngreso(usuarioUppercase)
            .then((usuarioingresado) => {
                if (usuarioingresado != null) {
                    usuarioService.MenuUsuarioIngreso(usuarioUppercase)
                        .then((userData) => {

                            const root = ReactDOM.createRoot(document.getElementById('root'));
                            root.render(

                                <React.StrictMode>
                                    <HashRouter>
                                        {userData && <App userData={userData} />}
                                    </HashRouter>
                                </React.StrictMode>
                            );
                        })
                        .catch((error) => {
                            console.error('Error fetching user data:', error);
                        });
                } else {
                    console.error('Error fetching user data:');
                    const keycloakConfig = JSON.parse(localStorage.getItem('keycloakConfig'));
                    window.location.href = keycloakConfig.url + 'realms/' + keycloakConfig.realm + '/protocol/openid-connect/logout?redirect_uri=' + encodeURIComponent(window.location.origin);
                }

            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });

        reportWebVitals();
    })
    .catch((error) => {
        console.error('Error initializing Keycloak:', error);
    });
