import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Keycloak from 'keycloak-js';
import { UsuarioService } from './service/UsuarioService';
import App from './App';
import AppWrapper from './AppWrapper';

const keycloakConfig = {
    realm: "gocorp",
    url: "https://goauth.gerardoortiz.com/auth/",
    clientId: "react-test",
    redirectUri: "https://gerardoortiz.com/rsap/",
    onLoad: 'login-required',
};


/*const keycloakConfig = {
    realm: "prueba",
    url: "http://127.0.0.1:8080/auth/",
    clientId: "restcli",
    port: 0,
    onLoad: 'login-required',
};*/

const initKeycloak = () => {
    const keycloak = new Keycloak(keycloakConfig);
    return new Promise((resolve, reject) => {
        keycloak.init({ onLoad: 'login-required' })
            .then((authenticated) => {
                if (authenticated) {
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
        ////console.log("datos del keycloak",keycloak);
        usuarioService.PostUsuarioIngreso(usuarioUppercase)
            .then((usuarioingresado) => {
                if (usuarioingresado != null) {
                    ////console.log(usuarioingresado);
                    usuarioService.GetMenuUsuarioIngreso(usuarioUppercase)
                        .then((userData) => {
                            ////console.log(userData);
                            const root = ReactDOM.createRoot(document.getElementById('root'));
                            root.render(

                                <React.StrictMode>
                                    <BrowserRouter>
                                        <AppWrapper usuarioUppercase={usuarioUppercase} userData={userData} />
                                    </BrowserRouter>
                                </React.StrictMode>
                            );
                        })
                        .catch((error) => {
                            console.error('Error fetching user data:', error);
                        });
                } else {
                    console.error('Error fetching user data:');
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