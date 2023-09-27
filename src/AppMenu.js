import React, { useState } from 'react';
import { classNames } from 'primereact/utils';

const AppMenu = ({ model, onMenuItemClick }) => {
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const isSubMenuActive = (index) => {
    return activeMenuIndex === index;
  };

  const onSubMenuClick = (index) => {
    setActiveMenuIndex((prevActiveIndex) => (prevActiveIndex === index ? null : index));
  };
  

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterItems = (items) => {
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.items && filterItems(item.items).length > 0)
    );
  };

  const filteredModel = filterItems(model);
  const botonEstilo2 = {
    color: "#ffffff",
  };

  
  const renderMenuItem = (item, index, isMainItem) => {
    const isActive = isSubMenuActive(index);
    return (
      <li key={item.label || index} className={classNames({ 'active-menuitem': isActive, 'main-menuitem': isMainItem })}>
        <a onClick={() => onSubMenuClick(index)}>
          <i className={item.icon} style={botonEstilo2}></i>
          <span className="layout-menuitem-text" style={{ fontWeight: 'normal', fontSize: '14px', color: 'white', textShadow: '0 0 10px rgba(255, 255, 255, 0.10)' }}>{item.label}</span>
          {item.items && <i className={`pi pi-fw ${isActive ? 'pi-angle-up' : 'pi-angle-down'} layout-submenu-toggler`}></i>}
        </a>
        {item.items && isActive && (
          <ul
            className={classNames({ 'layout-submenu': true, 'expanded': isActive })}
            style={{ transition: 'max-height 0.3s ease-in-out' }}
          >
            {item.items
              .filter((subItem) => subItem.label.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((subItem, subIndex) => (
                <li key={subItem.label || subIndex} className={classNames({ 'active-menuitem': subItem.active })}>
                  <a onClick={(e) => onMenuItemClick(e, subItem)}>
                    <i className={classNames('layout-menuitem-icon', subItem.icon)}></i>
                    <span className="layout-menuitem-text" style={{ fontWeight: 'normal', fontSize: '13px', color: 'white', textShadow: '0 0 10px rgba(255, 255, 255, 0.10)' }}>{subItem.label}</span>
                    {subItem.items && ( // Agregar este bloque para sub-subítems
                      <i className={`pi pi-fw ${subItem.isActive ? 'pi-angle-up' : 'pi-angle-down'} layout-submenu-toggler`} onClick={(e) => onSubMenuClick(subIndex)}></i>
                    )}
                    {subItem.items && subItem.isActive && (
                      <ul className={classNames({ 'layout-submenu': true, 'expanded': subItem.isActive })}>
                        {subItem.items.map((subSubItem, subSubIndex) => (
                          <li key={subSubItem.label || subSubIndex} className={classNames({ 'active-menuitem': subSubItem.active })}>
                            <a onClick={(e) => onMenuItemClick(e, subSubItem)}>
                              <i className={classNames('layout-menuitem-icon', subSubItem.icon)}></i>
                              <span className="layout-menuitem-text" style={{ fontWeight: 'normal', fontSize: '13px', color: 'white', textShadow: '0 0 10px rgba(255, 255, 255, 0.10)' }}>{subSubItem.label}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </a>
                </li>
              ))}
          </ul>
        )}
      </li>
    );
  };
  
  

  return (
    <div className="menu-container">
      <div style={{ height: '20px' }}></div>
      &nbsp;
      &nbsp;
      <i className="fas fa-search" style={botonEstilo2}></i>
      &nbsp;
      <input
        type="text"
        className="menu-search-input"
        placeholder="Buscar Menu"
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
      <ul className="layout-menu">
        {filteredModel.map((item, index) =>
          renderMenuItem(item, index, true)
        )}
      </ul>
    </div>
  );
};

export default AppMenu;

