
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

const VentasTargetas = () => {
    const [visible, setVisible] = useState(false);
    const [visibleEnviarCuenta, setvisibleEnviarCuenta] = useState(false);
    const [position, setPosition] = useState('center');
    const toast = useRef(null);
    const [centro, setCentro] = useState("");
    const [ptoemi, setPtoemi] = useState("");
    const [fecha, setFecha] = useState(null);
    const ventastarjetadata = new VentasTargetasPosws();
    const [DataEstadoCuenta, setDataEstadoCuenta] = useState("");

    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(10);
    const [selectedbp, setSelectedbp] = useState(null);
    const [selectedsociedad, setSelectedsociedad] = useState(null);
    const [estadoSelecionado, setestadoSelecionado] = useState(null);
    const [error, setError] = useState(null);
    const [dialogVisibleError, setDialogVisibleError] = useState(false);


    const onPageChange = (event) => {
        const newPage = Math.floor(event.first / event.rows);
        setLoading(true);
        setRowsPerPage(event.rows);
        setCurrentPage(newPage);
        cargaDatos();
    };

    const paginatorLeft = <i />;
    const paginatorRight = (
        <div>
            <div className="flex flex-wrap gap-2" style={{display: 'inline-block'}}>
                <img
                    src="../assets/layout/images/exelimg.png"
                    alt="Descripción de la imagen"
                    style={{ width: '40px', height: '35px' }} onClick={() => generarexelpeti()}
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
        return (
            <div>
                <DataTable value={dataar} 
                    paginator
                    totalRecords={totalRecords}
                    onPage={onPageChange}
                    rows={rowsPerPage}
                    first={currentPage * rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorPosition="both"
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                    paginatorTemplate={`CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown`}
                    currentPageReportTemplate={`Registros ${startRecord} -  de {totalRecords}`}
                >
                    <Column field="1" style={{ minWidth: '50px' }} header="Centro" />
                    <Column field="2" style={{ minWidth: '50px' }}header="Ptoemi" />
                    <Column field="3" style={{ minWidth: '50px' }} header="Comprobante" />
                    <Column field="4" style={{ minWidth: '250px' }} header="Descripción" />
                    <Column field="8" style={{ minWidth: '50px' }} header="Recap" />
                    <Column field="6" style={{ minWidth: '50px' }} header="Lote" />
                    <Column field="5" style={{ minWidth: '50px' }} header="Bin" />
                    <Column field="7" style={{ minWidth: '50px' }} header="Autorización" />
                    <Column field="9" style={{ minWidth: '200px' }} header="Factura" />
                    <Column field="10" style={{ minWidth: '200px' }}  header="Fecha E." />
                    <Column field="11" style={{ minWidth: '100px' }} header="Identificación" />
                    <Column field="12" style={{ minWidth: '300px' }} header="Cliente" />  
                    <Column field="3" style={{ minWidth: '50px' }} header="#Tarjeta" />              
                    <Column field="16" style={{ minWidth: '50px' }} header="Val Recap." />
                    <Column field="0" style={{ minWidth: '50px' }} header="Valor V." />
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

    const generarexelpeti = () => {
        generarExcelpropio();
    }


    const generarExcelpropio = () => {
        if (DataEstadoCuenta == null || DataEstadoCuenta.length == 0) {
            showWarnexe();
        } else {
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet([
                ['Ventas de Tarjeta'],
                [
                    'Centro',
                    'Ptoemi',
                    'Comprobante',
                    'Descripción',
                    'Recap',
                    'Lote',
                    'Bin',
                    'Autorización',
                    'Factura',
                    'Fecha E.',
                    'Identificación',//11
                    'Cliente',//12
                    'Base Iva',//13
                    'Otros',//14
                    'Iva',//15
                    'Val Recap',//21
                    '#Tarjeta',//3
                    'Dif',//19
                    'NombreBanco',//17
                    'TCredito',//18
                    'Descripcion',//20
                    'Valor Total',//16
                ],
                ...DataEstadoCuenta.map(item => [
                    item[1],
                    item[2],
                    item[3],
                    item[4],
                    item[8],
                    item[6],
                    item[5],
                    item[7],
                    item[9],
                    item[10],
                    item[11],
                    item[12],
                    item[13],
                    item[14],
                    item[15],
                    item[21],
                    item[3],
                    item[19],
                    item[17],
                    item[18],
                    item[20],
                    item[16],
                ]),
            ]);

            const mergeTitle = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: 0, c: 9 } });
            ws['!merges'] = [XLSX.utils.decode_range(mergeTitle)];
            ws['A1'].s = { halign: 'center', valign: 'center' };

            XLSX.utils.book_append_sheet(wb, ws, 'VentasdeTarjetas');
            XLSX.writeFile(wb, 'VentasdeTarjetas.xlsx');
        }

    };





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


    const [loading, setLoading] = useState(false);


    const cargaDatos = () => {
        setLoading(true);
        //console.log(fecha)
        if (fecha == null) {
            ventastarjetadata.ventasTargetas(centro, fecha, ptoemi).then((data) => {
                //console.log(data);
                setDataEstadoCuenta(data);
                setLoading(false);
            });
        } else {
            const fechaFormateada = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')} ${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}:${fecha.getSeconds().toString().padStart(2, '0')}`;
            ventastarjetadata.ventasTargetas(centro, fechaFormateada, ptoemi).then((data) => {
                //console.log(data);
                setDataEstadoCuenta(data);
                setLoading(false);
            });
        }

    }

    const handleInputChange = (event) => {
        setCentro(event.target.value);

    };

    const handleInputChange2 = (event) => {
        setPtoemi(event.target.value);

    };


    const handleDateChange = (event) => {
        setFecha(event.value);
    };
    const [isCalendarClicked, setIsCalendarClicked] = useState(false);
    const calendarRef = useRef(null);

    const handleCalendarClick = () => {
        setIsCalendarClicked(true);
    };

    const handleOutsideClick = (event) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target)) {
            setIsCalendarClicked(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleOutsideClick);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className='layout-wrapper menu-layout-overlay'>
            <div style={{ height: '15px' }}></div>
            <div className='content-layout'>
                <form>
                    <div className="p-col-12">
                        <div >
                            <div >
                                <span className="Fs20 FontBold">Ventas de Tarjetas</span>
                                <button
                                    id="FiltrarEstadoCuenta"
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
                            <span className="p-float-label" style={{ position: 'relative', display: 'inline-block', maxWidth: '120px' }}>
                                <input
                                    id="inputcentro"
                                    className={`ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all MarRight10 ${centro ? 'ui-state-filled' : ''}`}
                                    value={centro}
                                    onChange={handleInputChange}
                                    style={{ width: '100%' }}

                                />
                                <label className={centro ? 'ui-label-floated' : ''} style={{ color: '#6c747c', fontSize: '16px', background: '#fff' }}>Centro</label>
                            </span>

                            &nbsp;
                            &nbsp;

                            <span className="p-float-label" style={{ position: 'relative', display: 'inline-block', maxWidth: '120px' }}>
                                <input
                                    id="inputptoemi"
                                    className={`ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all MarRight10 ${ptoemi ? 'ui-state-filled' : ''}`}
                                    value={ptoemi}
                                    onChange={handleInputChange2}
                                    style={{ width: '100%' }}

                                />
                                <label className={ptoemi ? 'ui-label-floated' : ''} style={{ color: '#6c747c', fontSize: '16px', background: '#fff' }}>Ptoemi</label>
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
                                <Calendar
                                    id="inputnombrecuenta"
                                    value={fecha}
                                    onChange={handleDateChange}
                                    dateFormat="yy-dd-mm"
                                    showIcon
                                    className={`custom-calendar-style ${isCalendarClicked ? 'clicked' : ''}`}
                                    onClick={handleCalendarClick}
                                />
                            </span>




                            &nbsp;
                            &nbsp;

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


            </div>
        </div>

    );


};

export default VentasTargetas;
