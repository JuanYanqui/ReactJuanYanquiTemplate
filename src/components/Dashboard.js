
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import * as XLSX from 'xlsx';
import { Toast } from 'primereact/toast';
import { CategoriasCoralIntermediaws } from '../serviceIntermedia/CategoriasCoralIntermediaws';
import { ArticulosIntermediaws } from '../serviceIntermedia/ArticulosIntermediaws';
import { Checkbox } from 'primereact/checkbox';
const Dashboard = ({ usuarioUppercase }) => {
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('center');
    const toast = useRef(null);
    const [codigoCategoria, setCodigoCategoria] = useState("");
    const [descripcionCategoria, setDescripcionCategoria] = useState("");
    const [codigoArticulo, setCodigoArticulo] = useState("");
    const [descripcionArticulo, setDescripcionArticulo] = useState("");
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);

    const [DataCategoria, setDataCategoria] = useState([]);
    const categoriasdata = new CategoriasCoralIntermediaws();

    const [DataArticulos, setDataArticulos] = useState([]);
    const articulosdata = new ArticulosIntermediaws();

    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(10);
    const [checked, setChecked] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedCode, setSelectedCode] = useState(null);
    const [error, setError] = useState(null);
    const [dialogVisibleError, setDialogVisibleError] = useState(false);

    const handleSelectionChange = (e) => {
        setSelectedItems(e.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const soloPendientesParam = false
            const incluirBarrasParam = false
            const soloSinRentasParam = false
            const soloCompraParam = false
            const soloVentaRetailParam = false
            const soloSinPreciosParam = false
            const presentacionParam = "";
            const proveedorParam = "";
            const barraParam = "";
            const jerarquiaParam = "";
            const response1 = await articulosdata.listarArticulosListaFull(codigoArticulo, presentacionParam, descripcionArticulo, proveedorParam, barraParam, checked, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, soloCompraParam, soloVentaRetailParam, jerarquiaParam, currentPage, rowsPerPage);
            const response = await articulosdata.PaginacionlistarArticulosListaFull(codigoArticulo, presentacionParam, descripcionArticulo, proveedorParam, barraParam, checked, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, soloCompraParam, soloVentaRetailParam, jerarquiaParam);
            if (response) {
                console.log(response1);
                setDataArticulos(response1);
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
            categoriasdata.listarCategoriasCoralVista(codigoCategoria, descripcionCategoria, selectedCity).then((data) => {
                // console.log("coraldataaa", data)
                setDataCategoria(data);
                setLoading(false);
            });
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
                    currentPageReportTemplate={`Página {currentPage} de {totalPages}`}
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="codigo" header="Código" />
                    <Column field="descripcion" header="Descripción" />
                    <Column field="precio" header="Precio" />
                    <Column field="unidadPedido" header="Unidad de Pedido" />
                    <Column field="texto2" header="PRUEBA" />
                    <Column field="texto3" header="Nivel 1" />
                    <Column field="texto4" header="Nivel 2" />
                    <Column field="texto5" header="Nivel 3" />
                    <Column field="texto6" header="Nivel 4" />
                </DataTable>
            </div>
        );
    };

    const CustomDataTable3 = ({ data3 }) => {
        if (!data3) {
            return <p>No hay datos disponibles.</p>;
        }

        return (
            <DataTable value={data3} paginator
                rows={5} paginatorPosition="both"
                rowsPerPageOptions={[5, 10, 25]}>
                <Column field="0" header="Código" />
                <Column field="1" header="Descripción" />
                <Column field="2" header="Nivel" />
                <Column field="icon" header="" body={ingresoidividual} />
            </DataTable>
        );
    };

    const handleIconClick = (rowData) => {
        setSelectedCode(rowData[0]);
        setVisible(true);
    };

    const openNew = (position) => {
        setPosition(position);
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
        setSelectedItems([]);
    };


    const ingresoidividual = (rowData) => {
        return (
            <div className="flex flex-wrap gap-2">
                <i className="pi pi-plus" style={{ fontSize: '1rem', color: 'black' }} onClick={() => handleIconClick(rowData)} ></i>
            </div>
        );
    };


    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Operación Completada.' });
    };

    const showErrorcancel = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Proceso Cancelado.', life: 3000 });
    }

    const showErrorIngreso = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'No seleciono ningun articulo.', life: 3000 });
    }

    const showErrorNivel = () => {
        toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'La Categoria debe pertencer a Nivel 4.', life: 3000 });
    }

    const handleYesClick = () => {
        if (selectedItems.length === 0) {
            setVisible(false);
            showErrorIngreso();
        } else {
            if (selectedCode.length == 7) {
                const cambiosData = selectedItems.map(item => ({
                    categoriaNueva: selectedCode,
                    descripcion: "Nuevo categoria ingresada",
                    categoriaAnterior: item.texto2 !== undefined ? item.texto2 : 9090909,
                    usuCrea: null,
                    codigo: item.codigo,
                    fechaModifica: null,
                    fechaCrea: null,
                    fecha: null,
                    usuModifica: null
                }));

                const usuarioParam = usuarioUppercase;
                categoriasdata.guardarCambiosCategoria(cambiosData, usuarioParam)
                    .then((response) => {
                        if (response.data.status === 0) {
                            console.log(response.data.message);
                            setError(response.data.message);
                            setPosition('top');
                            setDialogVisibleError(true);
                            return response.data.message;
                        } else {

                            console.log(response.data.status);
                            const objectData = JSON.parse(response.data.object);
                            setSelectedItems([]);
                            setDialogVisible(false);
                            console.log("cambios", cambiosData)
                            console.log("usuarioParam", usuarioParam)
                            console.log(objectData);
                            setVisible(false);
                            showSuccess();
                            return objectData;

                        }
                    });

                //console.log(selectedItems);
            } else {
                setVisible(false);
                showErrorNivel();
            }
        }
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


    const cities = [
        { label: 'Seleccionar', value: null },
        { label: 'Nivel 1', value: 1 },
        { label: 'Nivel 2', value: 2 },
        { label: 'Nivel 3', value: 3 },
        { label: 'Nivel 4', value: 4 },
        { label: 'Nivel 5', value: 5 },
        { label: 'Nivel 6', value: 6 },
    ];
    const handleCityChange = (e) => {
        setSelectedCity(e.value);
        setSelectedLevel(e.value);
    };


    const handleFilterClick = () => {

        setLoading(true);
        categoriasdata.listarCategoriasCoralVista(codigoCategoria, descripcionCategoria, selectedCity).then((data) => {
            setDataCategoria(data);
            setLoading(false);
        });
    };


    const [loading, setLoading] = useState(false);
    const handleCargaDatos = () => {
        setLoading(true);

        const soloPendientesParam = false
        const incluirBarrasParam = false
        const soloSinRentasParam = false
        const soloCompraParam = false
        const soloVentaRetailParam = false
        const soloSinPreciosParam = false
        const presentacionParam = "";
        const proveedorParam = "";
        const barraParam = "";
        const jerarquiaParam = "";
        articulosdata.listarArticulosListaFull(codigoArticulo, presentacionParam, descripcionArticulo, proveedorParam, barraParam, checked, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, soloCompraParam, soloVentaRetailParam, jerarquiaParam, currentPage).then((datas) => {
            setDataArticulos(datas);
            setLoading(false);
        });

        articulosdata.PaginacionlistarArticulosListaFull(codigoArticulo, presentacionParam, descripcionArticulo, proveedorParam, barraParam, checked, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, soloCompraParam, soloVentaRetailParam, jerarquiaParam).then((datas) => {
            const totalCount = datas.rowCount;
            const pageSize = 10;
            const totalPages = Math.ceil(totalCount / pageSize);
            setTotalRecords(datas.rowCount);
            setTotalPages(totalPages);
            console.log("Total Datos:", datas.rowCount);
            console.log("Numero de datos por Pagina:", pageSize);
            console.log("Total Paginas:", totalPages);
        });
    };


    const handleInputChange = (event) => {
        setCodigoArticulo(event.target.value);

    };

    const handleInputChange2 = (event) => {
        setDescripcionArticulo(event.target.value);

    };

    const handleInputCodCategoria = (event) => {
        setCodigoCategoria(event.target.value);

    };

    const handleInputDesCategoria = (event) => {
        setDescripcionCategoria(event.target.value);

    };


    return (
        <div class='layout-wrapper menu-layout-overlay'>
            <div style={{ height: '15px' }}></div>
            <div class='content-layout'>
                <form>
                    <div className="p-col-12">
                        <div >
                            <span className="Fs20 FontBold">Control Articulos</span>
                            <hr className="ui-separator ui-state-default ui-corner-all" />
                            <div className="p-grid p-formgrid">
                                <span className="p-float-label" style={{ position: 'relative', display: 'inline-block', maxWidth: '120px' }}>
                                    <input
                                        id="input1"
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
                                        id="input2"
                                        className={`ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all MarRight10 ${descripcionArticulo ? 'ui-state-filled' : ''}`}
                                        value={descripcionArticulo}
                                        onChange={handleInputChange2}
                                        style={{ width: '100%' }}
                                    />
                                    <label htmlFor="input2" className={descripcionArticulo ? 'ui-label-floated' : ''} style={{ color: '#6c747c', fontSize: '16px', background: '#fff' }}>Descripción</label>
                                </span>

                                &nbsp;

                                <button
                                    id="frmListado:j_idt36"
                                    name="frmListado:j_idt36"
                                    className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left MarRight10 ui-button-success"
                                    onClick={handleCargaDatos}
                                    disabled={loading}
                                    type="submit"
                                    role="button"
                                    aria-disabled="false"
                                >
                                    <span className="ui-button-text ui-c"><i className="ui-button-icon-left ui-icon ui-c pi pi-search" /> &nbsp;Filtrar</span>
                                </button>

                                <div className="p-field-checkbox">
                                    <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="checkbox" className="p-checkbox-label">&nbsp; Activos</label>
                                </div>

                                <button
                                    id="botonExtra"
                                    className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left p-mr-2 align-right"
                                    disabled={loading}
                                    type="button"
                                    role="button"
                                    aria-disabled="false"
                                    onClick={() => openNew('top')}
                                >
                                    <span className="ui-button-text ui-c"><i className="ui-button-icon-left ui-icon pi pi-plus" /> &nbsp;Agregar Categoria</span>
                                </button>
                                &nbsp;
                            </div>
                        </div>

                    </div>
                    &nbsp;

                    &nbsp;
                    <div>
                        <DataTablaar dataar={DataArticulos.data} loading={loading} onPageChange={onPageChange} />
                    </div>
                </form>





                <Dialog visible={isDialogVisible} style={{ width: '50rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} modal className="p-fluid" position={position} onHide={hideDialog}>
                    <div className="p-col-12">
                        <div>
                            <span className="Fs20 FontBold">Categoria Coral</span>
                            <hr className="ui-separator ui-state-default ui-corner-all" />
                            <div className="p-grid p-formgrid">
                                <span className="p-float-label" style={{ position: 'relative', display: 'inline-block', maxWidth: '120px' }}>
                                    <input
                                        id="input1"
                                        className={`ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all MarRight10 ${codigoCategoria ? 'ui-state-filled' : ''}`}
                                        value={codigoCategoria}
                                        onChange={handleInputCodCategoria}
                                        style={{ width: '100%' }}
                                    />
                                    <label className={codigoCategoria ? 'ui-label-floated' : ''} style={{ color: '#6c747c', fontSize: '16px', background: '#fff' }}>Código</label>
                                </span>

                                &nbsp;
                                &nbsp;

                                <span className="p-float-label" style={{ position: 'relative', display: 'inline-block', maxWidth: '120px' }}>
                                    <input
                                        id="input2"
                                        className={`ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all MarRight10 ${descripcionCategoria ? 'ui-state-filled' : ''}`}
                                        value={descripcionCategoria}
                                        onChange={handleInputDesCategoria}
                                        style={{ width: '100%' }}
                                    />
                                    <label htmlFor="input2" className={descripcionCategoria ? 'ui-label-floated' : ''} style={{ color: '#6c747c', fontSize: '16px', background: '#fff' }}>Descripción</label>
                                </span>
                                &nbsp;

                                <span className="p-float-label" style={{ position: 'relative', display: 'inline-block', maxWidth: '120px' }}>
                                    <Dropdown
                                        value={selectedCity}
                                        options={cities}
                                        onChange={handleCityChange}
                                        optionLabel="label"
                                        placeholder="Nivel"
                                        id="input3"
                                        className={`  ${selectedCity ? 'ui-state-filled' : ''}`}
                                    />
                                    <label htmlFor="input3" className={selectedCity ? 'ui-label-floated' : ''} style={{ color: '#6c747c', fontSize: '16px', background: '#fff' }}>Nivel</label>
                                </span>


                                <button
                                    id="frmListado:j_idt36"
                                    name="frmListado:j_idt36"
                                    className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left p-mr-2"
                                    onClick={handleFilterClick}
                                    disabled={loading}
                                    type="submit"
                                    role="button"
                                    aria-disabled="false"
                                >
                                    <span className="ui-button-text ui-c"><i className="ui-button-icon-left ui-icon ui-c pi pi-search" /> &nbsp;Filtrar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="p-field p-col-12 p-md-12 p-lg-4">
                            <CustomDataTable3 data3={DataCategoria} />
                        </div>
                    </div>

                </Dialog>


                <Dialog header="Confirmación" visible={visible} position={position} style={{ width: '30vw' }} onHide={() => setVisible(false)} footer={footerContent} draggable={false} resizable={false}>
                    <p className="m-0">
                        Esta seguro de agregar esta categoria.
                    </p>
                </Dialog>
                <Toast ref={toast} />



                <Dialog visible={loading} modal closable={false} showHeader={false} style={{ width: '50px', height: '53px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div className="d-flex justify-content-center align-items-center h-100" style={{ borderRadius: '4px' }}>
                        <i className="pi pi-spin pi-spinner loading-icon" aria-hidden="true" style={{ transform: 'scale(0.5)', marginTop: '18px' }}></i>
                    </div>
                </Dialog>

                <Dialog header="Error" visible={dialogVisibleError} position={position}  style={{ width: '40vw' }} onHide={() => setDialogVisibleError(false)}>
                    <p className="m-0">
                       {error}
                    </p>
                </Dialog>

            </div>
        </div>

    );


};

export default Dashboard;





