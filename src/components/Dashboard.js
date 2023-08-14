
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
import CategoriaCoralService from '../service/CategoriaCoralService';
const Dashboard = ({ categoriaCoralData, articuloData }) => {
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
    const [codigoFiltro, setCodigoFiltro] = useState("");
    const [descripcionFiltro, setDescripcionFiltro] = useState("");
    const [nivelFiltro, setNivelFiltro] = useState(null);

    useEffect(() => {
        if (categoriaCoralData) {
            localStorage.setItem('capturedCategoriaCoralData', JSON.stringify(categoriaCoralData));
        }
    }, [categoriaCoralData]);

    useEffect(() => {
        if (articuloData) {
            localStorage.setItem('capturedArticulosData', JSON.stringify(articuloData));
        }
    }, [articuloData]);

    const [capturedCategoriaCoralData, setCapturedCategoriaCoralData] = useState(
        JSON.parse(localStorage.getItem('capturedCategoriaCoralData')) || []
    );

    const [categoriaLocal, setCategoriaLocal] = useState(localStorage.getItem('capturedCategoriaCoralData'));
    const [articulosLocal, setArticulosLocal] = useState(localStorage.getItem('capturedArticulosData'));

    useEffect(() => {
        const handleStorageUpdate = () => {
            setCategoriaLocal(localStorage.getItem('capturedCategoriaCoralData'));
            setArticulosLocal(localStorage.getItem('capturedArticulosData'));
        };

        window.addEventListener('storageUpdated', handleStorageUpdate);

        return () => {
            window.removeEventListener('storageUpdated', handleStorageUpdate);
        };
    }, []);

    const categoriaLocalData = JSON.parse(categoriaLocal);
    //console.log("nuevo:", categoriaLocalData);
    const articulosLocalData = JSON.parse(articulosLocal);
    console.log("nuevo:", articulosLocalData);

    const CustomDataTable = ({ data2 }) => {
        if (!data2) {
            return <p>No hay datos disponibles.</p>;
        }

        return (
            <DataTable value={data2} paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25]}>
                <Column field="0" header="Código" />
                <Column field="1" header="Descripción" />
                <Column field="2" header="Nivel" />
                <Column field="icon" header="" body={ingresoexel} />
            </DataTable>
        );
    };

    const DataTablaar = ({ dataar }) => {
        return (
            <div>
                {dataar && dataar.length > 0 ? (
                    <DataTable value={dataar} paginator rows={10} rowsPerPageOptions={[5, 10, 25]}>
                        <Column field="codigo" header="Código" />
                        <Column field="descripcion" header="Descripción" />
                        <Column field="precio" header="Precio" />
                        <Column field="unidadPedido" header="Unidad de Pedido" />
                        <Column field="rowKey" header="Rowkey" />
                        <Column field="icon" header="" body={leftToolbarTemplate2} />
                    </DataTable>
                ) : (
                    'Cargando datos...'
                )}
            </div>
        );
    };


    const CustomDataTable3 = ({ data3 }) => {
        if (!data3) {
            return <p>No hay datos disponibles.</p>;
        }

        return (
            <DataTable value={data3} paginator
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

    /*  const userData = {
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
      */
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
        { label: 'Seleccionar', value: null },
        { label: 'Nivel 1', value: 1 },
        { label: 'Nivel 2', value: 2 },
        { label: 'Nivel 3', value: 3 },
        { label: 'Nivel 4', value: 4 },
        { label: 'Nivel 5', value: 5 },
        { label: 'Nivel 6', value: 6 },
    ];

    const [codigo, setCodigo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [selectedCity, setSelectedCity] = useState(null);




    const [selectedLevel, setSelectedLevel] = useState(null);

    const handleCityChange = (e) => {
        setSelectedCity(e.value);
        setSelectedLevel(e.value);
    };


    const handleFilterClick = () => {
        console.log("Código:", codigo);
        console.log("Descripción:", descripcion);
        console.log("Nivel:", selectedCity);
        localStorage.setItem('codigocap', codigo);
        localStorage.setItem('descripcioncap', descripcion);
        localStorage.setItem('nivelcap', selectedCity);
        console.log("hadlllleckil")
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
                    <Button label="Seleccionar" icon="pi pi-search" className="secondary" onClick={handleFilterClick} style={{ backgroundColor: '#e0e0e0' }}/>
                    </span>
                </div>
            </div>
        );
    };

    const nuevo= () => {

        console.log("holaa")

    }
    console.log("numero", selectedLevel);


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

    /*const filteredData = preparedData.filter(
        (row) =>
            row.name.toLowerCase().includes(searchText.toLowerCase()) ||
            (row.url && row.url.toLowerCase().includes(searchText.toLowerCase()))
    );*/

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



    return (
        <div>
            <div className="card" style={{ backgroundColor: '#e0e0e0' }}>
                <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
                <div>
                    <h1>Tabla de Artículos</h1>
                    {articulosLocalData && articulosLocalData.data.length > 0 ? (
                        <DataTablaar dataar={articulosLocalData.data} />
                    ) : (
                        'Cargando datos...'
                    )}
                </div>
            </div>

            <Dialog visible={isDialogVisible} style={{ width: '78rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Categoria Coral" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="card" style={{ backgroundColor: '#e0e0e0' }}>

                    <Toolbar className="mb-4" right={filtrotabla}></Toolbar>
                    <div>
                        <CustomDataTable3 data3={categoriaLocalData} />
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
                        <CustomDataTable data2={categoriaLocalData} />
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
    );


};

export default Dashboard;



