
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Panel } from 'primereact/panel';
import { FileUpload } from 'primereact/fileupload';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
import { Toast } from 'primereact/toast';

const Dashboard = ({ categoriaCoralData }) => {
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [isDialogVisible2, setDialogVisible2] = useState(false);
    const [expandedRows, setExpandedRows] = useState([]);
    const [dropdownItem, setDropdownItem] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [date, setDate] = useState(null);
    const [selectedCities, setSelectedCities] = useState(null);
    const [excelData, setExcelData] = useState([]);
    const [cate, setCateData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('center');
    const toast = useRef(null);

    useEffect(() => {
        if (categoriaCoralData) {
            localStorage.setItem('capturedCategoriaCoralData', JSON.stringify(categoriaCoralData));
        }
    }, [categoriaCoralData]);

    const [capturedCategoriaCoralData, setCapturedCategoriaCoralData] = useState(
        JSON.parse(localStorage.getItem('capturedCategoriaCoralData')) || []
    );
    console.log("Captured categoriaCoralData:", capturedCategoriaCoralData);


    const [usuario, setUsuario] = useState(localStorage.getItem('capturedCategoriaCoralData'));

    useEffect(() => {
      const handleStorageUpdate = () => {
        setUsuario(localStorage.getItem('capturedCategoriaCoralData'));
      };
  
      window.addEventListener('storageUpdated', handleStorageUpdate);
  
      return () => {
        window.removeEventListener('storageUpdated', handleStorageUpdate);
      };
    }, []);


    console.log("localstorage", usuario);


    const userData = {
        object: [
            {
                menId: 652,
                nombre: "Coral Seccion",
                url: "https://www.gerardoortiz.com/coralSeccion/",
                icono: "fa fa-tags",
                hijos: [
                    {
                        menId: 653,
                        nombre: "Reporte Factura TEST",
                        url: "https://www.gerardoortiz.com/coralSeccion/reportes/factura_codigo_cliente.jsf",
                        icono: "fa fa-crosshairs"
                    },
                    {
                        menId: 658,
                        nombre: "Precio historico de articulo",
                        url: "https://www.gerardoortiz.com/coralSeccion/reportes/ingresos_historicos.jsf",
                        icono: "fa fa-dollar"
                    }
                ]
            },
            {
                menId: 805,
                nombre: "Activos Fijos",
                url: "#",
                icono: "fas fa-book",
                hijos: [
                    {
                        menId: 806,
                        nombre: "Formar Activo",
                        url: "https://www.gerardoortiz.com/activosFijos/activosFijos/formaActivo.jsf",
                        icono: "fas fa-clipboard-list"
                    },
                    {
                        menId: 807,
                        nombre: "Ingresar Activo",
                        url: "https://www.gerardoortiz.com/activosFijos/activosFijos/ingresaActivo.jsf",
                        icono: "fas fa-clipboard-list"
                    },
                    {
                        menId: 808,
                        nombre: "Recepcion Entrega",
                        url: "https://www.gerardoortiz.com/activosFijos/activosFijos/recepcionEntrega.jsf",
                        icono: "fas fa-clipboard-list"
                    },
                    {
                        menId: 809,
                        nombre: "Depreciacion del Activo",
                        url: "https://www.gerardoortiz.com/activosFijos/activosFijos/depreciaActivo.jsf",
                        icono: "fas fa-clipboard-list"
                    },
                    {
                        menId: 810,
                        nombre: "Gestion Sitio",
                        url: "https://www.gerardoortiz.com/activosFijos/activosFijos/gestionSitio.jsf",
                        icono: "fas fa-clipboard-list"
                    }
                ]
            },
            {
                menId: 288,
                nombre: "Regalos",
                url: "#",
                icono: "fas fa-book",
                hijos: [
                    {
                        menId: 107,
                        nombre: "Regalos Activos",
                        url: "https://www.gerardoortiz.com/activosFijos/activosFijos/formaActivo.jsf",
                        icono: "fas fa-clipboard-list"
                    },
                ]
            }

        ]
    };


    const preparedData = [];
    userData.object.forEach((parentItem) => {
        const parentRow = {
            id: parentItem.menId,
            name: parentItem.nombre,
            url: parentItem.url,
            icon: parentItem.icono,
            children: parentItem.hijos || [],
        };

        preparedData.push(parentRow);

        if (parentItem.hijos) {
            parentItem.hijos.forEach((childItem) => {
                const childRow = {
                    id: childItem.menId,
                    name: childItem.nombre,
                    url: childItem.url,
                    icon: childItem.icono,
                    parent: parentItem.menId,
                };
                preparedData.push(childRow);
            });
        }
    });
    const [activeSubMenuIndex, setActiveSubMenuIndex] = useState(null);

    const toggleRow = (rowData) => {
        const isRowExpanded = expandedRows.includes(rowData.id);
        if (isRowExpanded) {
            setExpandedRows(expandedRows.filter(id => id !== rowData.id));
        } else {
            setExpandedRows([...expandedRows, rowData.id]);
        }
    };

    const isSubMenuActive = (menId) => {
        return activeSubMenuIndex === menId;
    };

    const onSubMenuClick = (menId) => {
        setActiveSubMenuIndex((prevActiveIndex) => (prevActiveIndex === menId ? null : menId));
    };

    const rowExpansionTemplate = (rowData) => {
        if (!rowData.children || rowData.children.length === 0) return null;

        return (
            <div className="p-mb-4">
                {rowData.children.map((child, index) => (
                    <div key={child.id} className="p-d-flex p-jc-between p-ai-center">
                        <a href={child.url}>{child.name}</a>
                        <i className={child.icon}></i>
                        {child.hijos && child.hijos.length > 0 && (
                            <Button
                                icon={`pi ${isSubMenuActive(child.menId) ? 'pi-angle-up' : 'pi-angle-down'}`}
                                className={`p-row-toggler p-link`}
                                onClick={() => onSubMenuClick(child.menId)}
                                aria-expanded={isSubMenuActive(child.menId)}
                            />
                        )}
                    </div>
                ))}
            </div>
        );
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
    /*const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" />
            </div>
        );
    };*/

    const leftToolbarTemplate2 = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Agregar Categoria" icon="pi pi-plus" onClick={openNew} style={{ backgroundColor: '#e0e0e0' }} />
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

    const toastRef = useRef(null);

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
        { name: 'Nivel 1' },
        { name: 'Nivel 2' },
        { name: 'Nivel 3' },
        { name: 'Nivel 4' },
        { name: 'Nivel 5' },
        { name: 'Nivel 6' },
    ];
    const [selectedCity, setSelectedCity] = useState(null);

    const filtrotabla = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <div className="p-field p-col-12 p-md-12 p-lg-4">
                    <label htmlFor="username">Nombre</label>
                    <span className="p-inputgroup">
                        <span className="p-inputgroup-addon"></span>
                        <InputText placeholder="Nombre" />
                    </span>
                </div>

                <div className="p-field p-col-12 p-md-12 p-lg-4">
                    <label htmlFor="price">Nivel</label>
                    <span className="p-inputgroup">
                        <span className="p-inputgroup-addon"><i className="pi pi-co" /></span>
                        <Dropdown value={selectedCity} options={cities} onChange={(e) => setSelectedCity(e.value)} optionLabel="name"
                            placeholder="Seleccionar" className="w-full md:w-20rem" />
                    </span>
                </div>

                <div className="p-field p-col-12 p-md-12 p-lg-4">
                    <label htmlFor="username">Filtrar</label>
                    <span className="p-inputgroup">
                        <Button label="Selecionar" icon="pi pi-search" style={{ backgroundColor: '#e0e0e0' }} />
                    </span>
                </div>
            </div>
        );
    };


    const rightToolbarTemplate = () => {
        return <Button label="Carga Masiva" icon="pi pi-upload" className="secondary" onClick={openNew2} />;
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between" >
            <h4 className="m-0"></h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const filteredData = preparedData.filter(
        (row) =>
            row.name.toLowerCase().includes(searchText.toLowerCase()) ||
            (row.url && row.url.toLowerCase().includes(searchText.toLowerCase()))
    );

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" />
            <Button label="Yes" icon="pi pi-check" severity="danger" />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined />
            <Button label="Yes" icon="pi pi-check" severity="danger" />
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
    console.log("categoriaCoralData:", categoriaCoralData);
    const data = categoriaCoralData ? categoriaCoralData.map((row) => ({
        id: row[0],
        name: row[1],
        code: row[2],
    })) : [];


    return (
        <div>
            <div className="card" style={{ backgroundColor: '#e0e0e0' }}>
                <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
                <DataTable
                    value={filteredData}
                    dataKey="id"
                    rowExpansionTemplate={rowExpansionTemplate}
                    paginator
                    rows={2}
                    rowsPerPageOptions={[5, 10, 25]}
                    expandedRows={expandedRows}
                    onRowToggle={(e) => toggleRow(e.data)}
                    header={header}
                >
                    <Column field="name" header="Name" sortable filter filterPlaceholder="Search" />
                    <Column field="url" header="URL" sortable filter filterPlaceholder="Search" body={(rowData) => <a href={rowData.url}>{rowData.url}</a>} />
                    <Column field="icon" header="" body={(rowData) => <i className={rowData.icon}></i>} style={{ textAlign: 'center' }} />
                    <Column field="icon" header="" body={leftToolbarTemplate2} />
                </DataTable>
            </div>
            <Dialog visible={isDialogVisible} style={{ width: '78rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Categoria Coral" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="card" style={{ backgroundColor: '#e0e0e0' }}>

                    <Toolbar className="mb-4" right={filtrotabla}></Toolbar>
                    <DataTable value={filteredData}
                        dataKey="id"
                        rowExpansionTemplate={rowExpansionTemplate}
                        paginator
                        rows={2}
                        rowsPerPageOptions={[5, 10, 25]}
                        expandedRows={expandedRows}
                        onRowToggle={(e) => toggleRow(e.data)}
                        header={header}>
                        <Column field="name" header="Name" sortable filter filterPlaceholder="Search" />
                        <Column field="url" header="URL" sortable filter filterPlaceholder="Search" body={(rowData) => <a href={rowData.url}>{rowData.url}</a>} />
                        <Column field="icon" header="" body={(rowData) => <i className={rowData.icon}></i>} style={{ textAlign: 'center' }} />
                        <Column field="icon" header="" body={ingresoidividual} />
                    </DataTable>
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
                    <DataTable value={data} dataKey="id" rowExpansionTemplate={rowExpansionTemplate} paginator rows={2} rowsPerPageOptions={[5, 10, 25]} expandedRows={expandedRows} onRowToggle={(e) => toggleRow(e.data)} header={header}>
                        {data && data.length > 0 && Object.keys(data[0]).map((key, index) => (
                            <Column key={index} field={key} header={key} sortable filter filterPlaceholder="Search" />
                        ))}
                        <Column field="icon" header="" body={leftToolbarTemplate2} />
                    </DataTable>
                </div>
            </Dialog>

            <Dialog header="Información" visible={visible} position={position} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent} draggable={false} resizable={false}>
                <p className="m-0">
                    Esta seguro de insertar exel.
                </p>
            </Dialog>
            <Toast ref={toast} />

        </div>
    );


};

export default Dashboard;



