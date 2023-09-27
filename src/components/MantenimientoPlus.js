
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import "../assets/theme/indigo/theme-light.css";
import * as XLSX from 'xlsx';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { ReporteVentasCoralesIntermediaws } from '../serviceIntermedia/ReporteVentasCoralesIntermediaws';
import { ListBox } from 'primereact/listbox';
import { Card } from 'primereact/card';

const MantenimientoPlus = () => {
    const [position, setPosition] = useState('center');
    const toast = useRef(null);
    const [numCaja, setNumCaja] = useState("");
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    const [fechaini, setFechaini] = useState(fechaActual);
    const [fechafin, setFechafin] = useState(fechaActual);
    const [fechamodiini, setFechamodini] = useState(null);
    const [fechamodifin, setFechamodfin] = useState(null);
    const repoteventascorales = new ReporteVentasCoralesIntermediaws();
    const [listalogistica, setlistalogistica] = useState([]);
    const [DataReporteventas, setReporteventas] = useState("");
    const [DataReporteventasCentros, setReporteventasCentros] = useState("");
    const [Datamultiple, setDatamultiple] = useState("");
    const [Nombrecentro, setNombrecentro] = useState("");
    const [serverseleccionado, setServerseleccionado] = useState("");
    const [serverseleccionadolista, setServerseleccionadolista] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(10);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [currentPage2, setCurrentPage2] = useState(0);
    const [rowsPerPage2, setRowsPerPage2] = useState(100);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const [dialogVisibleError, setDialogVisibleError] = useState(false);
    const [centroSeleccionado, setCentroSeleccionado] = useState('');
    const [totalRecords2, setTotalRecords2] = useState(0);


    //Carga de Datos Automatica
    useEffect(() => {
        const fetchData = async () => {
            if (serverseleccionado == "") {

            } else if (DataReporteventas) {
                setLoading(true);
                const response1 = await repoteventascorales.loadVentas(numCaja, fechamodiini, fechamodifin, serverseleccionado, currentPage, rowsPerPage);
                const response = await repoteventascorales.loadVentasPaginacion(numCaja, fechamodiini, fechamodifin, serverseleccionado, currentPage, rowsPerPage);
                if (response) {
                    setReporteventas(response1);
                    const pageSize = rowsPerPage;
                    const totalCount = response.rowCount;
                    const totalPages = Math.ceil(totalCount / pageSize);
                    setTotalRecords(response.rowCount);
                    setTotalPages(totalPages);
                    setLoading(false);

                }
            } else if (DataReporteventasCentros) {
                setLoading(true);
                setNombrecentro("");
                const fechaFormateadaini = `${fechaini.getFullYear()}-${(fechaini.getMonth() + 1).toString().padStart(2, '0')}-${fechaini.getDate().toString().padStart(2, '0')} ${fechaini.getHours().toString().padStart(2, '0')}:${fechaini.getMinutes().toString().padStart(2, '0')}:${fechaini.getSeconds().toString().padStart(2, '0')}`;
                const fechaFormateadafin = `${fechafin.getFullYear()}-${(fechafin.getMonth() + 1).toString().padStart(2, '0')}-${fechafin.getDate().toString().padStart(2, '0')} ${fechafin.getHours().toString().padStart(2, '0')}:${fechafin.getMinutes().toString().padStart(2, '0')}:${fechafin.getSeconds().toString().padStart(2, '0')}`;
                setFechamodini(fechaFormateadaini);
                setFechamodfin(fechaFormateadafin);

                let allData = [];
                let totalRowCount = 0; // Variable para almacenar la sumatoria de rowCount

                // Utiliza Promise.all para esperar a que todas las solicitudes se completen
                await Promise.all(serverseleccionadolista.map(async (servidor) => {
                    try {
                        const data2 = await repoteventascorales.loadVentasPaginacion(numCaja, fechaFormateadaini, fechaFormateadafin, servidor, currentPage, rowsPerPage);
                        //console.log(data2);

                        const pageSize = rowsPerPage;
                        const rowCount = data2.rowCount; // Obtén el valor rowCount de data2
                        totalRowCount += rowCount; // Suma el valor rowCount a totalRowCount

                        const totalPages = Math.ceil(rowCount / pageSize);

                        for (let page = 0; page < totalPages; page++) {
                            const dataPage = await repoteventascorales.loadVentas(numCaja, fechaFormateadaini, fechaFormateadafin, servidor, page, rowsPerPage);
                            //console.log(dataPage);

                            if (dataPage && dataPage.data) {
                                allData = [...allData, ...dataPage.data];
                            } else {
                                throw new Error(dataPage?.data?.message || 'Error desconocido');
                            }
                        }
                    } catch (error) {
                        console.error('Error en la solicitud:', error);
                    }
                }));

                setLoading(false);
                //console.log(totalRowCount); // Aquí tendrás la sumatoria de todos los rowCount
                //console.log(allData);
                setReporteventasCentros(allData);
                setTotalRecords2(totalRowCount);
            }

        };
        fetchData();
    }, [currentPage, rowsPerPage]);


    //Control Paginación
    const onPageChange = (event) => {
        const newPage = Math.floor(event.first / event.rows);
        setLoading(true);
        setRowsPerPage(event.rows);
        setCurrentPage(newPage);
    };

    const onPageChange2 = (event) => {
        setLoading(true);
        const newPage2 = Math.floor(event.first / event.rows);
        setRowsPerPage2(event.rows);
        setCurrentPage2(newPage2);
        loadingmetod();
    };

    const loadingmetod = () => {
        setTimeout(() => {
            setLoading(false);
        }, 900);
    }

    //Incono Para Tabla 
    const paginatorLeft = <i />;
    const paginatorRight = (
        <div>
            <div className="flex flex-wrap gap-2" style={{ display: 'inline-block' }}>
                <img
                    src="../assets/layout/images/exelimg.png"
                    alt="Descripción de la imagen"
                    style={{ width: '40px', height: '35px' }} onClick={() => cargarDatosexel()}
                />
            </div>
        </div>
    );
    //Creación Tabla de Datos
    const DataTablaar = ({ dataar }) => {
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
                    rowsPerPageOptions={[10, 50, 100]}
                    paginatorPosition="both"
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                    paginatorTemplate={`CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown`}
                    currentPageReportTemplate={`Registros ${startRecord} - ${endRecord} de {totalRecords}`}
                >
                    <Column header="#" headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1}></Column>
                    <Column field="2" style={{ minWidth: '50px' }} header="Alm." />
                    <Column field="3" style={{ minWidth: '50px' }} header="N_Plu" />
                    <Column field="4" style={{ minWidth: '50px' }} header="Descripción" />
                    <Column field="5" style={{ minWidth: '50px' }} header="Precio Etiqueta" />
                    <Column field="6" style={{ minWidth: '50px' }} header="Precio Ant." />
                    <Column field="13" style={{ minWidth: '50px' }} header="Barra" />
                    <Column field="9" style={{ minWidth: '50px' }} header="Código" />
                    <Column field="10" style={{ minWidth: '50px' }} header="Estado" />
                    <Column field="11" style={{ minWidth: '50px' }} header="Update" />

                </DataTable>
            </div>
        );
    }



    const paginatorLeft2 = <i />;
    const paginatorRight2 = (
        <div>
            <div className="flex flex-wrap gap-2" style={{ display: 'inline-block' }}>
                <img
                    src="../assets/layout/images/exelimg.png"
                    alt="Descripción de la imagen"
                    style={{ width: '40px', height: '35px' }} onClick={() => generarExcelpropio()}
                />
            </div>
        </div>
    );
    const DataTablaar2 = ({ dataar2 }) => {
        const startRecord = currentPage2 * rowsPerPage2 + 1;
        const endRecord = Math.min((currentPage2 + 1) * rowsPerPage2, totalRecords2);
        return (
            <div>
                <DataTable value={dataar2}
                    paginator

                    onPage={onPageChange2}
                    rows={rowsPerPage2}
                    first={currentPage2 * rowsPerPage2}
                    rowsPerPageOptions={[10, 50, 100]}
                    paginatorPosition="both"
                    paginatorLeft={paginatorLeft2} paginatorRight={paginatorRight2}
                    paginatorTemplate={`CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown`}
                    currentPageReportTemplate={`Registros ${startRecord} de {totalRecords}`}
                >
                      <Column header="#" headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1}></Column>
                    <Column field="2" style={{ minWidth: '50px' }} header="Alm." />
                    <Column field="3" style={{ minWidth: '50px' }} header="N_Plu" />
                    <Column field="4" style={{ minWidth: '50px' }} header="Descripción" />
                    <Column field="5" style={{ minWidth: '50px' }} header="Precio Etiqueta" />
                    <Column field="6" style={{ minWidth: '50px' }} header="Precio Ant." />
                    <Column field="13" style={{ minWidth: '50px' }} header="Barra" />
                    <Column field="9" style={{ minWidth: '50px' }} header="Código" />
                    <Column field="10" style={{ minWidth: '50px' }} header="Estado" />
                    <Column field="11" style={{ minWidth: '50px' }} header="Update" />
                </DataTable>
            </div>
        );
    }

    const DataTablaar3 = () => {
        const startRecord = currentPage2 * rowsPerPage2 + 1;
        const endRecord = Math.min((currentPage2 + 1) * rowsPerPage2, totalRecords2);
        return (
            <div>
                <DataTable
                    paginator
                    onPage={onPageChange2}
                    rows={rowsPerPage2}
                    first={currentPage2 * rowsPerPage2}
                    rowsPerPageOptions={[10, 50, 100]}
                    paginatorPosition="both"
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                    paginatorTemplate={`CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown`}
                    currentPageReportTemplate={`Registros ${0} - ${0}`}
                >
                    <Column header="#" headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1}></Column>
                    <Column field="2" style={{ minWidth: '50px' }} header="Alm." />
                    <Column field="3" style={{ minWidth: '50px' }} header="N_Plu" />
                    <Column field="4" style={{ minWidth: '50px' }} header="Descripción" />
                    <Column field="5" style={{ minWidth: '50px' }} header="Precio Etiqueta" />
                    <Column field="6" style={{ minWidth: '50px' }} header="Precio Ant." />
                    <Column field="13" style={{ minWidth: '50px' }} header="Barra" />
                    <Column field="9" style={{ minWidth: '50px' }} header="Código" />
                    <Column field="10" style={{ minWidth: '50px' }} header="Estado" />
                    <Column field="11" style={{ minWidth: '50px' }} header="Update" />
                </DataTable>
            </div>
        );
    }
    //Carga de Datos Paginados en Exel
    const cargarDatosexel = async () => {
        try {
            let allData = [];
            for (let page = 0; page < totalPages; page++) {
                let response;
                response = await repoteventascorales.loadVentas(
                    numCaja,
                    fechamodiini,
                    fechamodifin,
                    serverseleccionado,
                    page,
                    rowsPerPage
                );
                if (response && response.data) {
                    allData = [...allData, ...response.data];
                } else {
                    throw new Error(response?.data?.message || 'Error desconocido');
                }
                setLoading(true);
            }

            if (allData == null || allData.length == 0) {
                showWarnexe();
            } else {
                setLoading(false);
                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.aoa_to_sheet([
                    [
                        "Recap",
                        "Lote",
                        "Bin",
                        "Factura",
                        "Fecha",
                        "Codigo/tipo/nombre",
                        "Total",
                        "Otros",
                        "Iva",
                        "Val Recap",
                        "Descripción",
                        "#Tarjeta",
                        "Tipo pago",
                        "Autorización",
                        "Voucher",
                        "Forma pago",
                        "Tipo diferido",
                        "Plazo",
                        "Meses gracia",
                        "Descripción",
                        "Código Tcredito",
                        "Nombre marca",
                        "Tipo pago",
                        "Red",
                        "Respuesta",
                        "Grupo tarjeta"
                    ],
                    ...allData.map(item => [
                        item[2],
                        item[3],
                        item[4],
                        item[5],
                        item[6],
                        item[13],
                        item[9],
                        item[10],
                        item[11],
                        item[12],
                        item[14],
                        item[15],
                        item[16],
                        item[17],
                        item[19],
                        item[20],
                        item[21],
                        item[22],
                        item[23],
                        item[24],
                        item[25],
                        item[26],
                        item[27],
                        item[28],
                        item[29],
                        item[30],
                    ]),
                ]);
                ws['A1'].s = { halign: 'center', valign: 'center' };

                XLSX.utils.book_append_sheet(wb, ws, 'ReporteVentas');
                XLSX.writeFile(wb, 'ReporteVentas.xlsx');
                exelcreado();
            }


        } catch (error) {
            setLoading(false);
            setError(error.message || 'Error desconocido');
            setPosition('top');
            setDialogVisibleError(true);
        }
    };


    const generarExcelpropio = () => {
        setLoading(true);

        setTimeout(() => {
            if (DataReporteventasCentros == null || DataReporteventasCentros.length == 0) {
                showWarnexe();
            } else {
                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.aoa_to_sheet([
                    [
                        "Recap",
                        "Lote",
                        "Bin",
                        "Factura",
                        "Fecha",
                        "Codigo/tipo/nombre",
                        "Total",
                        "Otros",
                        "Iva",
                        "Val Recap",
                        "Descripción",
                        "#Tarjeta",
                        "Tipo pago",
                        "Autorización",
                        "Voucher",
                        "Forma pago",
                        "Tipo diferido",
                        "Plazo",
                        "Meses gracia",
                        "Descripción",
                        "Código Tcredito",
                        "Nombre marca",
                        "Tipo pago",
                        "Red",
                        "Respuesta",
                        "Grupo tarjeta"
                    ],
                    ...DataReporteventasCentros.map(item => [
                        item[2],
                        item[3],
                        item[4],
                        item[5],
                        item[6],
                        item[13],
                        item[9],
                        item[10],
                        item[11],
                        item[12],
                        item[14],
                        item[15],
                        item[16],
                        item[17],
                        item[19],
                        item[20],
                        item[21],
                        item[22],
                        item[23],
                        item[24],
                        item[25],
                        item[26],
                        item[27],
                        item[28],
                        item[29],
                        item[30],
                    ]),
                ]);

                ws['A1'].s = { halign: 'center', valign: 'center' };

                XLSX.utils.book_append_sheet(wb, ws, 'ReporteVentas');
                XLSX.writeFile(wb, 'ReporteVentas.xlsx');
                setLoading(false);
                exelcreado();
            }
        }, 2000);
    };

    //Mensajes Mostrar
    const showWarnexe = () => {
        toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'No hay datos existentes' })
    }

    const showrangofechas = () => {
        toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'Debe Ingresar un rago de fechas' })
    }

    const showrangocentro = () => {
        toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'Debe seleccionar un centro' })
    }

    const exccesofecha = () => {
        toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'A excedido el numero maximo de diferencia de 21 días.' })
    }

    const exelcreado = () => {
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Excel generado' })
    }

    //Activador de Espera Dailog Recarga
    const [loading, setLoading] = useState(false);


    //Metodo Para boton Filtro Trar Datos Filtrados
    const cargaDatos = async () => {
        setReporteventasCentros("");
        setReporteventas("");
        if (serverseleccionado === "" && serverseleccionadolista.length === 0) {
            showrangocentro();
        } else if (fechaini == null || fechafin == null) {
            showrangofechas();
        } else {
            const diasLimite = 21;

            const diferenciaDias = Math.abs((fechafin - fechaini) / (1000 * 60 * 60 * 24));

            if (diferenciaDias > diasLimite) {
                exccesofecha();
            } else {
                if (Nombrecentro === "<<TODOS LOS CENTROS>>") {
                    setLoading(true);
                    const fechaFormateadaini = `${fechaini.getFullYear()}-${(fechaini.getMonth() + 1).toString().padStart(2, '0')}-${fechaini.getDate().toString().padStart(2, '0')} ${fechaini.getHours().toString().padStart(2, '0')}:${fechaini.getMinutes().toString().padStart(2, '0')}:${fechaini.getSeconds().toString().padStart(2, '0')}`;
                    const fechaFormateadafin = `${fechafin.getFullYear()}-${(fechafin.getMonth() + 1).toString().padStart(2, '0')}-${fechafin.getDate().toString().padStart(2, '0')} ${fechafin.getHours().toString().padStart(2, '0')}:${fechafin.getMinutes().toString().padStart(2, '0')}:${fechafin.getSeconds().toString().padStart(2, '0')}`;
                    setFechamodini(fechaFormateadaini);
                    setFechamodfin(fechaFormateadafin);

                    let allData = [];
                    let totalRowCount = 0;

                    await Promise.all(serverseleccionadolista.map(async (servidor) => {
                        try {
                            const data2 = await repoteventascorales.loadVentasPaginacion(numCaja, fechaFormateadaini, fechaFormateadafin, servidor, currentPage, rowsPerPage);
                            //console.log(data2);

                            const pageSize = rowsPerPage;
                            const rowCount = data2.rowCount;
                            totalRowCount += rowCount;

                            const totalPages = Math.ceil(rowCount / pageSize);

                            for (let page = 0; page < totalPages; page++) {
                                const dataPage = await repoteventascorales.loadVentas(numCaja, fechaFormateadaini, fechaFormateadafin, servidor, page, rowsPerPage);
                                //console.log(dataPage);

                                if (dataPage && dataPage.data) {
                                    allData = [...allData, ...dataPage.data];
                                } else {
                                    throw new Error(dataPage?.data?.message || 'Error desconocido');
                                }
                            }
                        } catch (error) {
                            console.error('Error en la solicitud:', error);
                        }
                    }));

                    setLoading(false);
                    setReporteventasCentros(allData);
                } else {
                    setLoading(true);
                    const fechaFormateadaini = `${fechaini.getFullYear()}-${(fechaini.getMonth() + 1).toString().padStart(2, '0')}-${fechaini.getDate().toString().padStart(2, '0')} ${fechaini.getHours().toString().padStart(2, '0')}:${fechaini.getMinutes().toString().padStart(2, '0')}:${fechaini.getSeconds().toString().padStart(2, '0')}`;
                    const fechaFormateadafin = `${fechafin.getFullYear()}-${(fechafin.getMonth() + 1).toString().padStart(2, '0')}-${fechafin.getDate().toString().padStart(2, '0')} ${fechafin.getHours().toString().padStart(2, '0')}:${fechafin.getMinutes().toString().padStart(2, '0')}:${fechafin.getSeconds().toString().padStart(2, '0')}`;
                    setFechamodini(fechaFormateadaini);
                    setFechamodfin(fechaFormateadafin);
                    const response1 = await repoteventascorales.loadVentas(numCaja, fechaFormateadaini, fechaFormateadafin, serverseleccionado, currentPage, rowsPerPage);

                    const response = await repoteventascorales.loadVentasPaginacion(numCaja, fechaFormateadaini, fechaFormateadafin, serverseleccionado, currentPage, rowsPerPage
                    );

                    if (response1) {

                        if (response1) {
                            setReporteventas(response1);
                            const pageSize = rowsPerPage;
                            const totalCount = response.rowCount;
                            const totalPages = Math.ceil(totalCount / pageSize);
                            setTotalRecords(response.rowCount);
                            setTotalPages(totalPages);
                            setLoading(false);
                        } else {
                            setLoading(false);
                            setError(response1.data.message);
                            setPosition('top');
                            setDialogVisibleError(true);
                            return response1.data.message;
                        }

                    }
                }

            }

        }

    }

    //Inputs y Varibles de entrada Para Busquea
    const handleInputChangeCaja = (event) => {
        setNumCaja(event.target.value);

    };
    const handleDateChangeFechaini = (event) => {
        setFechaini(event.value);
    };
    const handleDateChangeFechafin = (event) => {
        setFechafin(event.value);
    };
    const [isCalendarClickedFechaini, setIsCalendarClickedFechaini] = useState(false);
    const calendarRefFechaini = useRef(null);

    const [isSelecionarCliked, setIsSelecionarCliked] = useState(false);
    const seleccionarRef = useRef(null);

    const [isCalendarClickedFechafin, setIsCalendarClickedFechafin] = useState(false);
    const calendarRefFechafin = useRef(null);

    const handleCalendarClickFechaini = () => {
        setIsCalendarClickedFechaini(true);
    };

    const handleCalendarClickFechafin = () => {
        setIsCalendarClickedFechafin(true);
    };

    const handleOutsideClickFechaini = (event) => {
        if (calendarRefFechaini.current && !calendarRefFechaini.current.contains(event.target)) {
            setIsCalendarClickedFechaini(false);
        }
    };

    const handleOutsideClickFechafin = (event) => {
        if (calendarRefFechafin.current && !calendarRefFechafin.current.contains(event.target)) {
            setIsCalendarClickedFechafin(false);
        }
    };

    const handleOutsideClickSeleccionar = (event) => {
        if (seleccionarRef.current && !seleccionarRef.current.contains(event.target)) {
            setIsSelecionarCliked(false);
        }
    };

    //Para Traer los Centro logisticos ni bien cargue la pagina
    useEffect(() => {
        const sucursal = "";
        const sociedad = "1000";
        const centrol = "";
        const nombreCentro = "";
        const tipoCentro = "";
        const listaDescripcionYCodigo = [];
        const listaDescripcionYCodigoCompleta = [];
        const todoscentros = [];
        repoteventascorales.centrologistico(sucursal, sociedad, centrol, nombreCentro, tipoCentro).then((data) => {
            listaDescripcionYCodigo.push({ descripcionCentro: "<<TODOS LOS CENTROS>>", codigoCentro: "99999999999", hostcentro: todoscentros });
            for (const dato of data) {
                if (dato.serverHost && dato.serverHost.includes("http://app") && !dato.serverHost.includes("shop")) {
                    const descripcionCentro = dato.descripcionCentro;
                    const codigoCentro = dato.id.codigoCentro;
                    const hostcentro = dato.serverHost;
                    const existingItem = listaDescripcionYCodigo.find(item => item.hostcentro === hostcentro);

                    if (!existingItem) {
                        listaDescripcionYCodigo.push({ descripcionCentro, codigoCentro, hostcentro });
                        todoscentros.push(hostcentro);
                        //(todoscentros);
                    }
                }
            }

            listaDescripcionYCodigoCompleta.push(listaDescripcionYCodigo);
            setlistalogistica(listaDescripcionYCodigo);
        })
        window.addEventListener('click', handleOutsideClickFechaini);
        window.addEventListener('click', handleOutsideClickFechafin);
        window.addEventListener('click', handleOutsideClickSeleccionar);
        return () => {
            window.removeEventListener('click', handleOutsideClickFechaini);
            window.removeEventListener('click', handleOutsideClickFechafin);
            window.removeEventListener('click', handleOutsideClickSeleccionar);
        };
    }, []);



    //Manejador para el cambio en el select
    const handleSelectChange = (event) => {
        const selectedCentro = event.target.value;
        setCentroSeleccionado(selectedCentro);
        if (selectedCentro.descripcionCentro === "<<TODOS LOS CENTROS>>") {

            const selectedCentroDataArray = listalogistica.filter(item => item.codigoCentro === selectedCentro.codigoCentro);

            if (selectedCentroDataArray.length > 0) {

                const serverHostSeleccionado = selectedCentroDataArray[0].hostcentro;


                const newArray = serverHostSeleccionado.map(url => url.replace("http:", "https:"));

                setServerseleccionadolista(newArray);

            }
            setNombrecentro(selectedCentro.descripcionCentro);
        } else {
            const selectedCentroData = listalogistica.find(item => item.codigoCentro === selectedCentro.codigoCentro);
            if (selectedCentroData) {
                const serverHostSeleccionado = selectedCentroData.hostcentro;

                const serverHostSeleccionadoHttps = serverHostSeleccionado.replace("http:", "https:");

                setServerseleccionado(serverHostSeleccionadoHttps);
                //(serverHostSeleccionadoHttps);

            }
            setNombrecentro("");
        }

    };

    const cities = [
        { name: 'Precios x Act.:', code: 'RM' },
        { name: 'Cod. Bar.x Act.:', code: 'NY' },
    ];


    //Lo que se va  mostrar
    return (
        <div className='layout-wrapper menu-layout-overlay'>
            <div style={{ height: '15px' }}></div>
            <div className='content-layout'>
                <form>
                    <div className="p-col-12">
                        <div >
                            <div >
                                <span className="Fs20 FontBold">Mantenimiento de Plus</span>
            
                            </div>
                            <div style={{ height: '1px' }}></div>
                            <hr className="ui-separator ui-state-default ui-corner-all" />

                            <span style={{
                                position: 'relative',
                                display: 'inline-block',
                                maxWidth: '202px',
                                border: isSelecionarCliked ? '2px solid black' : '1px solid #808080',
                                borderRadius: '3px',
                                top: '-3px',

                            }}

                            >
                                <Dropdown
                                    autoComplete="off"
                                    aria-hidden="true"
                                    placeholder="Seleccione"
                                    id="mySelect"
                                    style={{ backgroundColor: "#ffffff", height: "36px", width: "200px" }}
                                    optionLabel="descripcionCentro"
                                    value={centroSeleccionado}
                                    options={listalogistica}
                                    onChange={handleSelectChange}
                                    filter={true}

                                />
                            </span>

                            &nbsp;
                            <button style={{ position: 'relative',top: '-5px'}}
                                    id="FiltrarControl"
                                    className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left MarRight10 ui-button-warn"
                                    onClick={cargaDatos}
                                    disabled={loading}
                                    type="button"
                                    role="button"
                                    aria-disabled="false"
                                >
                                    <span className="ui-button-text ui-c"><i className="ui-button-icon-left ui-icon ui-c pi pi-search" /> &nbsp;Buscar</span>
                                </button>

                            <span style={{ float: "right", position: 'relative',top: '-11px'}}>
                                <button
                                    id="FiltrarControl"
                                    className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left MarRight10 ui-button-success"

                                    disabled={loading}
                                    type="button"
                                    role="button"
                                    aria-disabled="false"
                                >
                                    <span className="ui-button-text ui-c"><i className="fa-regular fa-pen-to-square" /> &nbsp;Actualizar Plus</span>
                                </button>
                                <span style={{display: 'inline-block', position: 'relative',top: '8px'}}>
                                <p className="m-0" style={{ backgroundColor: '#4397ec'}}>
                                    Precios x Act.: 0
                                </p>
                                <div style={{ height: '2px' }}></div>
                                <p className="m-0" style={{   backgroundColor: '#8dc6f6'}}>
                                    Cod. Bar.x Act.: 0
                                </p>
                                </span>
                            </span>

                            <div style={{ height: '4px' }}></div>



                        </div>

                    </div>


                    &nbsp;
                    <div>
                        {DataReporteventas != "" ? (
                            // Si la base de datos 1 no está vacía, muestra la base de datos 1
                            <DataTablaar dataar={DataReporteventas.data} loading={loading} onPageChange={onPageChange} />
                        ) : (
                            DataReporteventasCentros != "" ? (
                                // Si la base de datos 2 no está vacía, muestra la base de datos 2
                                <DataTablaar2 dataar2={DataReporteventasCentros} loading={loading} onPageChange={onPageChange2} />
                            ) : (
                                // Si ambas bases de datos están vacías, puedes mostrar un mensaje o tomar otra acción
                                <DataTablaar3 />
                            )
                        )}
                    </div>
                </form>


                <Toast ref={toast} />



                <Dialog visible={loading} modal closable={false} showHeader={false} style={{ width: '50px', height: '53px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div className="d-flex justify-content-center align-items-center h-100" style={{ borderRadius: '4px' }}>
                        <i className="pi pi-spin pi-spinner loading-icon" aria-hidden="true" style={{ transform: 'scale(0.5)', marginTop: '18px' }}></i>
                    </div>
                </Dialog>


            </div>
        </div>

    );


};

export default MantenimientoPlus;
