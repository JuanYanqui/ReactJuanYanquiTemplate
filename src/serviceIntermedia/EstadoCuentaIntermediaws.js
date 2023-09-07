import axios from 'axios';
import { PathService } from '../service/Path.Service';
import { Toast } from 'primereact/toast';
import React, { useState, useEffect, useRef } from 'react';
export class EstadosCuentaIntermediaws {

    constructor() {
        this.pathService = new PathService();
    }

    enviarCorreosEf25Fi(codigosParam) {
        const ws_nombre = "INTERMEDIAWS_EST_CUENTA_CORREOS_EF25FI";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
                const nuevaSerUrl = "http://192.168.56.167:8080";
                const url = nuevaSerUrl + nuevaWsUrl;
                const requestData = {
                    object: JSON.stringify({
                        codigos: codigosParam
                    }),
                    rowCount: 0,
                };
                return axios
                    .post(url, requestData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        return null;
                    })
                    .catch((error) => {
                        console.error('Error EstadosCuentaIntermediaws metodo enviarCorreosEf25Fi...!!!!', error);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error EstadosCuentaIntermediaws metodo enviarCorreosEf25Fi', error);
                return null;
            });
    }

    generarEstadoCuenta(estIdParam) {
        const ws_nombre = "INTERMEDIAWS_PDF_ESTADO_CUENTA";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
                const nuevaSerUrl = "http://192.168.56.167:8080";
                const url = nuevaSerUrl + nuevaWsUrl;
                const requestData = {
                    object: JSON.stringify({
                        estId: estIdParam
                    }),
                    rowCount: 0,
                };
                return axios
                    .post(url, requestData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        const objectData = JSON.parse(response.data.object);
                        return objectData;
                    })
                    .catch((error) => {
                        console.error('Error EstadosCuentaIntermediaws metodo generarEstadoCuenta...!!!!', error);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error EstadosCuentaIntermediaws metodo generarEstadoCuenta', error);
                return null;
            });
    }

    getExcelEf25Fi(sociedadParam, bpParam) {
        const ws_nombre = "INTERMEDIAWS_EST_CUENTA_EXCEL_EF25FI";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
                const nuevaSerUrl = "http://192.168.56.167:8080";
                const url = nuevaSerUrl + nuevaWsUrl;
                const requestData = {
                    object: JSON.stringify({
                        sociedad: sociedadParam,
                        bp: bpParam
                    }),
                    rowCount: 0,
                };
                return axios
                    .post(url, requestData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        const objectData = JSON.parse(response.data.object);
                        return objectData;
                    })
                    .catch((error) => {
                        console.error('Error EstadosCuentaIntermediaws metodo getExcelEf25Fi...!!!!', error);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error EstadosCuentaIntermediaws metodo getExcelEf25Fi', error);
                return null;
            });
    }

    getPdfEf25Fi(sociedadParam, bpParam) {
        const ws_nombre = "INTERMEDIAWS_EST_CUENTA_PDF_EF25FI";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
                const nuevaSerUrl = "http://192.168.56.167:8080";
                const url = nuevaSerUrl + nuevaWsUrl;
                const requestData = {
                    object: JSON.stringify({
                        sociedad: sociedadParam,
                        bp: bpParam
                    }),
                    rowCount: 0,
                };
                return axios
                    .post(url, requestData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        const objectData = JSON.parse(response.data.object);
                        return objectData;
                    })
                    .catch((error) => {
                        console.error('Error EstadosCuentaIntermediaws metodo getPdfEf25Fi...!!!!', error);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error EstadosCuentaIntermediaws metodo getPdfEf25Fi', error);
                return null;
            });
    }

    ingresarEstadosCuenta(estadosParam) {
        const ws_nombre = "INTERMEDIAWS_INGRESAR_ESTADOS_CUENTA";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
                const nuevaSerUrl = "http://192.168.56.167:8080";
                const url = nuevaSerUrl + nuevaWsUrl;
                const requestData = {
                    object: JSON.stringify({
                        estados: estadosParam
                    }),
                    rowCount: 0,
                };
                return axios
                    .post(url, requestData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        return null;
                    })
                    .catch((error) => {
                        console.error('Error EstadosCuentaIntermediaws metodo ingresarEstadosCuenta...!!!!', error);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error EstadosCuentaIntermediaws metodo ingresarEstadosCuenta', error);
                return null;
            });
    }

    listarEf25Fi(bpParam, cedulaParam, nombreParam, enviandos) {
        const ws_nombre = "INTERMEDIAWS_EST_CUENTA_LISTAR_EF25FI";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
                const nuevaSerUrl = "http://192.168.56.167:8080";
                const url = nuevaSerUrl + nuevaWsUrl;
                const requestData = {
                    object: JSON.stringify({
                        sociedad: null,
                        bp: bpParam,
                        cedula: cedulaParam,
                        nombre: nombreParam,
                        enviados: enviandos
                    }),
                    rowCount: 0,
                };
                return axios
                    .post(url, requestData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        const objectData = JSON.parse(response.data.object);
                        return objectData;
                    })
                    .catch((error) => {
                        console.error('Error EstadosCuentaIntermediaws metodo listarEf25Fi...!!!!', error);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error EstadosCuentaIntermediaws metodo listarEf25Fi', error);
                return null;
            });
    }

    listarEstadosCuenta(fechaInicioParam, fechaFinParam, tipoBpParam, codigoBpParam, nombreBpParam, lazyInfoParam) {
        const ws_nombre = "INTERMEDIAWS_LISTAR_ESTADO_CUENTA";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
                const nuevaSerUrl = "http://192.168.56.167:8080";
                const url = nuevaSerUrl + nuevaWsUrl;
                const requestData = {
                    object: JSON.stringify({
                        fechaInicio: fechaInicioParam,
                        fechaFin: fechaFinParam,
                        tipoBp: tipoBpParam,
                        codigoBp: codigoBpParam,
                        nombreBp: nombreBpParam,
                        lazyInfo: lazyInfoParam
                    }),
                    rowCount: 0,
                };
                return axios
                    .post(url, requestData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        const objectData = JSON.parse(response.data.object);
                        return objectData;
                    })
                    .catch((error) => {
                        console.error('Error EstadosCuentaIntermediaws metodo listarEstadosCuenta...!!!!', error);
                        return null;
                    });
            })
            .catch((error) => {
                return null;
            });
    }

}