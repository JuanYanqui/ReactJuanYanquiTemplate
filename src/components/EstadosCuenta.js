
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { CategoriasCoralIntermediaws } from '../serviceIntermedia/CategoriasCoralIntermediaws';
import "../assets/theme/indigo/theme-light.css";
import { EstadoCuentaIntermediaws } from '../serviceIntermedia/EstadoCuentaIntermediaws';
const EstadosCuenta = () => {
    const [visible, setVisible] = useState(false);
    const [visibleEnviarCuenta, setvisibleEnviarCuenta] = useState(false);
    const [position, setPosition] = useState('center');
    const toast = useRef(null);
    const [bp, setBp] = useState("");
    const [nombreCuenta, setNombreCuenta] = useState("");
    const [cedulaCuenta, setcedulaCuenta] = useState("");
    const [correoIngresado, setcorreoIngresado] = useState("");
    const [DataCategoria, setDataCategoria] = useState([]);
    const categoriasdata = new CategoriasCoralIntermediaws();

    const estadocuentadata = new EstadoCuentaIntermediaws();
    const [DataEstadoCuenta, setDataEstadoCuenta] = useState("");

    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(10);
    const [selectedCode, setSelectedCode] = useState(null);
    const [estadoSelecionado, setestadoSelecionado] = useState(null);
    const [error, setError] = useState(null);
    const [dialogVisibleError, setDialogVisibleError] = useState(false);
    const [checkedValue, setCheckedValue] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectionChange = (e) => {
        setSelectedItems(e.value);
    };
    /*useEffect(() => {
        const fetchData = async () => {
            estadocuentadata.loadCategoriaCambio(bp, nombreCuenta, cedulaCuenta).then((data) => {

                setDataEstadoCuenta(data);
                setLoading(false);
            });
        };
        fetchData();
    }, []);*/



    const onPageChange = (event) => {
        const newPage = Math.floor(event.first / event.rows);
        setLoading(true);
        setRowsPerPage(event.rows);
        setCurrentPage(newPage);
    };

    const DataTablaar = ({ dataar }) => {

        const startRecord = currentPage * rowsPerPage + 1;
        return (
            <div>
                <DataTable value={dataar}
                    selection={selectedItems}
                    onSelectionChange={handleSelectionChange}
                    selectionMode="check"
                    lazy paginator
                    totalRecords={totalRecords}
                    onPage={onPageChange}
                    rows={rowsPerPage}
                    first={currentPage * rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorPosition="both"
                    paginatorTemplate={`CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown`}
                    currentPageReportTemplate={`Registros ${startRecord} -  de {totalRecords}`}
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="cmbId" header="Sociedad" />
                    <Column field="cmbId" header="BpCodigo" />
                    <Column field="codigo" header="Cedula" />
                    <Column field="tArticulo.descripcion" style={{ width: '25%' }} header="Nombre" />
                    <Column field="descripcion" style={{ width: '17%' }} header="Dirección" />
                    <Column field="categoriaNueva" style={{ width: '8%' }} header="Compras" />
                    <Column field="categoriaAnterior" style={{ width: '9%' }} header="Pagos" />
                    <Column field="fecha" style={{ width: '10%' }} header="Cobros" />
                </DataTable>
            </div>
        );
    };


    const handleIconClick = (cmbId, estado) => {
        setSelectedCode(cmbId);
        setestadoSelecionado(4);
        setVisible(true);
        setPosition('top');
    };

    const handleIconClickNo = (cmbId, estado) => {
        setSelectedCode(cmbId);
        setestadoSelecionado(3);
        setVisible(true);
        setPosition('top');

    };


    const enviarmensaje = () => {
        setvisibleEnviarCuenta(true);
    }




    const handleYesClick = () => {

        /*const cmbIdParam = selectedCode;
        const nuevoEstadoParam = estadoSelecionado;
        const usuarioParam = "";
        //console.log("cmdi", cmbIdParam);
        //console.log("nuevo estado", nuevoEstadoParam);
        //console.log("usuario", usuarioParam);
        categoriasdata.updateEstadoCambioCategoria(cmbIdParam, nuevoEstadoParam, usuarioParam).then((response) => {
            if (response.data.status === 0) {
                //console.log(response.data.message);
                setError(response.data.message);
                setPosition('top');
                setDialogVisibleError(true);
                return response.data.message;
            } else {

                //console.log("status", response.data.status);
                const objectData = JSON.parse(response.data.object);
                setVisible(false);
                //console.log(response);
                showSuccess();
                cargaDatos();

            }
        });*/

    };


    const handleNoClick = () => {
        setvisibleEnviarCuenta(false);
        showErrorcancel();
    };

    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={handleNoClick} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={handleYesClick} autoFocus />
        </div>
    );

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Cambio Completado.' });
    };

    const showErrorcancel = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Proceso Cancelado.', life: 3000 });
    }



    const [loading, setLoading] = useState(false);


    const cargaDatos = () => {
        setLoading(true);
        categoriasdata.loadCategoriaCambio(bp, nombreCuenta, cedulaCuenta).then((data) => {
            setDataCategoria(data);
            setLoading(false);
        });
    }

    const handleInputChange = (event) => {
        setBp(event.target.value);

    };

    const handleInputChange2 = (event) => {
        setNombreCuenta(event.target.value);

    };

    const handleInputChange3 = (event) => {
        setcedulaCuenta(event.target.value);

    };

    /*<form>
        <input
            type="text"
            className="ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all"
            placeholder="Correo a Enviar"
            size="50"
            role="textbox"
            aria-readonly="false"
            aria-disabled="false"
            value={correoIngresado}
        />
        <div style={{ height: '5px' }}></div>
        <div className="EmptyBox10"></div>Ingresar un correo para envio
        <br />
        <div className="EmptyBox10"></div>
        <button
            className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left"
            onclick=""
            type="button"
            role="button"
            aria-disabled="false"
        >
            <span className="ui-button-text ui-c">
                <i className="ui-button-icon-left ui-icon ui-c pi pi-envelope" /> &nbsp;Enviar
            </span>
        </button>
    </form>*/


    return (
        <div className='layout-wrapper menu-layout-overlay'>
            <div style={{ height: '15px' }}></div>
            <div className='content-layout'>
                <form>
                    <div className="p-col-12">
                        <div >
                            <div >
                                <span className="Fs20 FontBold">Estados de Cuenta</span>
                                <button
                                    id="EnviarEstadoCuenta"
                                    className="ui-buttonleft ui-widget ui-state-default ui-corner-all ui-button-text-icon-right p-mr-2"
                                    onClick={enviarmensaje}
                                    disabled={loading}
                                    type="button"
                                    role="button"
                                    aria-disabled="false"
                                >
                                    <span className="ui-button-textright ui-c"><i className="ui-button-icon-right ui-icon ui-c pi pi-envelope" /> &nbsp;Mensaje</span>
                                </button>

                                <button
                                    id="FiltrarEstadoCuenta"
                                    className="ui-buttonleft ui-widget ui-state-default ui-corner-all ui-button-text-icon-right p-mr-2"
                                    disabled={loading}
                                    type="button"
                                    role="button"
                                    aria-disabled="false"
                                >
                                    <span className="ui-button-textright ui-c"><i className="ui-button-icon-right ui-icon ui-c pi pi-refresh" /> &nbsp;Filtrar</span>
                                </button>
                            </div>
                            <div style={{ height: '1px' }}></div>
                            <hr className="ui-separator ui-state-default ui-corner-all" />
                            <div className="p-grid p-formgrid">
                                <span className="p-float-label" style={{ position: 'relative', display: 'inline-block', maxWidth: '120px' }}>
                                    <input
                                        id="input1"
                                        className={`ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all MarRight10 ${bp ? 'ui-state-filled' : ''}`}
                                        value={bp}
                                        onChange={handleInputChange}
                                        style={{ width: '100%' }}
                                    />
                                    <label className={bp ? 'ui-label-floated' : ''} style={{ color: '#6c747c', fontSize: '16px', background: '#fff' }}>Bp</label>
                                </span>

                                &nbsp;
                                &nbsp;

                                <span className="p-float-label" style={{ position: 'relative', display: 'inline-block', maxWidth: '120px' }}>
                                    <input
                                        id="input2"
                                        className={`ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all MarRight10 ${nombreCuenta ? 'ui-state-filled' : ''}`}
                                        value={nombreCuenta}
                                        onChange={handleInputChange2}
                                        style={{ width: '100%' }}
                                    />
                                    <label htmlFor="input2" className={nombreCuenta ? 'ui-label-floated' : ''} style={{ color: '#6c747c', fontSize: '16px', background: '#fff' }}>Nombre</label>
                                </span>

                                &nbsp;
                                &nbsp;

                                <span className="p-float-label" style={{ position: 'relative', display: 'inline-block', maxWidth: '120px' }}>
                                    <input
                                        id="input2"
                                        className={`ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all MarRight10 ${cedulaCuenta ? 'ui-state-filled' : ''}`}
                                        value={cedulaCuenta}
                                        onChange={handleInputChange3}
                                        style={{ width: '100%' }}
                                    />
                                    <label htmlFor="input2" className={cedulaCuenta ? 'ui-label-floated' : ''} style={{ color: '#6c747c', fontSize: '16px', background: '#fff' }}>Cedula</label>
                                </span>


                                &nbsp;
                            </div>
                        </div>

                    </div>
                    &nbsp;

                    &nbsp;
                    <div>
                        <DataTablaar dataar={DataCategoria.data} loading={loading} onPageChange={onPageChange} />
                    </div>
                </form>




                <Dialog header="Enviar Estados de Cuenta" visible={visibleEnviarCuenta} style={{ width: '400px', minWidth: '400px' }} onHide={() => setvisibleEnviarCuenta(false)} footer= {footerContent} draggable={false} resizable={false} >

                </Dialog>


                <Toast ref={toast} />



                <Dialog visible={loading} modal closable={false} showHeader={false} style={{ width: '50px', height: '53px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div className="d-flex justify-content-center align-items-center h-100" style={{ borderRadius: '4px' }}>
                        <i className="pi pi-spin pi-spinner loading-icon" aria-hidden="true" style={{ transform: 'scale(0.5)', marginTop: '18px' }}></i>
                    </div>
                </Dialog>

                <Dialog header="Error" visible={dialogVisibleError} position={position} style={{ width: '40vw' }} onHide={() => setDialogVisibleError(false)}>
                    <p className="m-0">
                        {error}
                    </p>
                </Dialog>

            </div>
        </div>

    );


};

export default EstadosCuenta;








