import React, { useEffect, useRef, useState } from 'react';
import { classNames } from 'primereact/utils';
import { Route, Routes, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import AppTopbar from './AppTopbar';
import AppInlineMenu from './AppInlineMenu';
import AppMenu from './AppMenu';
import AppRightMenu from './AppRightMenu';
import { useNavigate } from 'react-router-dom';
import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';
import AprobarArticulos from './components/AprobarArticulos';
import ControlArticulos from './components/ControlArticulos';
import { UsuarioService } from './service/UsuarioService';
import NotFound from './pages/NotFound';

export const RTLContext = React.createContext();

const App = ({ userData, usuarioUppercase }) => {
    const [topbarTheme, setTopbarTheme] = useState('custom');
    const [menuTheme, setMenuTheme] = useState('light');
    const [theme, setTheme] = useState('custom');
    const [menuMode, setMenuMode] = useState('static');
    const [inlineMenuPosition, setInlineMenuPosition] = useState('bottom');
    const [desktopMenuActive, setDesktopMenuActive] = useState(true);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [activeTopbarItem, setActiveTopbarItem] = useState(null);
    const [colorMode, setColorMode] = useState('light');
    const [rightMenuActive, setRightMenuActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('filled');
    const [isRTL, setRTL] = useState(false);
    const [ripple, setRipple] = useState(true);
    const [mobileTopbarActive, setMobileTopbarActive] = useState(false);
    const [isInputBackgroundChanged, setIsInputBackgroundChanged] = useState(false);
    const [inlineMenuActive, setInlineMenuActive] = useState({});
    const [newThemeLoaded, setNewThemeLoaded] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const copyTooltipRef = useRef();
    let currentInlineMenuKey = useRef(null);
    const location = useLocation();
    PrimeReact.ripple = true;

    let searchClick;
    let topbarItemClick;
    let menuClick;
    let inlineMenuClick;
    
    const usuarioservice = new UsuarioService();

    const navigate = useNavigate();
    const redirectToExternalUrl = (url) => {
        if (url) {
            if (url.startsWith('http://') || url.startsWith('https://')) {
                console.log('External URL:', url);
                window.location.replace(url);
            } else {
                console.log('Internal URL:', url);
                navigate(url);
            }
        }
    };
    const generateMenuFromUserData = (userData) => {
        if (!userData || !userData.object) {
            return [];
        }

        const menuItems = [];

        userData.object.forEach((item) => {
            if (item.nombre === 'Reportería' && menuItems.some(existingItem => existingItem.label === 'Reportería')) {
                return;
            }


            if (item.nombre === 'Cambio Categoria Articulo' && menuItems.some(existingItem => existingItem.label === 'Cambio Categoria Articulo')) {
                return;
            }

            const menuItem = {
                key: item.menId,
                label: item.nombre,
                icon: item.icono,
                to: item.url,
                items: item.hijos && item.hijos.map((hijo) => ({
                    key: hijo.menId,
                    label: hijo.nombre,
                    to: hijo.url,
                    icon: hijo.icono
                }))
            };

            menuItems.push(menuItem);
        });

        return menuItems;
    };

    const generateRoutesFromUserData = (userData) => {
        if (!userData || !userData.object) {
            return [];
        }

        return userData.object.map((item) => {
            if (item.external) {
                return {
                    path: item.url,
                    element: (
                        <a onClick={() => redirectToExternalUrl(item.url)}>{item.nombre}</a>
                    ),
                };
            } else {
                return {
                    path: item.url,
                    element: <h1>{item.nombre}</h1>,
                };
            }
        });


    }


    const menu = generateMenuFromUserData(userData);
    const routes = generateRoutesFromUserData(userData);
    const onMenuItemClick = (event, item) => {
        if (!item.items) {

            console.log('Clicked menu item:', item.to);
            hideOverlayMenu();
        } else {
            event.preventDefault();
        }


        if (item.to) {
            const url = item.to;
            console.log('URL:', url);
            if (url == '/AprobarArticulos' || url == '/ControlArticulos') {
                usuarioservice.GetMenuUsuarioIngreso(usuarioUppercase).then((data) => {
                    data.object.forEach((item) => {
                        const existingUrls = userData.object.map(item => item.url);
                        const existingUrlsHijos = userData.object.map(hijos => hijos.url);
                        if (!existingUrls.includes('/ControlArticulos')||!existingUrlsHijos.includes('/ControlArticulos')||!existingUrls.includes('/AprobarArticulos')||!existingUrlsHijos.includes('/AprobarArticulos')) {
                            navigate("/NotFound");
                        } else {
                            redirectToExternalUrl(url); 
                        }
                        
                    });
                });
            } else {
                redirectToExternalUrl(url);
            }

        }
    };


    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    useEffect(() => {
        if (menuMode === 'overlay') {
            hideOverlayMenu();
        }
        if (menuMode === 'static') {
            setDesktopMenuActive(true);
        }
    }, [menuMode]);

    useEffect(() => {
        onColorModeChange(colorMode);
    }, []);
    useEffect(() => {
        const appLogoLink = document.getElementById('app-logo');

        if (topbarTheme === 'white' || topbarTheme === 'yellow' || topbarTheme === 'amber' || topbarTheme === 'orange' || topbarTheme === 'lime') {
            appLogoLink.src = 'assets/layout/images/web_logo_header.png';
        } else {
            appLogoLink.src = 'assets/layout/images/web_logo_header.png';
        }
    }, [topbarTheme]);

    const onColorModeChange = (mode) => {
        setColorMode(mode);
        setIsInputBackgroundChanged(true);

        if (isInputBackgroundChanged) {
            if (mode === 'dark') {
                setInputStyle('filled');
            } else {
                setInputStyle('outlined');
            }
        }

        if (mode === 'light') {
            setMenuTheme('dark');
            setTopbarTheme('custom');
        } else {
            setMenuTheme('light');
            setTopbarTheme('custom');
        }

        const layoutLink = document.getElementById('layout-css');
        const layoutHref = 'assets/layout/css/layout-' + mode + '.css';
        replaceLink(layoutLink, layoutHref);

        const themeLink = document.getElementById('theme-css');
        const urlTokens = themeLink.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = 'theme-' + mode + '.css';
        const newURL = urlTokens.join('/');

        replaceLink(themeLink, newURL, () => {
            setNewThemeLoaded(true);
        });
    };


    const replaceLink = (linkElement, href, callback) => {
        if (isIE()) {
            linkElement.setAttribute('href', href);

            if (callback) {
                callback();
            }
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                const _linkElement = document.getElementById(id);
                _linkElement && _linkElement.remove();
                cloneLinkElement.setAttribute('id', id);

                if (callback) {
                    callback();
                }
            });
        }
    };



    const onMenuClick = (event) => {
        menuClick = true;
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;

        if (isDesktop()) setDesktopMenuActive((prevState) => !prevState);
        else setMobileMenuActive((prevState) => !prevState);

        event.preventDefault();
    };

    const onTopbarItemClick = (event) => {
        topbarItemClick = true;
        if (activeTopbarItem === event.item) setActiveTopbarItem(null);
        else {
            setActiveTopbarItem(event.item);
        }

        event.originalEvent.preventDefault();
    };

    const onSearch = (event) => {
        if (event) {
            searchClick = true;
            setSearchActive(event);
        }
    };


    const onRootMenuItemClick = (event) => {
        setMenuActive((prevState) => !prevState);
    };

    const onRightMenuButtonClick = () => {
        setRightMenuActive((prevState) => !prevState);
    };

    const onMobileTopbarButtonClick = (event) => {
        setMobileTopbarActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onDocumentClick = (event) => {
        if (!searchClick && event.target.localName !== 'input') {
            setSearchActive(false);
        }

        if (!topbarItemClick) {
            setActiveTopbarItem(null);
        }

        if (!menuClick && (menuMode === 'overlay' || !isDesktop())) {
            if (isHorizontal() || isSlim()) {
                setMenuActive(false);
            }
            hideOverlayMenu();
        }

        if (inlineMenuActive[currentInlineMenuKey.current] && !inlineMenuClick) {
            let menuKeys = { ...inlineMenuActive };
            menuKeys[currentInlineMenuKey.current] = false;
            setInlineMenuActive(menuKeys);
        }

        if (!menuClick && (isSlim() || isHorizontal())) {
            setMenuActive(false);
        }

        searchClick = false;
        topbarItemClick = false;
        inlineMenuClick = false;
        menuClick = false;
    };

    const hideOverlayMenu = () => {
        setMobileMenuActive(false);
        setDesktopMenuActive(false);
    };

    const isDesktop = () => {
        return window.innerWidth > 1024;
    };

    const isHorizontal = () => {
        return menuMode === 'horizontal';
    };

    const isSlim = () => {
        return menuMode === 'slim';
    };

    const isIE = () => {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    };

    const onInlineMenuClick = (e, key) => {
        let menuKeys = { ...inlineMenuActive };
        if (key !== currentInlineMenuKey.current && currentInlineMenuKey.current) {
            menuKeys[currentInlineMenuKey.current] = false;
        }

        menuKeys[key] = !menuKeys[key];
        setInlineMenuActive(menuKeys);
        currentInlineMenuKey.current = key;
        inlineMenuClick = true;
    };
    const renderInlineMenu = () => {
        if (inlineMenuPosition === 'top') {
            return (
                <AppInlineMenu menuKey="top" inlineMenuActive={inlineMenuActive} onInlineMenuClick={onInlineMenuClick} horizontal={isHorizontal()} menuMode={menuMode} />
            );
        } else if (inlineMenuPosition === 'bottom') {
            return (
                <AppInlineMenu menuKey="bottom" inlineMenuActive={inlineMenuActive} onInlineMenuClick={onInlineMenuClick} horizontal={isHorizontal()} menuMode={menuMode} />
            );
        }
    }
    const layoutContainerClassName = classNames('layout-wrapper ', 'layout-menu-' + menuTheme + ' layout-topbar-' + topbarTheme, {
        'layout-menu-static': menuMode === 'static',
        'layout-menu-overlay': menuMode === 'overlay',
        'layout-menu-slim': menuMode === 'slim',
        'layout-menu-horizontal': menuMode === 'horizontal',
        'layout-menu-active': desktopMenuActive,
        'layout-menu-mobile-active': mobileMenuActive,
        'layout-topbar-mobile-active': mobileTopbarActive,
        'layout-rightmenu-active': rightMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': !ripple,
        'layout-rtl': isRTL
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);



    const [filteredMenu, setFilteredMenu] = useState([]);
    const filterMenuItems = () => {
        const filteredItems = menu.reduce((accumulator, item) => {
            if (item.label.toLowerCase().includes(searchTerm.toLowerCase())) {
                accumulator.push(item);
            } else if (item.items) {
                const subItems = item.items.filter(subItem =>
                    subItem.label.toLowerCase().includes(searchTerm.toLowerCase())
                );

                if (subItems.length > 0) {
                    accumulator.push({
                        ...item,
                        items: subItems
                    });
                }
            }

            return accumulator;
        }, []);

        setFilteredMenu(filteredItems);
    };


    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
        filterMenuItems();
    };
    const botonEstilo2 = {
        color: "#ffffff",
    };

    useEffect(() => {
        const newMenuItem = {
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
                    url: "/ControlArticulos",
                    icono: "fa fa-pencil"
                },
                {
                    menId: 1001,
                    nombre: "Aprobar Artículos",
                    descripcion: "Descripción del submenu 2",
                    url: "/AprobarArticulos",
                    icono: "fa fa-check"
                }
            ]
        };
        userData.object.push(newMenuItem);

    }, []);




    return (
        <RTLContext.Provider value={isRTL}>
            <div className={layoutContainerClassName} onClick={onDocumentClick}>
                <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

                <AppTopbar
                    horizontal={isHorizontal()}
                    activeTopbarItem={activeTopbarItem}
                    onMenuButtonClick={onMenuButtonClick}
                    onTopbarItemClick={onTopbarItemClick}
                    onRightMenuButtonClick={onRightMenuButtonClick}
                    onMobileTopbarButtonClick={onMobileTopbarButtonClick}
                    mobileTopbarActive={mobileTopbarActive}
                    searchActive={searchActive}
                    onSearch={onSearch}
                    usuarioUppercase={usuarioUppercase} 
                />

                <div className="menu-wrapper" onClick={onMenuClick} style={{ backgroundColor: '#2b3135' }}>
                    <div className="layout-menu-container" style={{ backgroundColor: '#2b3135' }}>
                        < AppMenu model={filteredMenu.length > 0 ? filteredMenu : menu} onMenuItemClick={onMenuItemClick} onRootMenuItemClick={onRootMenuItemClick} menuMode={menuMode} active={menuActive} />
                    </div>
                </div>


                <div className="layout-main">

                    <div className="layout-content" >
                        <Routes>
                            <Route path="/ControlArticulos" element={<ControlArticulos usuarioUppercase={usuarioUppercase} colorMode={colorMode} isNewThemeLoaded={newThemeLoaded} onNewThemeChange={(e) => setNewThemeLoaded(e)} location={location} />} />
                            <Route path="/AprobarArticulos" element={<AprobarArticulos usuarioUppercase={usuarioUppercase} colorMode={colorMode} isNewThemeLoaded={newThemeLoaded} onNewThemeChange={(e) => setNewThemeLoaded(e)} location={location} />} />
                            <Route path="/NotFound" element={<NotFound colorMode={colorMode} isNewThemeLoaded={newThemeLoaded} onNewThemeChange={(e) => setNewThemeLoaded(e)} location={location} />} />
                        </Routes>
                    </div>


                </div>
                <AppRightMenu rightMenuActive={rightMenuActive} onRightMenuButtonClick={onRightMenuButtonClick} />

            </div>
        </RTLContext.Provider>
    );
};

export default App;