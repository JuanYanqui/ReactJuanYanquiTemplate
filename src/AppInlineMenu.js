import { CSSTransition } from 'react-transition-group';
import { classNames } from 'primereact/utils';
import { useContext, useRef ,useEffect, useState} from 'react';
import { RTLContext } from './App';
import { Tooltip } from 'primereact/tooltip';

const AppInlineMenu = (props) => {
    const inlineMenuRef = useRef(null);
    const isRTL = useContext(RTLContext);
    const menuKey = props.menuKey || 'inline-menu';

    const inlineMenuClassName = classNames(
        'layout-inline-menu',
        {
            'layout-inline-menu-active': props.inlineMenuActive[props.menuKey]
        },
        props.className
    );
};

export default AppInlineMenu;
