import React, { useEffect, useRef, useState } from 'react';
import { classNames } from 'primereact/utils';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AppTopbar from './AppTopbar';
import AppInlineMenu from './AppInlineMenu';
import AppMenu from './AppMenu';
import AppRightMenu from './AppRightMenu';
import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';
import EstadosCuenta from './components/EstadosCuenta';
import VentasTargetas from './components/VentasTargetas';
import AprobarArticulos from './components/AprobarArticulos';
import ControlArticulos from './components/ControlArticulos';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';
import { UsuarioService } from './service/UsuarioService';
import '@fortawesome/fontawesome-free/css/all.css';
import ReporteVentasCorales from './components/ReporteVentasCorales';
import MantenimientoPlus from './components/MantenimientoPlus';
import GestionPropuestas from './components/GestionPropuestas';
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
    const [searchTerm, setSearchTerm] = useState('');
    const copyTooltipRef = useRef();
    let currentInlineMenuKey = useRef(null);
    const location = useLocation();
    PrimeReact.ripple = true;
    let searchClick;
    let topbarItemClick;
    let menuClick;
    let inlineMenuClick;
    const usuarioservice = new UsuarioService();



    //Redireccion de pagina hacia afuera de mi proyecto.
    const navigate = useNavigate();
    const redirectToExternalUrl = (url) => {
        if (url) {
            if (url.startsWith('http://') || url.startsWith('https://')) {
                window.open(url, '_blank');
            } else {
                navigate(url);
            }
        }
    };


    //Generar el menu segun la dataque se trae
    const generateMenuFromUserData = (userData) => {
        if (!userData || !userData.object) {
            return [];
        }
        const menuItems = [];

        const processMenuItem = (item) => {
            const menuItem = {
                key: item.menId,
                label: item.nombre,
                icon: item.icono,
                to: item.url,
            };

            if (item.hijos && item.hijos.length > 0) {
                menuItem.items = item.hijos.map((hijo) => processMenuItem(hijo));
            }

            return menuItem;
        };

        userData.object.forEach((item) => {
            if (
                (item.nombre === 'Reportería' && menuItems.some(existingItem => existingItem.label === 'Reportería')) ||
                (item.nombre === 'Cambio Categoria Articulo' && menuItems.some(existingItem => existingItem.label === 'Cambio Categoria Articulo'))
            ) {
                return;
            }

            menuItems.push(processMenuItem(item));
        });

        return menuItems;
    };


    //Genera las rutas para los menus.
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

    //Declaracion de variables 
    const menu = generateMenuFromUserData(userData);
    const routes = generateRoutesFromUserData(userData);


    //Ingreso a los menus 
    const onMenuItemClick = (event, item) => {
        if (!item) {
            // Handle the case where 'item' is not defined or is falsy
            return;
        }
    
        if (!item.items) {
            hideOverlayMenu();
        } else {
            event.preventDefault();
        }
    
        if (item.to) {
            const url = item.to;
            const url2 = url.trim();
            if (url2.includes("/rsap")) {
                usuarioservice.GetMenuUsuarioIngreso(usuarioUppercase).then((datan) => {
                    const existingUrls = datan.object.map(item => item.url);
                    const existingUrlsHijos = datan.object.flatMap(item => (item.hijos && Array.isArray(item.hijos)) ? item.hijos.map(hijo => hijo.url) : []);
            
                    if (existingUrls.includes(url) || existingUrlsHijos.includes(url)) {
                        redirectToExternalUrl(url);
                    } else {
                        navigate("/rsap/access");
                    }
                });
            } else {
                redirectToExternalUrl(url);
            }
        }
    };
      



    //Carga al inciar la pagina los locacion.
    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);


    //Carga al inciar la pagina los estilos menu.
    useEffect(() => {
        if (menuMode === 'overlay') {
            hideOverlayMenu();
        }
        if (menuMode === 'static') {
            setDesktopMenuActive(true);
        }
    }, [menuMode]);


    //Carga al inciar la pagina los estilos menu.
    useEffect(() => {
        onColorModeChange(colorMode);
    }, []);
    useEffect(() => {
        const appLogoLink = document.getElementById('app-logo');

        if (topbarTheme === 'white' || topbarTheme === 'yellow' || topbarTheme === 'amber' || topbarTheme === 'orange' || topbarTheme === 'lime') {
            appLogoLink.src = '../assets/layout/images/web_logo_header.png';
        } else {
            appLogoLink.src = '../assets/layout/images/web_logo_header.png';
        }
    }, [topbarTheme]);


    //Carga al inciar la pagina los estilos menu.
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
        const layoutHref = '../assets/layout/css/layout-' + mode + '.css';
        replaceLink(layoutLink, layoutHref);

        const themeLink = document.getElementById('theme-css');
        const urlTokens = themeLink.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = 'theme-' + mode + '.css';
        const newURL = urlTokens.join('/');

        replaceLink(themeLink, newURL, () => {
            setNewThemeLoaded(true);
        });
    };



    //Carga al inciar la pagina los estilos menu.
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

    //Acciones de ingreso para el top bar y menu
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


    //Metodo de busqueda en el menu
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


    //Metodo que se ejecuta al inciar de proteccion de rutas
    useEffect(() => {
        const verificarYRedirigir = async () => {
            const url = window.location.href;
            usuarioservice.GetMenuUsuarioIngreso(usuarioUppercase).then((datas) => {
                const datanueva = datas
                /*datas.object.forEach((item) => {
                    const existingUrls = datas.object.map(item => item.url);
                    const existingUrlsHijos = datas.object.flatMap(item => {
                        if (item.hijos && Array.isArray(item.hijos)) {
                            return item.hijos.map(hijo => hijo.url);
                        }
                        return [];
                    });

                    const controlArticulosExists = existingUrls.includes(url) || existingUrlsHijos.includes(url);
                    const aprobarArticulosExists = existingUrls.includes(url) || existingUrlsHijos.includes(url);


                    if (controlArticulosExists && aprobarArticulosExists){
                        //console.log("entrooo");
                    } else if (controlArticulosExists) {
                        navigate(url);
                    } else if (aprobarArticulosExists) {
                        navigate(url);
                    } else {
                         navigate("/rsap/access");
                        return;
                    }
                });*/
            });
        };

        verificarYRedirigir();
    }, [navigate, userData.object, usuarioUppercase]);


    //Los Datos que se mostraran 
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
                            <Route path="/EstadosCuenta" element={<EstadosCuenta colorMode={colorMode} isNewThemeLoaded={newThemeLoaded} onNewThemeChange={(e) => setNewThemeLoaded(e)} location={location} />} />
                            <Route path="/VentasTarjeta" element={<VentasTargetas colorMode={colorMode} isNewThemeLoaded={newThemeLoaded} onNewThemeChange={(e) => setNewThemeLoaded(e)} location={location} />} />
                            <Route path="/ReporteVentasCorales" element={<ReporteVentasCorales colorMode={colorMode} isNewThemeLoaded={newThemeLoaded} onNewThemeChange={(e) => setNewThemeLoaded(e)} location={location} />} />
                            <Route path="/MantenimientoAbcPlus" element={<MantenimientoPlus colorMode={colorMode} isNewThemeLoaded={newThemeLoaded} onNewThemeChange={(e) => setNewThemeLoaded(e)} location={location} />} />
                            <Route path="/GestionPropuestas" element={<GestionPropuestas usuarioUppercase={usuarioUppercase}  colorMode={colorMode} isNewThemeLoaded={newThemeLoaded} onNewThemeChange={(e) => setNewThemeLoaded(e)} location={location} />} />


                        </Routes>
                    </div>


                </div>
                <AppRightMenu rightMenuActive={rightMenuActive} onRightMenuButtonClick={onRightMenuButtonClick} />

            </div>
        </RTLContext.Provider>
    );
};

export default App;
