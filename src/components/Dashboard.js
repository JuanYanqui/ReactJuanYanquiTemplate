
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import * as XLSX from 'xlsx';
import { Toast } from 'primereact/toast';
import { CategoriaCoralService } from '../service/CategoriaCoralService';
import { ArticulosService } from '../serviceIntermedia/ArticulosService';
import { ArticulosIntermediaws } from '../service/ArticulosService';
import { MultiSelect } from 'primereact/multiselect';
import { Checkbox } from 'primereact/checkbox';
const Dashboard = () => {
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [isDialogVisible2, setDialogVisible2] = useState(false);
    const [excelData, setExcelData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('center');
    const toast = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchQuery2, setSearchQuery2] = useState("");
    const [searchQuery3, setSearchQuery3] = useState("");
    const [codigo, setCodigo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [codigoArticulo, setCodigoArticulo] = useState("");
    const [descripcionArticulo, setDescripcionArticulo] = useState("");
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);

    const [DataCategoria, setDataCategoria] = useState([]);
    const categoriasdata = new CategoriaCoralService();

    const [DataArticulos, setDataArticulos] = useState([]);
    const articulosdata = new ArticulosIntermediaws();

    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(10);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const selectedValues = {};

            citi.forEach(item => {
                selectedValues[item.name] = selectedvalor.includes(item.value);
            });
            const {
                'Solo Activos': soloActivosParam,
                'Solo Pendientes': soloPendientesParam,
                'Incluir Barras': incluirBarrasParam,
                'Solo sin Rentas': soloSinRentasParam,
                'Solo Compras': soloCompraParam,
                'Solo Venta Retail': soloVentaRetailParam,
                'Solo sin Precios': soloSinPreciosParam
            } = selectedValues;
            const presentacionParam = "";
            const proveedorParam = "";
            const barraParam = "";
            const jerarquiaParam = "";

            const response1 = await articulosdata.listarArticulosListaFull(codigoArticulo, presentacionParam, descripcionArticulo, proveedorParam, barraParam, soloActivosParam, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, soloCompraParam, soloVentaRetailParam, jerarquiaParam, currentPage, rowsPerPage);
            const response = await articulosdata.PaginacionlistarArticulosListaFull(codigoArticulo, presentacionParam, descripcionArticulo, proveedorParam, barraParam, soloActivosParam, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, soloCompraParam, soloVentaRetailParam, jerarquiaParam);
            if (response) {
                setDataArticulos(response1);
                console.log(response1);
                const pageSize = rowsPerPage;
                const totalCount = response.rowCount;
                const totalPages = Math.ceil(totalCount / pageSize);
                setTotalRecords(response.rowCount);
                setTotalPages(totalPages);
                console.log("Total Datos:", response.rowCount);
                console.log("Numero de datos por Pagina:", pageSize);
                console.log("Total Paginas:", totalPages);
            }
        };
        fetchData();
    }, [currentPage, rowsPerPage]);

    const onPageChange = (event) => {
        const newPage = Math.floor(event.first / event.rows);
        setRowsPerPage(event.rows);
        setCurrentPage(newPage);
    };

    const DataTablaar = ({ dataar }) => {
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
                    paginatorTemplate={`CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown`}
                    currentPageReportTemplate={`Página {currentPage} de {totalPages}`}
                >
                    <Column field="codigo" header="Código" />
                    <Column field="descripcion" header="Descripción" />
                    <Column field="precio" header="Precio" />
                    <Column field="unidadPedido" header="Unidad de Pedido" />
                    <Column field="rowKey" header="Rowkey" />
                    <Column field="icon" header="" body={leftToolbarTemplate2} />
                </DataTable>
            </div>
        );
    };




    const CustomDataTable = ({ data2 }) => {
        if (!data2) {
            return <p>No hay datos disponibles.</p>;
        }
        const filteredData2 = data2.filter(item =>
            (item[0] && item[0].toLowerCase().includes(searchQuery2.toLowerCase())) ||
            (item[1] && item[1].toLowerCase().includes(searchQuery2.toLowerCase())) ||
            (item[2] && item[2].toLowerCase().includes(searchQuery2.toLowerCase()))
        );


        return (
            <DataTable value={filteredData2} paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25]}>
                <Column field="0" header="Código" />
                <Column field="1" header="Descripción" />
                <Column field="2" header="Nivel" />
                <Column field="icon" header="" body={ingresoexel} />
            </DataTable>
        );

    };


    const CustomDataTable3 = ({ data3 }) => {
        if (!data3) {
            return <p>No hay datos disponibles.</p>;
        }
        const filteredData3 = data3.filter(item =>
            (item[0] && item[0].toLowerCase().includes(searchQuery3.toLowerCase())) ||
            (item[1] && item[1].toLowerCase().includes(searchQuery3.toLowerCase())) ||
            (item[2] && item[2].toLowerCase().includes(searchQuery3.toLowerCase()))
        );
        return (
            <DataTable value={filteredData3} paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25]}>
                <Column field="0" header="Código" />
                <Column field="1" header="Descripción" />
                <Column field="2" header="Nivel" />
                <Column field="icon" header="" body={ingresoidividual} />
            </DataTable>
        );
    };


    const handleButtonClick = (codigo) => {
        console.log('Código de la fila:', codigo);
        if (codigo != null) {
            openNew();
        }
    };

    const openNew = () => {
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const openNew2 = () => {
        setDialogVisible2(true);
    };

    const hideDialog2 = () => {
        setDialogVisible2(false);
        setUploadedFileName("");
    };

    const leftToolbarTemplate2 = (rowData) => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Agregar Categoria" onClick={() => handleButtonClick(rowData.codigo)} icon="pi pi-plus" style={{ backgroundColor: '#e0e0e0' }} />
            </div>
        );
    };

    const ingresoexel = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Agregar" icon="pi pi-plus" onClick={() => show('top')} className="success" style={{ minWidth: '10rem' }} />
            </div>
        );
    };

    const ingresoidividual = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Agregar" icon="pi pi-plus" className="success" style={{ minWidth: '10rem' }} />
            </div>
        );
    };

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Operación Completada.' });
    };

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Formato Invalido.', life: 3000 });
    }

    const showErrorcancel = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Proceso Cancelado.', life: 3000 });
    }

    const handleYesClick = () => {
        setVisible(false);
        showSuccess();
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
        categoriasdata.PostCategoriaCoralData(codigo, descripcion, selectedCity).then((data) => {

            setDataCategoria(data);
        });
    };


    const filtrotabla = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <div className="p-field p-col-12 p-md-12 p-lg-4">
                    <label htmlFor="username">Código</label>
                    <span className="p-inputgroup">
                        <span className="p-inputgroup-addon"></span>
                        <InputText
                            placeholder="Código"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                        />
                    </span>
                </div>
                <div className="p-field p-col-12 p-md-12 p-lg-4">
                    <label htmlFor="username">Descripción</label>
                    <span className="p-inputgroup">
                        <span className="p-inputgroup-addon"></span>
                        <InputText
                            placeholder="Descripción"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </span>
                </div>
                <div className="p-field p-col-12 p-md-12 p-lg-4">
                    <label htmlFor="price">Nivel</label>
                    <span className="p-inputgroup">
                        <span className="p-inputgroup-addon"><i className="pi pi-co" /></span>
                        <Dropdown
                            value={selectedCity}
                            options={cities}
                            onChange={handleCityChange}
                            optionLabel="label"
                            placeholder="Seleccionar"
                            className="w-full md:w-20rem"
                        />
                    </span>
                </div>
                <div className="p-field p-col-12 p-md-12 p-lg-4">
                    <label htmlFor="username">Filtrar</label>
                    <span className="p-inputgroup">
                        <Button label="Seleccionar" icon="pi pi-search" className="secondary" onClick={handleFilterClick} style={{ backgroundColor: '#e0e0e0' }} />
                    </span>
                </div>
            </div>
        );
    };

    const [loading, setLoading] = useState(false);

    const handleCargaDatos = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            const selectedValues = {};

            citi.forEach(item => {
                selectedValues[item.name] = selectedvalor.includes(item.value);
            });
            const {
                'Solo Activos': soloActivosParam,
                'Solo Pendientes': soloPendientesParam,
                'Incluir Barras': incluirBarrasParam,
                'Solo sin Rentas': soloSinRentasParam,
                'Solo Compras': soloCompraParam,
                'Solo Venta Retail': soloVentaRetailParam,
                'Solo sin Precios': soloSinPreciosParam
            } = selectedValues;
            const presentacionParam = "";
            const proveedorParam = "";
            const barraParam = "";
            const jerarquiaParam = "";
            articulosdata.listarArticulosListaFull(codigoArticulo, presentacionParam, descripcionArticulo, proveedorParam, barraParam, soloActivosParam, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, soloCompraParam, soloVentaRetailParam, jerarquiaParam, currentPage).then((datas) => {

                setDataArticulos(datas);
            });


            articulosdata.PaginacionlistarArticulosListaFull(codigoArticulo, presentacionParam, descripcionArticulo, proveedorParam, barraParam, soloActivosParam, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, soloCompraParam, soloVentaRetailParam, jerarquiaParam).then((datas) => {
                const totalCount = datas.rowCount;
                const pageSize = 10;
                const totalPages = Math.ceil(totalCount / pageSize);
                setTotalRecords(datas.rowCount);
                setTotalPages(totalPages);
                console.log("Total Datos:", datas.rowCount);
                console.log("Numero de datos por Pagina:", pageSize);
                console.log("Total Paginas:", totalPages);
            });

            /*const unidadParam = "4712878627406";
            const sociedadParam = "";
            const centroParam = null;
            const almacenParam = "";
            const numPedidoParam = "";
            const soloActivoParam = true;*/

            /*articulosdata.actualizarCostosArticuloAll().then((dataA) => {
                console.log(dataA);

            });

            articulosdata.getTArticuloBarra(unidadParam, soloActivoParam).then((dataS) => {
                console.log(dataS);

            });

            articulosdata.listarArticulosPrecioFull(codigoParam, presentacionParam, descripcionParam, proveedorParam, barraParam, soloActivosParam, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, soloCompraParam, soloVentaRetailParam, soloVentaMayorParam, soloTransferenciaParam, jerarquiaParam, lazyInfoParam).then((dataF) => {
                console.log(dataF);

            });

            articulosdata.listarArticulosPrecio(codigoParam, presentacionParam, descripcionParam, proveedorParam, barraParam, soloActivosParam, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, lazyInfoParam).then((dataP) => {
                console.log(dataP);

            });
            articulosdata.obtenerArticuloCaja(centroParam).then((dataP) => {
                console.log(dataP);

            });

            articulosdata.listarArticulosSolicitudPedFull(codigoParam, presentacionParam, descripcionParam, proveedorParam, barraParam, soloActivosParam, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, soloCompraParam, soloVentaRetailParam, soloVentaMayorParam, soloTransferenciaParam, jerarquiaParam, centroParam, almacenParam, numPedidoParam, lazyInfoParam).then((dataS) => {
                console.log(dataS);

            });

            articulosdata.listarArticulosPresentaciones(codigoParam, sociedadParam).then((dataS) => {
                console.log(dataS);

            });*/

        }, 2000);
    };


    const CargarDatosArticulos = () => {
        return <div className="card flex justify-content-center">

            <span className="p-inputgroup">
                <InputText
                    placeholder="Código"
                    value={codigoArticulo}
                    onChange={(e) => setCodigoArticulo(e.target.value)}
                />
            </span>
            <span className="p-inputgroup">
                <InputText
                    placeholder="Descripción"
                    value={descripcionArticulo}
                    onChange={(e) => setDescripcionArticulo(e.target.value)}
                />
            </span>

            <MultiSelect
                value={selectedvalor}
                onChange={(e) => setSelectedvalor(e.value)}
                options={citi}
                optionLabel="name"
                placeholder="Seleccione Filtro"
                maxSelectedLabels={3}
                className="w-full md:w-20rem"
            />
            <span className="p-inputgroup">
                <Button
                    label="Carga Datos"
                    icon={loading ? "pi pi-spin pi-spinner" : ""}
                    style={{ backgroundColor: 'silver', color: 'black', fontSize: '1rem' }}
                    onClick={handleCargaDatos}
                    disabled={loading}
                />
            </span>

        </div>
    };

    const CargarDatosArticulos2 = () => {
        return <div className="card flex justify-content-center">


        </div>
    };



    const rightToolbarTemplate = () => {
        return <Button label="Carga Masiva" icon="pi pi-upload" className="secondary" onClick={openNew2} />;
    };

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" />
        </React.Fragment>
    );

    const [uploadedFileName, setUploadedFileName] = useState('');

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const validExtensions = ['xls', 'xlsx'];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (validExtensions.includes(fileExtension)) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];

                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                    setExcelData(jsonData);
                    setUploadedFileName(file.name);
                    console.log(jsonData)
                };

                reader.readAsArrayBuffer(file);
            } else {
                showError();
                setUploadedFileName("");
            }
        } else {
            showError();
            setUploadedFileName("");
        }
    };

    const productDialogFooter2 = (
        <div className="p-d-flex p-ai-center" style={{ alignItems: 'center' }}>
            <label htmlFor="idarchivo" style={{ cursor: 'pointer' }}>
                <img src="../assets/layout/images/sobresalir.png" alt="Excel Icon" style={{ width: '25px', height: '25px' }} />
            </label>
            <input
                id="idarchivo"
                type="file"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
            />
            <span className="p-ml-2">{uploadedFileName}</span>
        </div>
    );
    const show = (position) => {
        setPosition(position);
        setVisible(true);
    };

    ;

    const [selectedvalor, setSelectedvalor] = useState([]);
    const citi = [
        { name: 'Solo Activos', value: 1 },
        { name: 'Solo Pendientes', value: 2 },
        { name: 'Incluir Barras', value: 3 },
        { name: 'Solo sin Rentas', value: 4 },
        { name: 'Solo Compras', value: 5 },
        { name: 'Solo Venta Retail', value: 6 },
    ];

    

    return (
        <div >
            <div class="layout-content">
                <form>
                    <div className="p-col-12">
                        <div>
                            <span className="Fs20 FontBold">Control Articulos</span>
                            <hr className="ui-separator ui-state-default ui-corner-all"/>
                            <div className="p-grid p-formgrid">
                                <span className="p-float-label">
                                
                                    <input
                                        id="input1"
                                        type="text"
                                        style={{ width: '120px' }}
                                        className="ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all MarRight10 ui-state-filled"
                                        value={codigoArticulo}
                                        onChange={(e) => setCodigoArticulo(e.target.value)}
                                    />
                                     <label htmlFor="input1">Código</label>
                                </span>

                                &nbsp;
                                &nbsp;

                                <span className="p-float-label">
                                    
                                    <input
                                        id="input2"
                                        type="text"
                                        style={{ width: '120px' }}
                                        className="ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all MarRight10 ui-state-filled"
                                        value={descripcionArticulo}
                                        onChange={(e) => setDescripcionArticulo(e.target.value)}
                                    />
                                    <label htmlFor="input2">Descripción</label>
                                </span>

                                &nbsp;
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
                            </div>
                        </div>
                    </div>
                    &nbsp;
                    <div>
                        <DataTablaar dataar={DataArticulos.data} />
                    </div>
                </form>



                <Dialog visible={isDialogVisible} style={{ width: '78rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Categoria Coral" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                    <div className="card" style={{ backgroundColor: '#e0e0e0' }}>

                        <Toolbar className="mb-4" right={filtrotabla}></Toolbar>
                        <div>
                            <div className="p-field p-col-12 p-md-12 p-lg-4">
                                <label htmlFor="search">Buscar</label>
                                <span className="p-inputgroup">
                                    <span className="p-inputgroup-addon"><i className="pi pi-search" /></span>
                                    <InputText
                                        placeholder="Buscar"
                                        value={searchQuery3}
                                        onChange={(e) => setSearchQuery3(e.target.value)}
                                    />
                                </span>
                                <CustomDataTable3 data3={DataCategoria} />
                            </div>
                        </div>
                    </div>
                </Dialog>





                <Dialog
                    visible={isDialogVisible2}
                    style={{ width: '78rem' }}
                    breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                    header="Categoria Coral"
                    modal
                    className="p-fluid"
                    onHide={hideDialog2}
                >
                    <div className="card" style={{ backgroundColor: '#e0e0e0' }}>
                        <Toolbar className="mb-4" right={productDialogFooter2} left={filtrotabla} ></Toolbar>
                        <div>
                            <div className="p-field p-col-12 p-md-12 p-lg-4">
                                <label htmlFor="search">Buscar</label>
                                <span className="p-inputgroup">
                                    <span className="p-inputgroup-addon"><i className="pi pi-search" /></span>
                                    <InputText
                                        placeholder="Buscar"
                                        value={searchQuery2}
                                        onChange={(e) => setSearchQuery2(e.target.value)}
                                    />
                                </span>
                                <CustomDataTable data2={DataCategoria} />
                            </div>

                        </div>
                    </div>
                </Dialog>

                <Dialog header="Información" visible={visible} position={position} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent} draggable={false} resizable={false}>
                    <p className="m-0">
                        Esta seguro de insertar exel.
                    </p>
                </Dialog>
                <Toast ref={toast} />
            </div>
        </div>
    );


};

export default Dashboard;





