import React, { useState } from 'react';
import { classNames } from 'primereact/utils';

const AppMenu = ({ model, onMenuItemClick }) => {
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [activeSubMenuIndex, setActiveSubMenuIndex] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const isSubMenuActive = (index) => {
    return activeMenuIndex === index;
  };

  const isSubMenuActive2 = (submenid) => {
    //console.log('submenu:', submenid);
    return activeSubMenuIndex === submenid;
  };


  const onSubMenuClick = (index) => {
    //console.log(index)
    setActiveMenuIndex((prevActiveIndex) => (prevActiveIndex === index ? null : index));
  };



  const onSubSubMenuClick = (submenid) => {
    //console.log(submenid)
    setActiveSubMenuIndex((prevActiveIndex) => (prevActiveIndex === submenid ? null : submenid));
  };


  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterItems = (items) => {
    return items.filter((item) => {
      const isMatch = item.label.toLowerCase().includes(searchTerm.toLowerCase());

      const subItemsMatch = item.items && filterItems(item.items).length > 0;

      return isMatch || subItemsMatch;
    });
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
                <li key={subItem.label || subIndex} className={classNames({ 'active-menuitem': isSubMenuActive2(subIndex) })}>
                  <a onClick={(e) => {
                    onSubSubMenuClick(subIndex);
                    onMenuItemClick(e, subItem); // Llama a la función de redirección con el objeto de menú
                  }}>
                    <i className={classNames('layout-menuitem-icon', subItem.icon)}></i>
                    <span className="layout-menuitem-text" style={{ fontWeight: 'normal', fontSize: '13px', color: 'white', textShadow: '0 0 10px rgba(255, 255, 255, 0.10)' }}>{subItem.label}</span>
                    {subItem.items && <i className={`pi pi-fw ${isSubMenuActive2(subIndex) ? 'pi-angle-up' : 'pi-angle-down'} layout-submenu-toggler`}></i>}
                  </a>
                  {subItem.items && isSubMenuActive2(subIndex) && (
                    <ul className={classNames({ 'layout-submenu': true, 'expanded': isSubMenuActive2(subIndex) })} style={{ transition: 'max-height 0.3s ease-in-out' }}>
                      {subItem.items.map((subSubItem, submenid) => (
                        <li key={subSubItem.label || submenid} className={classNames({ 'active-menuitem': isSubMenuActive2(subIndex) })}>

                          <a onClick={(e) => {
                            onSubSubMenuClick(subIndex, submenid);
                            onMenuItemClick(e, subSubItem); // Llama a la función de redirección con el objeto de menú
                          }}>
                            <i className={classNames('layout-menuitem-icon', subSubItem.icon)}></i>
                            <span className="layout-menuitem-text" style={{ fontWeight: 'normal', fontSize: '12px', color: 'white', textShadow: '0 0 10px rgba(255, 255, 255, 0.10)' }}>{subSubItem.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
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