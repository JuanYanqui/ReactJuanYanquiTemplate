
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import "../assets/theme/indigo/theme-light.css";
import * as XLSX from 'xlsx';
import { PDFDocument } from 'pdf-lib';
import { VentasTargetasPosws } from '../servicePosws/VentasTargetasPosws';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { ReporteVentasCoralesIntermediaws } from '../serviceIntermedia/ReporteVentasCoralesIntermediaws';

const ReporteVentasCorales = () => {
    const [visible, setVisible] = useState(false);
    const [visibleEnviarCuenta, setvisibleEnviarCuenta] = useState(false);
    const [position, setPosition] = useState('center');
    const toast = useRef(null);
    const [centro, setCentro] = useState("");
    const [numCaja, setNumCaja] = useState("");
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    const [fechaini, setFechaini] = useState(fechaActual);
    const [fechafin, setFechafin] = useState(fechaActual);
    const [fechamodiini, setFechamodini] = useState(null);
    const [fechamodifin, setFechamodfin] = useState(null);
    const ventastarjetadata = new VentasTargetasPosws();
    const repoteventascorales = new ReporteVentasCoralesIntermediaws();
    const [listalogistica, setlistalogistica] = useState([]);
    const [datoscompletos, setdatoscompletos] = useState([]);
    const [DataReporteventas, setReporteventas] = useState("");
    const [serverseleccionado, setServerseleccionado] = useState("");
    const [totalRecords, setTotalRecords] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(null);
    const [selectedbp, setSelectedbp] = useState(null);
    const [selectedsociedad, setSelectedsociedad] = useState(null);
    const [estadoSelecionado, setestadoSelecionado] = useState(null);
    const [error, setError] = useState(null);
    const [dialogVisibleError, setDialogVisibleError] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const onPageChange = (event) => {
        const newPage = Math.floor(event.first / event.rows);
        setLoading(true);
        //console.log(event.rows);
        setRowsPerPage(event.rows);
        setCurrentPage(newPage);
        cargaDatos();
    };

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

    const DataTablaar = ({ dataar }) => {
        const generarpdf = (rowData) => {
            return (
                <div className="flex flex-wrap gap-2">
                    <i className="pi pi-file-pdf" style={{ fontSize: '1.5rem' }} onClick={() => generarpfdpeti(rowData[1])} ></i>
                </div>
            );
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
                    rowsPerPageOptions={[5, 10, 50]}
                    paginatorPosition="both"
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                    paginatorTemplate={`CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown`}
                    currentPageReportTemplate={`Registros ${startRecord} - ${endRecord} de {totalRecords}`}
                >
                    <Column field="2" style={{ minWidth: '50px' }} header="Recap" />
                    <Column field="3" style={{ minWidth: '50px' }} header="Lote" />
                    <Column field="4" style={{ minWidth: '50px' }} header="Bin" />
                    <Column field="5" style={{ minWidth: '50px' }} header="Factura" />
                    <Column field="6" style={{ minWidth: '50px' }} header="Fecha" />
                    <Column field="7" style={{ minWidth: '50px' }} header="Codigo/tipo/nombre" />
                    <Column field="8" style={{ minWidth: '50px' }} header="Total" />
                    <Column field="9" style={{ minWidth: '50px' }} header="Otros" />
                    <Column field="10" style={{ minWidth: '50px' }} header="Iva" />
                    <Column field="11" style={{ minWidth: '50px' }} header="Val Recap" />
                    <Column field="12" style={{ minWidth: '50px' }} header="Descripción" />
                    <Column field="13" style={{ minWidth: '50px' }} header="#Tarjeta" />
                    <Column field="14" style={{ minWidth: '50px' }} header="Tipo pago" />
                    <Column field="15" style={{ minWidth: '50px' }} header="Autorización" />
                    <Column field="16" style={{ minWidth: '50px' }} header="Voucher" />
                    <Column field="17" style={{ minWidth: '50px' }} header="Forma pago" />
                    <Column field="18" style={{ minWidth: '50px' }} header="Tipo diferido" />
                    <Column field="19" style={{ minWidth: '50px' }} header="Plazo" />
                    <Column field="20" style={{ minWidth: '50px' }} header="Meses gracia" />
                    <Column field="21" style={{ minWidth: '50px' }} header="Descripción" />
                    <Column field="22" style={{ minWidth: '50px' }} header="Código Tcredito" />
                    <Column field="23" style={{ minWidth: '50px' }} header="Nombre marca" />
                    <Column field="24" style={{ minWidth: '50px' }} header="Tipo pago" />
                    <Column field="25" style={{ minWidth: '50px' }} header="Red" />
                    <Column field="26" style={{ minWidth: '50px' }} header="Respuesta" />
                    <Column field="27" style={{ minWidth: '50px' }} header="Grupo tarjeta" />
                </DataTable>
            </div>
        );
    }

    const generarpfdpeti = (centroingre) => {
        //console.log(centroingre);
        ventastarjetadata.generateVouchersReport(centroingre).then((data) => {
            //console.log(data);

            // Convierte la cadena Base64 en una URL de archivo PDF
            const pdfURL = convertirBase64APDF(data);

            // Crea un enlace de descarga
            const a = document.createElement('a');
            a.href = pdfURL;
            a.download = 'documento.pdf';
            a.textContent = 'Descargar PDF';

            // Agrega el enlace de descarga al cuerpo del documento
            document.body.appendChild(a);

            // Simula un clic en el enlace para iniciar la descarga
            a.click();

            // Limpia el enlace después de la descarga
            document.body.removeChild(a);
        });
    }


    /*
                        <Column field="13" style={{ minWidth: '100px' }} header="Otros" />
                    <Column field="14" style={{ minWidth: '100px' }} header="Iva" />
                    <Column field="15" style={{ minWidth: '100px' }} header="Val Recap" />*/



    function convertirBase64APDF(base64Data) {
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        return URL.createObjectURL(blob);
    }




    const cargarDatosexel = async () => {
        try {
            let allData = [];

            for (let page = 1; page <= totalPages; page++) {
                const response = await repoteventascorales.loadVentas(
                    numCaja, fechamodiini, fechamodifin, serverseleccionado, page, rowsPerPage
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
                    ['Ventas de Tarjeta'],
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
                        item[7],
                        item[8],
                        item[9],
                        item[10],
                        item[11],
                        item[12],
                        item[13],
                        item[14],
                        item[15],
                        item[16],
                        item[17],
                        item[18],
                        item[19],
                        item[20],
                        item[21],
                        item[22],
                        item[23],
                        item[24],
                        item[25],
                        item[26],
                        item[27],
                    ]),
                ]);

                const mergeTitle = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: 0, c: 9 } });
                ws['!merges'] = [XLSX.utils.decode_range(mergeTitle)];
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

    /*const generarExcelpropio = async () => {
        try {
        
           
        } catch (error) {
            setLoading(false);
            setError(error.message || 'Error desconocido');
            setPosition('top');
            setDialogVisibleError(true);
        }
    };*/



    /*const generarExcelpropio  = async () => {
        let allData = [];
        for (let page = 1; page <= totalPages; page++) {
            const response2 = await repoteventascorales.loadVentas(
                numCaja, fechamodiini, fechamodifin, serverseleccionado, page, rowsPerPage
            );

            if (response2 && response2.data) {
                // Agrega los datos de la página actual a la variable allData
                allData = [...allData, ...response2.data];
            } else {
                // Maneja el error si ocurriera durante la obtención de datos de la página actual
                setLoading(false);
                setError(response2?.data?.message || 'Error desconocido');
                setPosition('top');
                setDialogVisibleError(true);
                return;
            }
        }
        if (datoscompletos == null || datoscompletos.length == 0) {
            showWarnexe();
        } else {
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet([
                ['Ventas de Tarjeta'],
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
                ...datoscompletos.map(item => [
                    item[2],
                    item[3],
                    item[4],
                    item[5],
                    item[6],
                    item[7],
                    item[8],
                    item[9],
                    item[10],
                    item[11],
                    item[12],
                    item[13],
                    item[14],
                    item[15],
                    item[16],
                    item[17],
                    item[18],
                    item[19],
                    item[20],
                    item[21],
                    item[22],
                    item[23],
                    item[24],
                    item[25],
                    item[26],
                    item[27],
                ]),
            ]);

            const mergeTitle = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: 0, c: 9 } });
            ws['!merges'] = [XLSX.utils.decode_range(mergeTitle)];
            ws['A1'].s = { halign: 'center', valign: 'center' };

            XLSX.utils.book_append_sheet(wb, ws, 'VentasdeTarjetas');
            XLSX.writeFile(wb, 'VentasdeTarjetas.xlsx');
        }

    };*/





    const handleNoClick = () => {
        showErrorcancel();
        setvisibleEnviarCuenta(false)
    };


    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={handleNoClick} className="p-button-text" />
        </div>
    );


    const showErrorcancel = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Proceso Cancelado.', life: 3000 });
    }

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


    const [loading, setLoading] = useState(false);


    const cargaDatos = async () => {
        //console.log(fecha)

        //console.log(fechaini);
        console.log(fechafin);

        if (serverseleccionado == "") {
            showrangocentro();
        } else if (fechaini == null || fechafin == null) {
            showrangofechas();
        } else {

            const diasLimite = 21; // Cambia este valor según tus necesidades

            const diferenciaDias = Math.abs((fechafin - fechaini) / (1000 * 60 * 60 * 24));

            if (diferenciaDias > diasLimite) {
                // La diferencia es mayor a 21 días, realiza alguna acción de manejo de error
                exccesofecha();
            } else {
                setLoading(true);
                //console.log(`Server Host del centro seleccionado: ${serverseleccionado}`);
                const fechaFormateadaini = `${fechaini.getFullYear()}-${(fechaini.getMonth() + 1).toString().padStart(2, '0')}-${fechaini.getDate().toString().padStart(2, '0')} ${fechaini.getHours().toString().padStart(2, '0')}:${fechaini.getMinutes().toString().padStart(2, '0')}:${fechaini.getSeconds().toString().padStart(2, '0')}`;
                const fechaFormateadafin = `${fechafin.getFullYear()}-${(fechafin.getMonth() + 1).toString().padStart(2, '0')}-${fechafin.getDate().toString().padStart(2, '0')} ${fechafin.getHours().toString().padStart(2, '0')}:${fechafin.getMinutes().toString().padStart(2, '0')}:${fechafin.getSeconds().toString().padStart(2, '0')}`;
                //console.log(fechaFormateadaini);
                //console.log(fechaFormateadafin);
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
                        //console.log(response1.data.message);
                        setPosition('top');
                        setDialogVisibleError(true);
                        return response1.data.message;
                    }

                }
            }

        }

    }

    const handleInputChange = (event) => {
        setCentro(event.target.value);

    };

    const handleInputChange2 = (event) => {
        setNumCaja(event.target.value);

    };


    const handleDateChange = (event) => {
        setFechaini(event.value);
    };
    const handleDateChange2 = (event) => {
        setFechafin(event.value);
    };
    const [isCalendarClicked, setIsCalendarClicked] = useState(false);
    const calendarRef = useRef(null);

    const [isCalendarClicked2, setIsCalendarClicked2] = useState(false);
    const calendarRef2 = useRef(null);

    const handleCalendarClick = () => {
        setIsCalendarClicked(true);
    };

    const handleCalendarClick2 = () => {
        setIsCalendarClicked2(true);
    };

    const handleOutsideClick = (event) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target)) {
            setIsCalendarClicked(false);
        }
    };

    const handleOutsideClick2 = (event) => {
        if (calendarRef2.current && !calendarRef2.current.contains(event.target)) {
            setIsCalendarClicked2(false);
        }
    };

    useEffect(() => {
        const sucursal = "";
        const sociedad = "1000";
        const centrol = "";
        const nombreCentro = "";
        const tipoCentro = "";
        const listaDescripcionYCodigo = [];
        repoteventascorales.centrologistico(sucursal, sociedad, centrol, nombreCentro, tipoCentro).then((data) => {
            // console.log(data);
            for (const dato of data) {
                if (dato.serverHost && dato.serverHost.includes("http://app")) {
                    const descripcionCentro = dato.descripcionCentro;
                    const codigoCentro = dato.id.codigoCentro;
                    const hostcentro = dato.serverHost;
                    // Creamos un objeto con la descripciónCentro y el codigoCentro y lo agregamos a la lista.
                    listaDescripcionYCodigo.push({ descripcionCentro, codigoCentro, hostcentro });
                }
            }
            setlistalogistica(listaDescripcionYCodigo);
            //console.log(listaDescripcionYCodigo);
        })


        window.addEventListener('click', handleOutsideClick);
        window.addEventListener('click', handleOutsideClick2);
        return () => {
            window.removeEventListener('click', handleOutsideClick);
            window.removeEventListener('click', handleOutsideClick2);
        };
    }, []);

    const [centroSeleccionado, setCentroSeleccionado] = useState('');

    // Manejador para el cambio en el select
    const handleSelectChange = (event) => {
        const selectedCentro = event.target.value;
        setCentroSeleccionado(selectedCentro);
        console.log(selectedCentro)
        // Encuentra el serverHost correspondiente al centro seleccionado en listaDescripcionYCodigo
        const selectedCentroData = listalogistica.find(item => item.codigoCentro === selectedCentro);

        if (selectedCentroData) {
            const serverHostSeleccionado = selectedCentroData.hostcentro;
            const serverHostSeleccionadoHttps = serverHostSeleccionado.replace("http:", "https:");

            setServerseleccionado(serverHostSeleccionadoHttps);
        }
    };

    const [filtro, setFiltro] = useState('');

    const handleInputChangebu = (event) => {
        setFiltro(event.target.value);
    };

    const options = listalogistica.map((item, index) => ({
        value: item.codigoCentro,
        label: item.descripcionCentro,
    }));

    const listaDescripcionYCodigoFormateada = listalogistica.map(item => ({
        ...item,
        label: `${item.descripcionCentro} (${item.codigoCentro})`
    }));

    const listaCiudades = [
        { id: 1, nombre: 'Nueva York', codigoPostal: '10001', pais: 'Estados Unidos' },
        { id: 2, nombre: 'Londres', codigoPostal: 'SW1A 1AA', pais: 'Reino Unido' },
        { id: 3, nombre: 'París', codigoPostal: '75000', pais: 'Francia' },
        { id: 4, nombre: 'Tokio', codigoPostal: '100-0001', pais: 'Japón' },
    ];

    const handleSelectChange2 = (e) => {
        setCiudadSeleccionada(e.value);
    };
    const [filtroCiudades, setFiltroCiudades] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        const ciudadesFiltradas = listaCiudades.filter((ciudad) =>
            ciudad.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );
        setFiltroCiudades(ciudadesFiltradas);
    }, [busqueda]);

    const handleInputChange3 = (e) => {
        setBusqueda(e.target.value);
    };


    const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null);
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
                                maxWidth: '180px',
                                border: isCalendarClicked ? '2px solid black' : '1px solid #808080',
                                borderRadius: '3px',
                                top: '1px',

                            }}>
                                <Dropdown
                                    autoComplete="off"
                                    aria-hidden="true"
                                    className="w-full md:w-12rem"
                                    placeholder="Seleccione"
                                    id="mySelect"
                                    style={{ backgroundColor: "#ffffff", height: "36px" }}
                                    optionLabel="nombre" // Mostrar solo el nombre en el Dropdown
                                    value={ciudadSeleccionada}
                                    options={listaCiudades}
                                    onChange={handleSelectChange2}
                                    filter onInputChange={handleInputChange3} 
                                />
                                {ciudadSeleccionada && (
                                    <div>
                                        <h2>Detalles de la ciudad seleccionada:</h2>
                                        <p>Nombre: {ciudadSeleccionada.nombre}</p>
                                        <p>Código Postal: {ciudadSeleccionada.codigoPostal}</p>
                                        <p>País: {ciudadSeleccionada.pais}</p>
                                    </div>
                                )}
                            </span>



                            &nbsp;
                            &nbsp;

                            <span className="p-float-label" style={{ position: 'relative', display: 'inline-block', maxWidth: '120px' }}>
                                <input
                                    id="input1"
                                    className={`ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all MarRight10 ${numCaja ? 'ui-state-filled' : ''}`}
                                    value={numCaja}
                                    onChange={handleInputChange2}
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
                                    border: isCalendarClicked ? '2px solid black' : '1px solid #808080',
                                    borderRadius: '3px',
                                }}
                                ref={calendarRef}
                            >
                                <label
                                    style={{
                                        position: 'absolute',
                                        top: isCalendarClicked ? '10px' : '-10px', // Ajusta la posición vertical
                                        left: '1px',
                                        backgroundColor: 'white',
                                        padding: '0 5px',
                                        display: 'block',
                                        opacity: 1,
                                        transition: 'top 0.5s ease', // Agregar una transición suave
                                        fontSize: '12px', // Ajusta el tamaño de la letra según tus necesidades
                                        color: '#7f8990', // Cambia el color del texto a #7f8990
                                        zIndex: 1,

                                    }}
                                >
                                    Fecha Inicial
                                </label>
                                <Calendar
                                    id="calfechaini"
                                    value={fechaini}
                                    onChange={handleDateChange}
                                    dateFormat="yy-mm-dd"
                                    showIcon
                                    className={`custom-calendar-style ${isCalendarClicked ? 'clicked' : ''}`}
                                    onClick={handleCalendarClick}
                                />
                            </span>




                            &nbsp;
                            &nbsp;

                            <span
                                style={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    maxWidth: '180px',
                                    border: isCalendarClicked2 ? '2px solid black' : '1px solid #808080',
                                    borderRadius: '3px',
                                }}
                                ref={calendarRef2}
                            >
                                <label
                                    style={{
                                        position: 'absolute',
                                        top: isCalendarClicked2 ? '10px' : '-10px', // Ajusta la posición vertical
                                        left: '1px',
                                        backgroundColor: 'white',
                                        padding: '0 5px',
                                        display: 'block',
                                        opacity: 1,
                                        transition: 'top 0.5s ease', // Agregar una transición suave
                                        fontSize: '12px', // Ajusta el tamaño de la letra según tus necesidades
                                        color: '#7f8990', // Cambia el color del texto a #7f8990
                                        zIndex: 1,

                                    }}
                                >
                                    Fecha Final
                                </label>
                                <Calendar
                                    id="calfechafin"
                                    value={fechafin}
                                    onChange={handleDateChange2}
                                    dateFormat="yy-mm-dd"
                                    showIcon
                                    className={`custom-calendar-style ${isCalendarClicked2 ? 'clicked' : ''}`}
                                    onClick={handleCalendarClick2}
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




                <Dialog header="Enviar Estados de Cuenta" visible={visibleEnviarCuenta} style={{ width: '400px', minWidth: '400px' }} onHide={() => setvisibleEnviarCuenta(false)} footer={footerContent} draggable={false} resizable={false} >

                </Dialog>


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
