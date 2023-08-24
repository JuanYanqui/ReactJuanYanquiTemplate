import axios from 'axios';
import { PathService } from '../service/Path.Service';
import { Toast } from 'primereact/toast';
import React from 'react';

export class CategoriasCoralIntermediaws {

    constructor() {
        this.pathService = new PathService();
    }


    listarCategoriasCoralVista(cod, des, niv) {
        const asignacion = "INTERMEDIAWS_CATEGCORAL_LIST_VISTA";
        return this.pathService.getUrl(asignacion)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://192.168.19.117:8080";

                const url = nuevaSerUrl + nuevaWsUrl;
                const requestData = {
                    object: JSON.stringify({
                        codigo: cod,
                        descripcion: des,
                        nivel: niv,
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
                        console.error('Error en el nuevo método', error);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error al obtener datos para el nuevo método', error);
                return null;
            });
    }



    getCambioCategoria(cmbIdParam) {
        const ws_nombre = "INTERMEDIAWS_CATEGCORAL_GET_CAMBIO";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://192.168.19.117:8080";
                const url = nuevaSerUrl + nuevaWsUrl;
                const requestData = {
                    object: JSON.stringify({
                        cmbId: cmbIdParam
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
                        console.error('Error CategoriasCoralIntermediaws metodo getCambioCategoria...!!!!', error);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error CategoriasCoralIntermediaws metodo getCambioCategoria', error);
                return null;
            });
    }

    guardarCambiosCategoria(cambios, usuarioParam) {
        const ws_nombre = "INTERMEDIAWS_CATEGCORAL_SAVE_CAMBIO";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://192.168.19.117:8080";
                const url = nuevaSerUrl + nuevaWsUrl;
                const requestData = {
                    object: JSON.stringify({
                        cambios: JSON.stringify(cambios),
                        usuario: usuarioParam
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
                        return response;
                    })
                    .catch((error) => {
                        console.error('Error CategoriasCoralIntermediaws metodo guardarCambiosCategoria...!!!!', error);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error CategoriasCoralIntermediaws metodo guardarCambiosCategoria', error);
                return null;
            });
    }

    listarCategoriaCambio(codigoParam, estadosParam, fechaInicioParam, fechaFinParam) {
        const ws_nombre = "INTERMEDIAWS_CATEGCORAL_LIST_CAMBIOS";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://192.168.19.117:8080";
                const url = nuevaSerUrl + nuevaWsUrl;
                const requestData = {
                    object: JSON.stringify({
                        codigo: codigoParam,
                        estados: estadosParam,
                        fechaInicio: fechaInicioParam,
                        fechaFin: fechaFinParam
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
                        console.error('Error CategoriasCoralIntermediaws metodo listarCategoriaCambio...!!!!', error);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error CategoriasCoralIntermediaws metodo listarCategoriaCambio', error);
                return null;
            });
    }


    loadCategoriaCambio(codArticuloParam, nombreArticuloParam, estadosParam, fechaInicioParam, fechaFinParam, usuarioParam, currentPage, rowsPerPage) {
        const ws_nombre = "INTERMEDIAWS_CATEGCORAL_LOAD_CAMBIOS";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://192.168.19.117:8080";
                const url = nuevaSerUrl + nuevaWsUrl;
                const paginationInfo = {
                    count: false,
                    pagesize: rowsPerPage,
                    first: currentPage,
                    sortBy: {},
                    filterBy: {}
                };
                const requestData = {
                    object: JSON.stringify({
                        codArticulo: codArticuloParam,
                        nombreArticulo: nombreArticuloParam,
                        estados: estadosParam,
                        fechaInicio: fechaInicioParam,
                        fechaFin: fechaFinParam,
                        usuario: usuarioParam,
                        lazy: JSON.stringify(paginationInfo)
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
                        console.error('Error CategoriasCoralIntermediaws metodo loadCategoriaCambio...!!!!', error);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error CategoriasCoralIntermediaws metodo loadCategoriaCambio', error);
                return null;
            });
    }

    PaginacionloadCategoriaCambio(codArticuloParam, nombreArticuloParam, estadosParam, fechaInicioParam, fechaFinParam, usuarioParam, currentPage, rowsPerPage) {
        const ws_nombre = "INTERMEDIAWS_CATEGCORAL_LOAD_CAMBIOS";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://192.168.19.117:8080";
                const url = nuevaSerUrl + nuevaWsUrl;
                const paginationInfo = {
                    count: true,
                    pagesize: rowsPerPage,
                    first: currentPage,
                    sortBy: {},
                    filterBy: {}
                };
                const requestData = {
                    object: JSON.stringify({
                        codArticulo: codArticuloParam,
                        nombreArticulo: nombreArticuloParam,
                        estados: estadosParam,
                        fechaInicio: fechaInicioParam,
                        fechaFin: fechaFinParam,
                        usuario: usuarioParam,
                        lazy: JSON.stringify(paginationInfo)
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
                        console.error('Error CategoriasCoralIntermediaws metodo loadCategoriaCambio...!!!!', error);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error CategoriasCoralIntermediaws metodo loadCategoriaCambio', error);
                return null;
            });
    }

    updateCambioCategoria(cmbIdParam, usuarioParam) {
        const ws_nombre = "INTERMEDIAWS_CATEGCORAL_UPDATE_CAMBIO";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://192.168.19.117:8080";
                const url = nuevaSerUrl + nuevaWsUrl;
                const requestData = {
                    object: JSON.stringify({
                        cmbId: cmbIdParam,
                        usuario: usuarioParam
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
                        console.error('Error CategoriasCoralIntermediaws metodo updateCambioCategoria...!!!!', error);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error CategoriasCoralIntermediaws metodo updateCambioCategoria', error);
                return null;
            });
    }

    updateEstadoCambioCategoria(cmbIdParam, nuevoEstadoParam, usuarioParam) {
        const ws_nombre = "INTERMEDIAWS_CATEGCORAL_UPDATE_ESTADO_CAMBIO";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://192.168.19.117:8080";
                const url = nuevaSerUrl + nuevaWsUrl;
                const requestData = {
                    object: JSON.stringify({
                        cmbId: cmbIdParam,
                        nuevoEstado: nuevoEstadoParam,
                        observaciones: "",
                        usuario: usuarioParam
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
                        return response;

                    })
                    .catch((error) => {
                        console.error('Error CategoriasCoralIntermediaws metodo updateEstadoCambioCategoria...!!!!', error);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error CategoriasCoralIntermediaws metodo updateEstadoCambioCategoria', error);
                return null;
            });
    }

}
