import React, { useContext, useEffect, useRef, useState } from 'react';
import { classNames } from 'primereact/utils';
import { MegaMenu } from 'primereact/megamenu';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { CSSTransition } from 'react-transition-group';
import { RTLContext } from './App';
import { SplitButton } from 'primereact/splitbutton';

const AppTopbar = (props) => {
    const isRTL = useContext(RTLContext);
    const navigate = useNavigate();

    const topbarRef1 = useRef(null);
    const topbarRef2 = useRef(null);
    const topbarRef3 = useRef(null);
    const topbarRef4 = useRef(null);


    const searchPanel = useRef(null);

    useEffect(() => {
    }, [props.searchActive]);

    const onInputKeydown = (event) => {
        const key = event.which;

        if (key === 27 || key === 9 || key === 13) {
            props.onSearch(false);
        }
    };


    const botonEstilo = {
        fontSize: '30px',
        color: "#ffffff",

    };

    const botonEstilo2 = {
        fontSize: '35px',
        color: "#ffffff",
        background: "#5180ce"
    };
    const [inlineMenuActive, setInlineMenuActive] = useState({});

    const handleInlineMenuClick = (e, menuKey) => {
        setInlineMenuActive((prevMenuActive) => ({
            ...prevMenuActive,
            [menuKey]: !prevMenuActive[menuKey]
        }));
    };

    const handleLogout = () => {
        localStorage.removeItem('usernamecap');
        localStorage.removeItem('nombrecap');
        localStorage.removeItem('apellidocap');
        localStorage.removeItem('emailcap');

        const keycloakConfig = JSON.parse(localStorage.getItem('keycloakConfig'));
        window.location.href = keycloakConfig.url + 'realms/' + keycloakConfig.realm + '/protocol/openid-connect/logout?redirect_uri=' + encodeURIComponent(window.location.origin);
    };
    const inlineMenuRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <div className="layout-topbar shadow-4" style={{ backgroundColor: '#3e464c', height: '5.5rem' }}>
            <div className="layout-topbar-left" style={{ height: '5.5rem' }}>
                <button type="button" style={{ cursor: 'pointer', background: '#2b3135', height: '5.5rem' }} className="layout-topbar-logo p-link" onClick={() => navigate('/')}>
                    <img id="app-logo" src="assets/layout/images/web_logo_header.png" alt="ultima-layout" style={{ height: '2rem' }} />
                </button>
                <button type="button" className="layout-menu-button shadow-6 p-link" onClick={props.onMenuButtonClick} style={botonEstilo2}>
                    <i className="pi pi-chevron-right"></i>
                </button>
                <button type="button" className="layout-topbar-mobile-button p-link">
                    <i className="pi pi-ellipsis-v fs-large" onClick={props.onMobileTopbarButtonClick} style={botonEstilo}></i>
                </button>

            </div>

            <div className={classNames('layout-topbar-right', { 'layout-topbar-mobile-active': props.mobileTopbarActive })}>
                <div className="layout-topbar-actions-left"></div>
                <div className="layout-topbar-actions-right">
                    <ul className="layout-topbar-items">
                        <li className="layout-topbar-item notifications">
                            <div className="dropdown-container">
                                <button className="dropdown-toggle" onClick={toggleMenu} style={{ background: 'transparent', border: 'none', padding: '0' }}>
                                    <i className="pi pi-cog p-button-icon p-link" style={botonEstilo}></i>
                                </button>
                                {isMenuOpen && (
                                    <ul ref={inlineMenuRef} className="layout-inline-menu-action-panel custom-dropdown-panel">
                                        {[
                                            { icon: 'pi-cog', label: 'Settings' },
                                            { icon: 'pi-compass', label: 'Support' },
                                            { icon: 'pi-power-off', label: 'Logout ', onClick: handleLogout },

                                        ].map((item, index) => (
                                            <li className="layout-inline-menu-action-item tooltip" data-pr-tooltip={item.label} key={index}>
                                                <button className="flex flex-row align-items-center p-link" onClick={item.onClick}>
                                                    <div className="menu-item-box">
                                                        <i className={`pi ${item.icon} pi-fw`}></i>
                                                        <span>{item.label}</span>
                                                    </div>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AppTopbar;


