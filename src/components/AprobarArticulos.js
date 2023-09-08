
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { CategoriasCoralIntermediaws } from '../serviceIntermedia/CategoriasCoralIntermediaws';
import { Checkbox } from 'primereact/checkbox';
import "../assets/theme/indigo/theme-light.css";
const AprobarArticulos = ({ usuarioUppercase }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('center');
    const toast = useRef(null);
    const [codigoArticulo, setCodigoArticulo] = useState("");
    const [descripcionArticulo, setDescripcionArticulo] = useState("");
    const [DataCategoria, setDataCategoria] = useState([]);
    const categoriasdata = new CategoriasCoralIntermediaws();
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(10);
    const [selectedCode, setSelectedCode] = useState(null);
    const [estadoSelecionado, setestadoSelecionado] = useState(null);
    const [error, setError] = useState(null);
    const [dialogVisibleError, setDialogVisibleError] = useState(false);
    const [checkedValue, setCheckedValue] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const fechaInicio = null;
            const fechaFin = null;
            const usuario = "";
            categoriasdata.loadCategoriaCambio(codigoArticulo, descripcionArticulo, checkedValue, fechaInicio, fechaFin, usuario, currentPage, rowsPerPage).then((data) => {
                //console.log("coraldataaa", data)
                setDataCategoria(data);
                setLoading(false);
            });

            const response = await categoriasdata.PaginacionloadCategoriaCambio(codigoArticulo, descripcionArticulo, checkedValue, fechaInicio, fechaFin, usuario, currentPage, rowsPerPage);
            if (response) {
                const pageSize = rowsPerPage;
                const totalCount = response.rowCount;
                const totalPages = Math.ceil(totalCount / pageSize);
                setTotalRecords(response.rowCount);
                setTotalPages(totalPages);
                //console.log("Total Datos:", response.rowCount);
                //console.log("Numero de datos por Pagina:", pageSize);
                //console.log("Total Paginas:", totalPages);
                setLoading(false);
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
    const paginatorLeft = <i />;
    const paginatorRight = <i />;

    const DataTablaar = ({ dataar }) => {
        const aprobarCambio = (rowData) => {
            if (rowData.estado === 4 || rowData.estado === 3) {
                return null;
            }

            return (
                <div className="flex flex-wrap gap-2">
                    <i className="fa-solid fa-check" style={{ fontSize: '1.3rem' }} onClick={() => handleIconClick(rowData.cmbId, rowData.estado)} ></i>
                </div>
            );
        };

        const CancelarCambio = (rowData) => {
            if (rowData.estado === 4 || rowData.estado === 3) {
                return null;
            }

            return (
                <div className="flex flex-wrap gap-2">
                    <i className="fa-solid fa-x" style={{ fontSize: '1.3rem', color: "#e71d1d" }} onClick={() => handleIconClickNo(rowData.cmbId, rowData.estado)} ></i>
                </div>
            );
        };

        const renderEstadoColumn = (rowData) => {
            if (rowData.estado === 3) {
                return "RECHAZADO";
            } else if (rowData.estado === 4) {
                return "APROBADO";
            } else if (rowData.estado === 9) {
                return "ANULADO";
            } else if (rowData.estado === 0) {
                return "PENDIENTE";
            }
            return "";
        };

        const startRecord = currentPage * rowsPerPage + 1;
        const endRecord = Math.min((currentPage + 1) * rowsPerPage, totalRecords);
        return (
            <div>
                <DataTable value={dataar}
                    lazy paginator
                    totalRecords={totalRecords}
                    onPage={onPageChange}
                    rows={rowsPerPage}
                    first={currentPage * rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorPosition="both"
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                    paginatorTemplate={`CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown`}
                    currentPageReportTemplate={`Registros ${startRecord} - ${endRecord} de {totalRecords}`}
                >
                    <Column field="cmbId" header="CMBID" />
                    <Column field="codigo" header="Código" />
                    <Column field="tArticulo.descripcion" style={{ width: '25%' }} header="Descripción" />
                    <Column field="descripcion" style={{ width: '17%' }} header="Motivo" />
                    <Column field="categoriaNueva" style={{ width: '8%' }} header="Categoria Nueva" />
                    <Column field="categoriaAnterior" style={{ width: '9%' }} header="Categoria Anterior" />
                    <Column field="fecha" style={{ width: '10%' }} header="Fecha Emisión" />
                    <Column field="usuCrea" style={{ width: '8%' }} header="Usuario Emitido" />
                    <Column field="estado" header="Estado" body={renderEstadoColumn} />
                    <Column field="icon" header="" body={aprobarCambio} />
                    <Column field="icon" header="" body={CancelarCambio} />
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


    const handleYesClick = () => {

        const cmbIdParam = selectedCode;
        const nuevoEstadoParam = estadoSelecionado;
        const usuarioParam = usuarioUppercase;
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
        });

    };


    const handleNoClick = () => {
        setVisible(false);
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
        //console.log("entro")
        setLoading(true);
        const fechaInicio = null;
        const fechaFin = null;
        const usuario = "";
        categoriasdata.loadCategoriaCambio(codigoArticulo, descripcionArticulo, checkedValue, fechaInicio, fechaFin, usuario, currentPage, rowsPerPage).then((data) => {
            ////console.log("coraldataaa", data)
            setDataCategoria(data);
            setLoading(false);
        });
    }

    const handleInputChange = (event) => {
        setCodigoArticulo(event.target.value);

    };

    const handleInputChange2 = (event) => {
        setDescripcionArticulo(event.target.value);

    };

    ////console.log(checkedValue);
    const handleCheckboxChange = (value) => {
        if (checkedValue === value) {
            setCheckedValue(null);
        } else {
            setCheckedValue(value);
        }
    };


    return (
        <div className='layout-wrapper menu-layout-overlay'>
            <div style={{ height: '15px' }}></div>
            <div className='content-layout'>
                <form>
                    <div className="p-col-12">
                        <div >
                            <span className="Fs20 FontBold">Aprobación Cambio Articulos</span>
                            <hr className="ui-separator ui-state-default ui-corner-all" />
                            <div className="p-grid p-formgrid">
                                <span className="p-float-label" style={{ position: 'relative', display: 'inline-block', maxWidth: '120px' }}>
                                    <input
                                        id="inputcodarticulo"
                                        className={`ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all MarRight10 ${codigoArticulo ? 'ui-state-filled' : ''}`}
                                        value={codigoArticulo}
                                        onChange={handleInputChange}
                                        style={{ width: '100%' }}
                                    />
                                    <label className={codigoArticulo ? 'ui-label-floated' : ''} style={{ color: '#6c747c', fontSize: '16px', background: '#fff' }}>Código</label>
                                </span>

                                &nbsp;
                                &nbsp;

                                <span className="p-float-label" style={{ position: 'relative', display: 'inline-block', maxWidth: '120px' }}>
                                    <input
                                        id="inputdesarticulo"
                                        className={`ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all MarRight10 ${descripcionArticulo ? 'ui-state-filled' : ''}`}
                                        value={descripcionArticulo}
                                        onChange={handleInputChange2}
                                        style={{ width: '100%' }}
                                    />
                                    <label htmlFor="inputdesarticulo" className={descripcionArticulo ? 'ui-label-floated' : ''} style={{ color: '#6c747c', fontSize: '16px', background: '#fff' }}>Descripción</label>
                                </span>

                                &nbsp;

                                <button
                                    id="FiltratAprobacion"
                                    className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left MarRight10 ui-button-success"
                                    onClick={cargaDatos}
                                    disabled={loading}
                                    type="button"
                                    role="button"
                                    aria-disabled="false"
                                >
                                    <span className="ui-button-text ui-c"><i className="ui-button-icon-left ui-icon ui-c pi pi-search" /> &nbsp;Filtrar</span>
                                </button>

                                &nbsp;
                                &nbsp;
                                <div className="p-field-checkbox">
                                    <Checkbox onChange={() => handleCheckboxChange(4)} checked={checkedValue === 4}></Checkbox>
                                    <label htmlFor="checkbox" className="p-checkbox-label">&nbsp; Aprobados</label>
                                </div>
                                &nbsp;
                                &nbsp;
                                <div className="p-field-checkbox">
                                    <Checkbox onChange={() => handleCheckboxChange(3)} checked={checkedValue === 3}></Checkbox>
                                    <label htmlFor="checkbox" className="p-checkbox-label">&nbsp; Rechazados</label>
                                </div>
                                &nbsp;
                                &nbsp;
                                <div className="p-field-checkbox">
                                    <Checkbox onChange={() => handleCheckboxChange(0)} checked={checkedValue === 0}></Checkbox>
                                    <label htmlFor="checkbox" className="p-checkbox-label">&nbsp; Pendientes</label>
                                </div>
                                &nbsp;
                                &nbsp;
                                <div className="p-field-checkbox">
                                    <Checkbox onChange={() => handleCheckboxChange(9)} checked={checkedValue === 9}></Checkbox>
                                    <label htmlFor="checkbox" className="p-checkbox-label">&nbsp; Anulados</label>
                                </div>

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




                <Dialog header="Confirmación" visible={visible} position={position} style={{ width: '30vw' }} onHide={() => setVisible(false)} footer={footerContent} draggable={false} resizable={false}>
                    <p className="m-0">
                        Esta seguro realizar el cambio.
                    </p>
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

export default AprobarArticulos;





