import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RTLContext } from './App';
import { Menu } from 'primereact/menu';
const AppTopbar = (props) => {
    const isRTL = useContext(RTLContext);
    const navigate = useNavigate();


    const keycloakConfig = {
        realm: "gocorp",
        url: "https://goauth.gerardoortiz.com/auth/",
        clientId: "react-test",
        port: 0,
        onLoad: 'login-required',
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
        window.location.href = keycloakConfig.url + 'realms/' + keycloakConfig.realm + '/protocol/openid-connect/logout?redirect_uri=' + encodeURIComponent(window.location.origin);
    };

    const menuRef = useRef(null);
    const menu = [
        {label: props.usuarioUppercase ,icon: 'fa fa-user'},
        { label: 'Support', icon: 'fa fa-compass' },
        { label: 'Logout', icon: 'fa fa-power-off', command: handleLogout },
    ];

    return (
        <div className="layout-topbar shadow-4" style={{ backgroundColor: '#3e464c', height: '5.5rem' }}>
            <div className="layout-topbar-left" style={{ height: '5.5rem' }}>
                <button type="button" style={{ cursor: 'pointer', background: '#2b3135', height: '5.5rem' }} className="layout-topbar-logo p-link" onClick={() => navigate('/')}>
                    <img id="app-logo" src="../assets/layout/images/web_logo_header.png" alt="ultima-layout" style={{ height: '2rem' }} />
                </button>
                <button type="button" className="layout-menu-button shadow-6 p-link" onClick={props.onMenuButtonClick} style={botonEstilo2}>
                    <i className="pi pi-chevron-right"></i>
                </button>
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
                                <Menu model={menu} popup ref={menuRef} id="popup_menu" style={{borderRadius: '0%'}}/>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AppTopbar;


