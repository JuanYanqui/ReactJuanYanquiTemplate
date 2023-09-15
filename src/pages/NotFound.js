import React from 'react';

const NotFound = () => {

    return (
        <body className="fontRegular red-back">

            <div clclassNamess="Container100 Top20Percent PosAbsolute MarAuto OvHidden">
                <div className="Wid50 MarAuto OvHidden TexAlCenter"><img src="/activosFijos/javax.faces.resource/images/access-denied.svg.jsf?ln=sentinel-layout" style={{ width: '140px' }} />
                    <div className="EmptyBox20"></div>
                    <span className="white Fs60 Wid100 DispBlock">Acceso Negado</span>
                        <span className="white Wid100 DispBlock Fs12">Revise los permisos asignados a su usuario..!<br/>
                        </span>
                        <div className="EmptyBox20"></div><button id="j_idt12" name="j_idt12" type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only Fs24" onclick="window.open('\/','_self')" role="button" aria-disabled="false"><span class="ui-button-text ui-c">Regresar...!</span></button>
                        <div className="EmptyBox50"></div>
                    </div>
                </div>

        </body>
    );
};

export default NotFound;