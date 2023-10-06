
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { ArticulosIntermediaws } from '../serviceIntermedia/ArticulosIntermediaws';
import { Checkbox } from 'primereact/checkbox';
import "../assets/theme/indigo/theme-light.css";
import { GestionPropuestasIntermediaws } from '../serviceIntermedia/GestionPropuestasIntermediaws';
import { Calendar } from 'primereact/calendar';
const GestionPropuestas = ({ usuarioUppercase }) => {
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('center');
    const toast = useRef(null);
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    const [actualfecha, setActualfecha] = useState(fechaActual);;
    const [fechaini, setFechaini] = useState(fechaActual);;
    const [DataGestion, setDataGestion] = useState([]);
    const gestionprodata = new GestionPropuestasIntermediaws();
    const [error, setError] = useState(null);
    const [dialogVisibleError, setDialogVisibleError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    //console.log(usuarioUppercase);
    //Cambiar de pagina
    const onPageChange = (event) => {
        const newPage = Math.floor(event.first / event.rows);
        setLoading(true);
        setRowsPerPage(event.rows);
        setCurrentPage(newPage);
    };



    //Carga al empesar la pagina los datos y los contiene en costante ejecucion con paginacion. 
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const fechaFormateadaini = `${fechaini.getFullYear()}-${(fechaini.getMonth() + 1).toString().padStart(2, '0')}-${fechaini.getDate().toString().padStart(2, '0')} ${fechaini.getHours().toString().padStart(2, '0')}:${fechaini.getMinutes().toString().padStart(2, '0')}:${fechaini.getSeconds().toString().padStart(2, '0')}`;

            const fecha = null;

            const response1 = await gestionprodata.resumenPropuestas(
                fechaFormateadaini

            );

            if (response1) {
                console.log(response1);
                if (response1) {
                    const registrosAgrupados = {};

                    response1.forEach((registro) => {
                        const centro = registro.centro;
                        const estado = registro.estadoInt;
                        const entero1 = registro.entero1;

                        if (!registrosAgrupados[centro]) {
                            registrosAgrupados[centro] = {
                                centro,
                                nombre: registro.nombre,
                                rowKey: registro.rowKey,
                                estados: {},
                            };
                        }

                        if (!registrosAgrupados[centro].estados[estado]) {
                            registrosAgrupados[centro].estados[estado] = 0;
                        }

                        registrosAgrupados[centro].estados[estado] += entero1;
                    });


                    const registrosCombinados = Object.values(registrosAgrupados).map((registro) => {
                        const estados = [];
                        for (const estado in registro.estados) {
                            estados.push({
                                estadoInt: parseInt(estado),
                                entero1: registro.estados[estado],
                            });
                        }
                        return { ...registro, estados };
                    });



                    console.log(registrosCombinados);
                    setDataGestion(registrosCombinados);
                    setLoading(false);
                } else {
                    setLoading(false);
                    setError(response1.data.message);
                    setPosition('top');
                    setDialogVisibleError(true);
                    return response1.data.message;
                }
            }

        };
        fetchData();

        window.addEventListener('click', handleOutsideClickFechaini);
        return () => {
            window.removeEventListener('click', handleOutsideClickFechaini);
        };
    }, [currentPage, rowsPerPage]);


    //Incono Para Tabla 
    const paginatorLeft = <i />;
    const paginatorRight = <i />;
    const startRecord = currentPage * rowsPerPage + 1;
    const endRecord = Math.min((currentPage + 1) * rowsPerPage, totalRecords);



    const DataTablaar = ({ dataar }) => {


        /*const paso1 = (rowData) => {
            return (
                <div className="flex flex-wrap gap-2">
                    <i className="fa-solid fa-forward" style={{ fontSize: '1.3rem' }} onClick={() => procedepaso1(rowData)} ></i>
                </div>
            );
        };

        const paso2 = (rowData) => {
            return (
                <div className="flex flex-wrap gap-2">
                    <i className="fa-solid fa-forward" style={{ fontSize: '1.3rem' }} onClick={() => procedepaso2(rowData)} ></i>
                </div>
            );
        };

        const paso3 = (estadoInt) => {
            return (
                <div className="flex flex-wrap gap-2">
                    <i className="fa-solid fa-forward" style={{ fontSize: '1.3rem' }} onClick={() => procedepaso3(rowData)} ></i>
                </div>
            );
        };*/




        const estadoTextos = {
            0: 'Pendientes',
            2: 'Validados',
            3: 'Preaprobados',
            4: 'Aprobados',
            5: 'Enviados',
            8: 'Rechazados',
            9: 'Anulados',
        };

        const categoriasEstado = dataar.reduce((categorias, registro) => {
            registro.estados.forEach((estado) => {
                if (!categorias.includes(estado.estadoInt)) {
                    categorias.push(estado.estadoInt);
                }
            });
            return categorias;
        }, []);


        categoriasEstado.sort((a, b) => a - b);


        const Todosprocesos = (rowData, estadoInt, centro) => {
            const valor = 1;
            if (estadoInt === 0) {

                return (
                    <div className="flex flex-wrap gap-2">
                        <i className="fa-solid fa-forward" style={{ fontSize: '1.3rem' }} onClick={() => procedepaso3(centro, valor)} ></i>
                    </div>
                );
            } else if (estadoInt === 2) {
                return (
                    <div className="flex flex-wrap gap-2">
                        <i className="fa-solid fa-forward" style={{ fontSize: '1.3rem' }} onClick={() => procedepaso3(centro, valor)} ></i>
                    </div>
                );
            } else if (estadoInt === 3) {
                return (
                    <div className="flex flex-wrap gap-2">
                        <i className="fa-solid fa-forward" style={{ fontSize: '1.3rem' }} onClick={() => procedepaso3(centro, valor)} ></i>
                    </div>
                );
            } else if (estadoInt === 4) {
                return (
                    <div className="flex flex-wrap gap-2">
                        <i className="fa-solid fa-forward" style={{ fontSize: '1.3rem' }} onClick={() => procedepaso3(centro, valor)} ></i>
                    </div>
                );
            } else {
                // Si el estado no coincide con ninguno de los casos anteriores, puedes devolver algo diferente o null.
                return null;
            }
        };


        const procesoindividual = (estadoInt, centro) => {
            if (estadoInt === 0) {
                return (
                    <div className="flex flex-wrap gap-2">
                        <i className="fa-solid fa-forward-step" style={{ fontSize: '1.3rem' }} onClick={() => procedepaso1(centro)} ></i>
                    </div>
                );
            } else if (estadoInt === 2) {
                return (
                    <div className="flex flex-wrap gap-2">
                        <i className="fa-solid fa-forward-step" style={{ fontSize: '1.3rem' }} onClick={() => procedepaso2(centro)} ></i>
                    </div>
                );
            } else if (estadoInt === 3) {
                return (
                    <div className="flex flex-wrap gap-2">
                        <i className="fa-solid fa-forward-step" style={{ fontSize: '1.3rem' }} onClick={() => procedepaso3(centro)} ></i>
                    </div>
                );
            } else if (estadoInt === 4) {
                return (
                    <div className="flex flex-wrap gap-2">
                        <i className="fa-solid fa-forward-step" style={{ fontSize: '1.3rem' }} onClick={() => procedepaso4(centro)} ></i>
                    </div>
                );
            } else {
                return null;
            }
        };
        const todosLosCentros = DataGestion.map((registro) => registro.centro);

        const columns = categoriasEstado.map((estadoInt) => (
            <Column key={estadoInt} field={`estado${estadoInt}`} header={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
                    <span>{estadoTextos[estadoInt]}</span>
                    &nbsp; &nbsp; {Todosprocesos(null, estadoInt, todosLosCentros)}
                </div>
            } body={rowData => (
                <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <span>{rowData[`estado${estadoInt}`]}</span>
                    &nbsp; &nbsp; {procesoindividual(estadoInt, rowData.centro)}
                </div>
            )} style={{ width: '20px', textAlign: 'center' }} />
        ));








        const dataTabla = dataar.map((registro) => {
            const data = {
                centro: registro.centro,
                nombre: registro.nombre,
            };

            categoriasEstado.forEach((estadoInt) => {
                const estado = registro.estados.find((estado) => estado.estadoInt === estadoInt);
                data[`estado${estadoInt}`] = estado ? estado.entero1 : 0;
            });

            return data;
        });

        return (
            <div>
                <DataTable value={dataTabla}
                    paginator
                    totalRecords={totalRecords}
                    onPage={onPageChange}
                    rows={rowsPerPage}
                    first={currentPage * rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorPosition="both"
                >
                    <Column field="centro" header="Centro" style={{ width: '50px' }} />
                    <Column field="nombre" header="Nombre" style={{ width: '120px' }} />
                    {columns}
                </DataTable>
            </div>
        );
    };



    const obtenerdatos = (rowData) => {
        console.log(rowData.centro);
        console.log(usuarioUppercase);
    }


    const procedepaso1 = (centros, valor) => {
        const fechaFormateadaini = `${fechaini.getFullYear()}-${(fechaini.getMonth() + 1).toString().padStart(2, '0')}-${fechaini.getDate().toString().padStart(2, '0')} ${fechaini.getHours().toString().padStart(2, '0')}:${fechaini.getMinutes().toString().padStart(2, '0')}:${fechaini.getSeconds().toString().padStart(2, '0')}`;
        const usuario = usuarioUppercase;
        const ip = usuarioUppercase;
        if (valor == 1) {
            const promesas = centros.map((centro) => {
                return gestionprodata.forzarValidacion(fechaFormateadaini, centro, usuario, ip);
            });

            Promise.all(promesas)
                .then((results) => {
                    console.log(results);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {

            gestionprodata.forzarValidacion(fechaFormateadaini, centros, usuario, ip).then((response) => {
                console.log(response);
            });
        }

    }

    const procedepaso2 = (centros, valor) => {
        const fechaFormateadaini = `${fechaini.getFullYear()}-${(fechaini.getMonth() + 1).toString().padStart(2, '0')}-${fechaini.getDate().toString().padStart(2, '0')} ${fechaini.getHours().toString().padStart(2, '0')}:${fechaini.getMinutes().toString().padStart(2, '0')}:${fechaini.getSeconds().toString().padStart(2, '0')}`;
        const usuario = usuarioUppercase;
        const ip = usuarioUppercase;
        if (valor == 1) {
            const promesas = centros.map((centro) => {
                return gestionprodata.forzarPreaprobacion(fechaFormateadaini, centro, usuario, ip);
            });

            Promise.all(promesas)
                .then((results) => {
                    console.log(results);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            gestionprodata.forzarPreaprobacion(fechaFormateadaini, centros, usuario, ip).then((response) => {
                console.log(response);
            });
        }
    }

    const procedepaso3 = (centros, valor) => {
        const fechaFormateadaini = `${fechaini.getFullYear()}-${(fechaini.getMonth() + 1).toString().padStart(2, '0')}-${fechaini.getDate().toString().padStart(2, '0')} ${fechaini.getHours().toString().padStart(2, '0')}:${fechaini.getMinutes().toString().padStart(2, '0')}:${fechaini.getSeconds().toString().padStart(2, '0')}`;
        const usuario = usuarioUppercase;
        const ip = usuarioUppercase;
        if (valor == 1) {
            const promesas = centros.map((centro) => {
                return gestionprodata.forzarAprobacion(fechaFormateadaini, centro, usuario, ip);
            });

            Promise.all(promesas)
                .then((results) => {
                    console.log(results);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {

            gestionprodata.forzarAprobacion(fechaFormateadaini, centros, usuario, ip).then((response) => {
                console.log(response);
            });
        }
    }

    const procedepaso4 = (centros, valor) => {
        const fechaFormateadaini = `${fechaini.getFullYear()}-${(fechaini.getMonth() + 1).toString().padStart(2, '0')}-${fechaini.getDate().toString().padStart(2, '0')} ${fechaini.getHours().toString().padStart(2, '0')}:${fechaini.getMinutes().toString().padStart(2, '0')}:${fechaini.getSeconds().toString().padStart(2, '0')}`;
        const usuario = usuarioUppercase;
        const ip = usuarioUppercase;
        if (valor == 1) {
            const promesas = centros.map((centro) => {
                return gestionprodata.forzarEnvio(fechaFormateadaini, centro, usuario, ip);
            });

            Promise.all(promesas)
                .then((results) => {
                    console.log(results);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {

            gestionprodata.forzarEnvio(fechaFormateadaini, centros, usuario, ip).then((response) => {
                console.log(response);
            });
        }
    }
    //Almacena el id de la categoria selecionada
    /*const handleIconClick = (rowData) => {
        setSelectedCode(rowData[0]);
        setVisible(true);
    };*/


    //Abre el dialogo Categoria
    const openNew = (position) => {
        setPosition(position);
        setDialogVisible(true);
    };


    //Cierra el dialog Categoria y limpia los articulos selecionados
    /* const hideDialog = () => {
         setDialogVisible(false);
         setSelectedItems([]);
     };*/



    //Mensajes Mostrar
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


    //Opcion del dialogo yes metodo para el cambio de categoria


    //Opcion del dialogo no metodo para cerrar el dialogo y terminar proceso
    const handleNoClick = () => {
        setVisible(false);
        showErrorcancel();
    };


    //Footer del dilogo de opciones si y no 
    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={handleNoClick} className="p-button-text" />
        </div>
    );


    //Evento captura el nivel selecionado



    //Filtro para la carga de articulos con ingreso de filtros.
    const handleCargaDatos = async () => {
        setLoading(true);
        const fechaFormateadaini = `${fechaini.getFullYear()}-${(fechaini.getMonth() + 1).toString().padStart(2, '0')}-${fechaini.getDate().toString().padStart(2, '0')} ${fechaini.getHours().toString().padStart(2, '0')}:${fechaini.getMinutes().toString().padStart(2, '0')}:${fechaini.getSeconds().toString().padStart(2, '0')}`;

        const fecha = null;

        const response1 = await gestionprodata.resumenPropuestas(fechaFormateadaini);

        if (response1) {
            console.log(response1);
            if (response1) {
                const registrosAgrupados = {};

                response1.forEach((registro) => {
                    const centro = registro.centro;
                    const estado = registro.estadoInt;
                    const entero1 = registro.entero1;

                    if (!registrosAgrupados[centro]) {
                        registrosAgrupados[centro] = {
                            centro,
                            nombre: registro.nombre,
                            rowKey: registro.rowKey,
                            estados: {}, // Aquí almacenaremos los estados dinámicamente.
                        };
                    }

                    if (!registrosAgrupados[centro].estados[estado]) {
                        registrosAgrupados[centro].estados[estado] = 0;
                    }

                    registrosAgrupados[centro].estados[estado] += entero1;
                });

                // Convertir el objeto de estados nuevamente a un arreglo de objetos
                const registrosCombinados = Object.values(registrosAgrupados).map((registro) => {
                    const estados = [];
                    for (const estado in registro.estados) {
                        estados.push({
                            estadoInt: parseInt(estado), // Convertir de cadena a número si es necesario.
                            entero1: registro.estados[estado],
                        });
                    }
                    return { ...registro, estados };
                });



                console.log(registrosCombinados);
                setDataGestion(registrosCombinados);
                setLoading(false);
            } else {
                setLoading(false);
                setError(response1.data.message);
                setPosition('top');
                setDialogVisibleError(true);
                return response1.data.message;
            }
        }
    };



    //Inputs y Varibles de entrada Para Busquea

    const handleCalendarClickFechaini = () => {
        setIsCalendarClickedFechaini(true);
    };

    const handleDateChangeFechaini = (event) => {
        setFechaini(event.value);
    };
    const [isCalendarClickedFechaini, setIsCalendarClickedFechaini] = useState(false);
    const calendarRefFechaini = useRef(null);

    const handleOutsideClickFechaini = (event) => {
        if (calendarRefFechaini.current && !calendarRefFechaini.current.contains(event.target)) {
            setIsCalendarClickedFechaini(false);
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
                            <span className="Fs20 FontBold">Gestion de Propúestas</span>
                            <hr className="ui-separator ui-state-default ui-corner-all" />
                            <div className="p-grid p-formgrid">
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

                                <button
                                    id="FiltrarControl"
                                    className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left MarRight10 ui-button-success"
                                    onClick={handleCargaDatos}
                                    disabled={loading}
                                    type="button"
                                    role="button"
                                    aria-disabled="false"
                                >
                                    <span className="ui-button-text ui-c"><i className="ui-button-icon-left ui-icon ui-c pi pi-search" /> &nbsp;Buscar</span>
                                </button>



                                &nbsp;
                            </div>
                        </div>

                    </div>
                    &nbsp;

                    &nbsp;
                    <div>
                        <DataTablaar dataar={DataGestion} loading={loading} onPageChange={onPageChange} />
                    </div>
                </form>








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

                <Dialog header="Error" visible={dialogVisibleError} position={position} style={{ width: '40vw' }} onHide={() => setDialogVisibleError(false)}>
                    <p className="m-0">
                        {error}
                    </p>
                </Dialog>

            </div>
        </div>

    );


};

export default GestionPropuestas;





