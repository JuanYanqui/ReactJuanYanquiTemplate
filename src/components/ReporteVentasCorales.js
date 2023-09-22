
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

const ReporteVentasCorales = () => {
    const [visibleEnviarCuenta, setvisibleEnviarCuenta] = useState(false);
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
    const [serverseleccionado, setServerseleccionado] = useState("");
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(10);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const [dialogVisibleError, setDialogVisibleError] = useState(false);
    const [centroSeleccionado, setCentroSeleccionado] = useState('');


    //Carga de Datos Automatica
    useEffect(() => {
        const fetchData = async () => {
            if (serverseleccionado == "") {

            } else {
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
        cargaDatos();
    };

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
                    <Column field="2" style={{ minWidth: '50px' }} header="Recap" />
                    <Column field="3" style={{ minWidth: '50px' }} header="Lote" />
                    <Column field="4" style={{ minWidth: '50px' }} header="Bin" />
                    <Column field="5" style={{ minWidth: '50px' }} header="Factura" />
                    <Column field="6" style={{ minWidth: '50px' }} header="Fecha" />
                    <Column field="13" style={{ minWidth: '50px' }} header="Codigo/tipo/nombre" />
                    <Column field="9" style={{ minWidth: '50px' }} header="Total" />
                    <Column field="10" style={{ minWidth: '50px' }} header="Otros" />
                    <Column field="11" style={{ minWidth: '50px' }} header="Iva" />
                    <Column field="12" style={{ minWidth: '50px' }} header="Val Recap" />
                    <Column field="14" style={{ minWidth: '50px' }} header="Descripción" />
                    <Column field="15" style={{ minWidth: '50px' }} header="#Tarjeta" />
                    <Column field="16" style={{ minWidth: '50px' }} header="Tipo pago" />
                    <Column field="17" style={{ minWidth: '50px' }} header="Autorización" />
                    <Column field="19" style={{ minWidth: '50px' }} header="Voucher" />
                    <Column field="20" style={{ minWidth: '50px' }} header="Forma pago" />
                    <Column field="21" style={{ minWidth: '50px' }} header="Tipo diferido" />
                    <Column field="22" style={{ minWidth: '50px' }} header="Plazo" />
                    <Column field="23" style={{ minWidth: '50px' }} header="Meses gracia" />
                    <Column field="24" style={{ minWidth: '50px' }} header="Descripción" />
                    <Column field="25" style={{ minWidth: '50px' }} header="Código Tcredito" />
                    <Column field="26" style={{ minWidth: '50px' }} header="Nombre marca" />
                    <Column field="27" style={{ minWidth: '50px' }} header="Tipo pago" />
                    <Column field="28" style={{ minWidth: '50px' }} header="Red" />
                    <Column field="29" style={{ minWidth: '50px' }} header="Respuesta" />
                    <Column field="30" style={{ minWidth: '50px' }} header="Grupo tarjeta" />
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

                XLSX.utils.book_append_sheet(wb, ws, 'VentasdeTarjetas');
                XLSX.writeFile(wb, 'VentasdeTarjetas.xlsx');
            }


        } catch (error) {
            setLoading(false);
            setError(error.message || 'Error desconocido');
            setPosition('top');
            setDialogVisibleError(true);
        }
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

    //Activador de Espera Dailog Recarga
    const [loading, setLoading] = useState(false);


    //Metodo Para boton Filtro Trar Datos Filtrados
    const cargaDatos = async () => {
        if (serverseleccionado == "") {
            showrangocentro();
        } else if (fechaini == null || fechafin == null) {
            showrangofechas();
        } else {
            const diasLimite = 21;

            const diferenciaDias = Math.abs((fechafin - fechaini) / (1000 * 60 * 60 * 24));

            if (diferenciaDias > diasLimite) {
                exccesofecha();
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

    //Para Traer los Centro logisticos ni vien cargue la pagina
    useEffect(() => {
        const sucursal = "";
        const sociedad = "1000";
        const centrol = "";
        const nombreCentro = "";
        const tipoCentro = "";
        const listaDescripcionYCodigo = [];
        repoteventascorales.centrologistico(sucursal, sociedad, centrol, nombreCentro, tipoCentro).then((data) => {
            for (const dato of data) {
                if (dato.serverHost && dato.serverHost.includes("http://app")) {
                    const descripcionCentro = dato.descripcionCentro;
                    const codigoCentro = dato.id.codigoCentro;
                    const hostcentro = dato.serverHost;
                    listaDescripcionYCodigo.push({ descripcionCentro, codigoCentro, hostcentro });
                }
            }
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
        const selectedCentroData = listalogistica.find(item => item.codigoCentro === selectedCentro.codigoCentro);
        if (selectedCentroData) {
            const serverHostSeleccionado = selectedCentroData.hostcentro;
            const serverHostSeleccionadoHttps = serverHostSeleccionado.replace("http:", "https:");

            setServerseleccionado(serverHostSeleccionadoHttps);
        }
    };

    
    //Lo que se va  mostrar
    return (
        <div className='layout-wrapper menu-layout-overlay'>
            <div style={{ height: '15px' }}></div>
            <div className='content-layout'>
                <form>
                    <div className="p-col-12">
                        <div >
                            <div >
                                <span className="Fs20 FontBold">Reporte Ventas Corales</span>
                                <button
                                    id="FiltrarReporteEstadoCuenta"
                                    className="ui-buttonleft ui-widget ui-state-default ui-corner-all ui-button-text-icon-right p-mr-2"
                                    disabled={loading}
                                    type="button"
                                    onClick={cargaDatos}
                                    role="button"
                                    aria-disabled="false"
                                >
                                    <span className="ui-button-textright ui-c"><i className="ui-button-icon-right ui-icon ui-c pi pi-refresh" /> &nbsp;Filtrar</span>
                                </button>
                            </div>
                            <div style={{ height: '1px' }}></div>
                            <hr className="ui-separator ui-state-default ui-corner-all" />

                            <span style={{
                                position: 'relative',
                                display: 'inline-block',
                                maxWidth: '250px',
                                border: isSelecionarCliked ? '2px solid black' : '1px solid #808080',
                                borderRadius: '3px',
                                top: '1px',

                            }}

                            >
                                <Dropdown
                                    autoComplete="off"
                                    aria-hidden="true"
                                    className="w-full md:w-60rem"
                                    placeholder="Seleccione"
                                    id="mySelect"
                                    style={{ backgroundColor: "#ffffff", height: "36px" }}
                                    optionLabel="descripcionCentro"
                                    value={centroSeleccionado}
                                    options={listalogistica}
                                    onChange={handleSelectChange}
                                    filter={true}

                                />
                            </span>

                            &nbsp;
                            &nbsp;

                            <span className="p-float-label" style={{ position: 'relative', display: 'inline-block', maxWidth: '120px' }}>
                                <input
                                    id="input1"
                                    className={`ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all MarRight10 ${numCaja ? 'ui-state-filled' : ''}`}
                                    value={numCaja}
                                    onChange={handleInputChangeCaja}
                                    style={{ width: '100%' }}

                                />
                                <label className={numCaja ? 'ui-label-floated' : ''} style={{ color: '#6c747c', fontSize: '16px', background: '#fff' }}>Caja</label>
                            </span>

                            &nbsp;
                            &nbsp;
                            <span
                                style={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    maxWidth: '180px',
                                    border: isCalendarClickedFechaini ? '2px solid black' : '1px solid #808080',
                                    borderRadius: '3px',
                                }}
                                ref={calendarRefFechaini}
                            >
                                <label
                                    style={{
                                        position: 'absolute',
                                        top: isCalendarClickedFechaini ? '10px' : '-10px', 
                                        left: '1px',
                                        backgroundColor: 'white',
                                        padding: '0 5px',
                                        display: 'block',
                                        opacity: 1,
                                        transition: 'top 0.5s ease', 
                                        fontSize: '12px',
                                        color: '#7f8990', 
                                        zIndex: 1,

                                    }}
                                >
                                    Fecha Inicial
                                </label>
                                <Calendar
                                    id="calfechaini"
                                    value={fechaini}
                                    onChange={handleDateChangeFechaini}
                                    dateFormat="yy-mm-dd"
                                    showIcon
                                    className={`custom-calendar-style ${isCalendarClickedFechaini ? 'clicked' : ''}`}
                                    onClick={handleCalendarClickFechaini}
                                />
                            </span>




                            &nbsp;
                            &nbsp;

                            <span
                                style={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    maxWidth: '180px',
                                    border: isCalendarClickedFechafin ? '2px solid black' : '1px solid #808080',
                                    borderRadius: '3px',
                                }}
                                ref={calendarRefFechafin}
                            >
                                <label
                                    style={{
                                        position: 'absolute',
                                        top: isCalendarClickedFechafin ? '10px' : '-10px',
                                        left: '1px',
                                        backgroundColor: 'white',
                                        padding: '0 5px',
                                        display: 'block',
                                        opacity: 1,
                                        transition: 'top 0.5s ease',
                                        fontSize: '12px',
                                        color: '#7f8990',
                                        zIndex: 1,

                                    }}
                                >
                                    Fecha Final
                                </label>
                                <Calendar
                                    id="calfechafin"
                                    value={fechafin}
                                    onChange={handleDateChangeFechafin}
                                    dateFormat="yy-mm-dd"
                                    showIcon
                                    className={`custom-calendar-style ${isCalendarClickedFechafin ? 'clicked' : ''}`}
                                    onClick={handleCalendarClickFechafin}
                                />
                            </span>
                            &nbsp;

                            &nbsp;

                        </div>

                    </div>
                    &nbsp;

                    &nbsp;
                    <div>
                        <DataTablaar dataar={DataReporteventas.data} loading={loading} onPageChange={onPageChange} />
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

export default ReporteVentasCorales;
