
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import { CategoriasCoralIntermediaws } from '../serviceIntermedia/CategoriasCoralIntermediaws';
import "../assets/theme/indigo/theme-light.css";
import { EstadosCuentaIntermediaws } from '../serviceIntermedia/EstadoCuentaIntermediaws';
const EstadosCuenta = () => {
    const [visible, setVisible] = useState(false);
    const [visibleEnviarCuenta, setvisibleEnviarCuenta] = useState(false);
    const [position, setPosition] = useState('center');
    const toast = useRef(null);
    const [bp, setBp] = useState("");
    const [nombreCuenta, setNombreCuenta] = useState("");
    const [cedulaCuenta, setcedulaCuenta] = useState("");
    const [checked, setChecked] = useState(false);
    const estadocuentadata = new EstadosCuentaIntermediaws();
    const [DataEstadoCuenta, setDataEstadoCuenta] = useState("");

    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(10);
    const [selectedbp, setSelectedbp] = useState(null);
    const [selectedsociedad, setSelectedsociedad] = useState(null);
    const [estadoSelecionado, setestadoSelecionado] = useState(null);
    const [error, setError] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [dialogVisibleError, setDialogVisibleError] = useState(false);
    const handleSelectionChange = (e) => {
        setSelectedItems(e.value);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                estadocuentadata.listarEf25Fi(bp, nombreCuenta, cedulaCuenta, checked).then((data) => {
       
                    setDataEstadoCuenta(data);
                    setLoading(false);
                });
            } catch (error) {
                // Manejar el error y mostrar un mensaje o abrir un diálogo
                console.error('Error:', error);
                // Puedes mostrar el mensaje de error en tu componente
                setDialogVisibleError(true);
                return error;
            }
        };
        fetchData();
    }, [currentPage, rowsPerPage]);

    const onPageChange = (event) => {
        const newPage = Math.floor(event.first / event.rows);
        setLoading(true);
        setRowsPerPage(event.rows);
        setCurrentPage(newPage);
    };

    const DataTablaar = ({ dataar }) => {
        const generarpdf = (rowData) => {
            return (
                <div className="flex flex-wrap gap-2">
                    <i className="pi pi-file-pdf" style={{ fontSize: '1.5rem' }} onClick={() => generarpfdpeti(rowData[0], rowData[1])} ></i>
                </div>
            );
        };

        const generarexel = (rowData) => {
            return (
                <div className="flex flex-wrap gap-2">
                    <i className="pi pi-file-excel" style={{ fontSize: '1.5rem' }} onClick={() => generarexelpeti(rowData[0], rowData[1])} ></i>
                </div>
            );
        };

        const startRecord = currentPage * rowsPerPage + 1;
        return (
            <div>
                <DataTable value={dataar}
                    selection={selectedItems}
                    onSelectionChange={handleSelectionChange}
                    selectionMode="checkbox"
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
                    <Column field="0" header="Sociedad" />
                    <Column field="1" header="BpCodigo" />
                    <Column field="2" header="Tipo" />
                    <Column field="3" header="Cedula" />
                    <Column field="4" style={{ width: '25%' }} header="Nombre" />
                    <Column field="5" style={{ width: '29%' }} header="Dirección" />
                    <Column field="6" style={{ width: '6%' }} header="Telefono" />
                    <Column field="8" style={{ width: '5%' }} header="Compra" />
                    <Column field="9" style={{ width: '5%' }} header="Pagos" />
                    <Column field="10" style={{ width: '5%' }} header="Cobros" />
                    <Column header="" body={generarpdf} style={{ width: '3rem' }}></Column>
                    <Column header="" body={generarexel} style={{ width: '3rem' }}></Column>
                </DataTable>
            </div>
        );
    }

    const generarpfdpeti = (sociedad, codbp) => {
        console.log(sociedad);
        console.log(codbp);
        estadocuentadata.getExcelEf25Fi(selectedsociedad, selectedbp).then((data) => {
        })
    }

    const generarexelpeti = (sociedad, codbp) => {
        estadocuentadata.getExcelEf25Fi(selectedsociedad, selectedbp).then((data) => {

        })
    }

    
    const handleYesClickenviarcorreos = () => {
        if (selectedItems.length === 0) {
            setVisible(false);
            showWarn();
        }else{
            setLoading(true);
            const selecionadosCuenta = selectedItems.map(item => ({
                categoriaAnterior: item[1]
            }));
            console.log(selecionadosCuenta);
            estadocuentadata.enviarCorreosEf25Fi(selecionadosCuenta).then((data)=>{
                setSelectedItems([]);
                setLoading(false);
                showSuccess();
                setvisibleEnviarCuenta(false);
            })
        }
       
    };


    const handleNoClick = () => {
        showErrorcancel();
        setvisibleEnviarCuenta(false)
    };

    const enviarmensaje = () => {
        setvisibleEnviarCuenta(true);
    }


    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={handleNoClick} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={handleYesClickenviarcorreos} autoFocus />
        </div>
    );

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Cambio Completado.' });
    };

    const showWarn = () => {
        toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'No a selecionado nigun estado de cuenta' })
    }

    const showErrorcancel = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Proceso Cancelado.', life: 3000 });
    }


    const [loading, setLoading] = useState(false);


    const cargaDatos = () => {
        setLoading(true);
        estadocuentadata.listarEf25Fi(bp, nombreCuenta, cedulaCuenta, checked).then((data) => {
            setDataEstadoCuenta(data);
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
                                        id="inputbp"
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
                                        id="inputnombrecuenta"
                                        className={`ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all MarRight10 ${nombreCuenta ? 'ui-state-filled' : ''}`}
                                        value={nombreCuenta}
                                        onChange={handleInputChange2}
                                        style={{ width: '100%' }}
                                    />
                                    <label htmlFor="inputnombrecuenta" className={nombreCuenta ? 'ui-label-floated' : ''} style={{ color: '#6c747c', fontSize: '16px', background: '#fff' }}>Nombre</label>
                                </span>

                                &nbsp;
                                &nbsp;

                                <span className="p-float-label" style={{ position: 'relative', display: 'inline-block', maxWidth: '120px' }}>
                                    <input
                                        id="inputcedulacuenta"
                                        className={`ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all MarRight10 ${cedulaCuenta ? 'ui-state-filled' : ''}`}
                                        value={cedulaCuenta}
                                        onChange={handleInputChange3}
                                        style={{ width: '100%' }}
                                    />
                                    <label htmlFor="inputcedulacuenta" className={cedulaCuenta ? 'ui-label-floated' : ''} style={{ color: '#6c747c', fontSize: '16px', background: '#fff' }}>Cedula</label>
                                </span>


                                &nbsp;
                                <div className="p-field-checkbox">
                                    <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="checkbox" className="p-checkbox-label">&nbsp; Enviados</label>
                                </div>
                            </div>
                        </div>

                    </div>
                    &nbsp;

                    &nbsp;
                    <div>
                        <DataTablaar dataar={DataEstadoCuenta} loading={loading} onPageChange={onPageChange} />
                    </div>
                </form>




                <Dialog header="Enviar Estados de Cuenta" visible={visibleEnviarCuenta} style={{ width: '400px', minWidth: '400px' }} onHide={() => setvisibleEnviarCuenta(false)} footer={footerContent} draggable={false} resizable={false} >

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








