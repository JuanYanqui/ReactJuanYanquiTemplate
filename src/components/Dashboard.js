
import React, { useState, useEffect } from 'react';
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

export default function LazyLoadDemo() {
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [isDialogVisible2, setDialogVisible2] = useState(false);
    const [expandedRows, setExpandedRows] = useState([]);
    const [dropdownItem, setDropdownItem] = useState(null);
    const [searchText, setSearchText] = useState("");
    const dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];
    // Inside your component
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
                <Button label="Agregar Categoria" icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
        );
    };
    const rightToolbarTemplate = () => {
        return <Button label="Carga Masiva" icon="pi pi-upload" className="secondary" onClick={openNew2} />;
    };
    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Prueba</h4>
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


    return (
        <div>
            <div className="card">
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
                    <Column
                        expander
                        style={{ width: '3em' }}
                        body={(rowData) =>
                            rowData.children && rowData.children.length > 0 ? (
                                <Button
                                    icon="pi pi-angle-down"
                                    className={`p-row-toggler p-link`}
                                    onClick={() => toggleRow(rowData)}
                                    aria-expanded={expandedRows.includes(rowData.id)}
                                />
                            ) : null
                        }
                    />
                    <Column field="name" header="Name" sortable filter filterPlaceholder="Search" />
                    <Column field="url" header="URL" sortable filter filterPlaceholder="Search" body={(rowData) => <a href={rowData.url}>{rowData.url}</a>} />
                    <Column field="icon" header="" body={(rowData) => <i className={rowData.icon}></i>} style={{ textAlign: 'center' }} />
                    <Column field="icon" header="" body={leftToolbarTemplate2} />
                </DataTable>
            </div>
            <Dialog visible={isDialogVisible} style={{ width: '50rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Categoria Coral" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="grid">

                    <Panel style={{ width: '50rem' }} >
                        <div className="col-12">
                          

                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <InputText placeholder="Username" />
                                </div>
                         
                        </div>
                        <div className="col-12">
                          

                          <div className="p-inputgroup">
                              <span className="p-inputgroup-addon">
                                  <i className="pi pi-user"></i>
                              </span>
                              <InputText placeholder="Username" />
                          </div>
                   
                  </div>

                    </Panel>

                </div>
            </Dialog>

            <Dialog visible={isDialogVisible2} style={{ width: '50rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Categoria Coral" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog2}>
                <div className="grid">

                    <Panel style={{ width: '50rem' }} >
                        <div className="col-12">
                          

                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <InputText placeholder="Username" />
                                </div>
                         
                        </div>

                    </Panel>

                </div>
            </Dialog>

        </div>
    );


}













