import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'primereact/menu';
import { RTLContext } from '../App';
import keycloak from 'keycloak-js'; 

const Access = (props) => {


    const keycloakConfig = {
        realm: "gocorp",
        url: "https://goauth.gerardoortiz.com/auth/",
        clientId: "react-test",
        onLoad: 'login-required',
        logoutRedirectUri: "https://gerardoortiz.com/logout-redirect", // Nueva propiedad
    };

    useEffect(() => {
    }, [props.searchActive]);


    const botonEstilo = {
        fontSize: '25px',
        color: "#ffffff",

    };

    const botonEstilo2 = {
        fontSize: '35px',
        color: "#ffffff",
        background: "#5180ce"
    };


    const botoncel = {
        fontSize: '50px',
        color: "#ffffff",
    };

    const handleLogout = () => {
        window.location.href = keycloakConfig.url + 'realms/' + keycloakConfig.realm + '/protocol/openid-connect/logout?redirect_uri=' + encodeURIComponent(window.location.origin +'/rsap');
    };

    const menuRef = useRef(null);
    const menu = [
        { label: props.usuarioUppercase, icon: 'fa fa-user' },
        { label: 'Support', icon: 'fa fa-compass' },
        { label: 'Logout', icon: 'fa fa-power-off', command: handleLogout },
    ];
    return (
        <div className="pages-body accessdenied-page flex flex-column">
            <div className="topbar p-3 flex justify-content-between flex-row align-items-center" style={{ backgroundColor: '#3e464c' }}>
                <div className="layout-topbar shadow-4" style={{ backgroundColor: '#3e464c', height: '5.5rem' }}>
                    <div className="layout-topbar-left" style={{ height: '5.5rem' }}>
                        <div className="layout-topbar-left">
                            <div className="topbar-left ml-3 flex" >
                                <div className="logo">
                                    <img src="assets/layout/images/web_logo_header.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <button type="button" className="layout-topbar-mobile-button p-link">
                            <i className="pi pi-bars" onClick={(event) => menuRef.current.toggle(event)} style={botonEstilo}></i>
                            <i className="pi pi-ellipsis-v fs-large" style={botoncel}></i>
                        </button>
                    </div>

                    <div className='layout-topbar-right'>
                        <div className="layout-topbar-actions-left"></div>
                        <div className='layout-topbar-right'>
                            <div className="layout-topbar-actions-left"></div>
                            <div className="layout-topbar-actions-right">
                                <ul className="layout-topbar-items">
                                    <li className="layout-topbar-item notifications">
                                        <i className="pi pi-cog" onClick={(event) => menuRef.current.toggle(event)} style={botonEstilo}></i>
                                        <i className="pi pi-ellipsis-v fs-large" style={botonEstilo}></i>
                                        <div style={{ width: '20px' }}></div>
                                        <Menu model={menu} popup ref={menuRef} id="popup_menu" style={{ borderRadius: '0%' }} />
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="align-self-center mt-auto mb-auto">
                <div className="pages-panel card flex flex-column">
                    <div className="pages-header px-3 py-1">
                        <h2>ACCESS DENIED</h2>
                    </div>
                    <div className="card mt-3 px-6">
                        <img src="assets/layout/images/pages/error.png" alt="" />
                    </div>
                    <div className="pages-detail pb-6">Requested resource is not available.</div>

                </div>
            </div>
        </div>
    );
};

export default Access;
