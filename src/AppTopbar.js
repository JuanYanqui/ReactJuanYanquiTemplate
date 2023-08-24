import React, { useContext, useEffect, useRef, useState } from 'react';
import { classNames } from 'primereact/utils';
import { MegaMenu } from 'primereact/megamenu';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { CSSTransition } from 'react-transition-group';
import { RTLContext } from './App';
import { SplitButton } from 'primereact/splitbutton';
import { Dropdown } from 'primereact/dropdown';
import { Menu } from 'primereact/menu';
const AppTopbar = (props) => {
    const isRTL = useContext(RTLContext);
    const navigate = useNavigate();


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

    const [inlineMenuActive, setInlineMenuActive] = useState({});

    const handleInlineMenuClick = (e, menuKey) => {
        setInlineMenuActive((prevMenuActive) => ({
            ...prevMenuActive,
            [menuKey]: !prevMenuActive[menuKey]
        }));
    };
    const [selectedOption, setSelectedOption] = useState(null);


    const handleLogout = () => {
        const keycloakConfig = JSON.parse(localStorage.getItem('keycloakConfig'));
        window.location.href = keycloakConfig.url + 'realms/' + keycloakConfig.realm + '/protocol/openid-connect/logout?redirect_uri=' + encodeURIComponent(window.location.origin);
    };
    const inlineMenuRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const menuRef = useRef(null);
    const menu = [
        { label: 'Support', icon: 'pi pi-compass' },
        { label: 'Logout', icon: 'pi pi-power-off', command: handleLogout },
    ];

    return (
        <div className="layout-topbar shadow-4" style={{ backgroundColor: '#3e464c', height: '5.5rem' }}>
            <div className="layout-topbar-left" style={{ height: '5.5rem' }}>
                <button type="button" style={{ cursor: 'pointer', background: '#2b3135', height: '5.5rem' }} className="layout-topbar-logo p-link" onClick={() => navigate('/AprobarArticulos')}>
                    <img id="app-logo" src="assets/layout/images/web_logo_header.png" alt="ultima-layout" style={{ height: '2rem' }} />
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
                                <Menu model={menu} popup ref={menuRef} id="popup_menu" />
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AppTopbar;


