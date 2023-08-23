import axios from 'axios';
import { PathService } from '../service/Path.Service';

export class CategoriasCoralIntermediaws {

    constructor() {
        this.pathService = new PathService();
    }

    listarCategoriasCoralVista(cod, des, niv) {
        const asignacion = "INTERMEDIAWS_CATEGCORAL_LIST_VISTA";
        return this.pathService.getUrl(asignacion)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = data.object.serCodigo.serUrl;

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
                const nuevaSerUrl = data.object.serCodigo.serUrl;
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

    guardarCambiosCategoria( categoriaNueva, descripcion, categoriaAnterior,usuCrea, codigo, fechaModifica, usuarioParam) {
        const ws_nombre = "INTERMEDIAWS_CATEGCORAL_SAVE_CAMBIO";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = data.object.serCodigo.serUrl;
                const url = nuevaSerUrl + nuevaWsUrl;
                const articulos = {
                    estado: false,
                    categoriaNueva: categoriaNueva,
                    descripcion: descripcion,
                    categoriaAnterior: categoriaAnterior,
                    usuCrea: usuCrea,
                    codigo:codigo,
                    fechaModifica: fechaModifica,
                    fechaCrea: null,
                    fecha: null,
                    usuModifica: null
                  };
                const requestData = {
                    object: JSON.stringify({
                        cambios: JSON.stringify(articulos),
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
                const nuevaSerUrl = data.object.serCodigo.serUrl;
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


    loadCategoriaCambio(codArticuloParam, nombreArticuloParam, estadosParam, fechaInicioParam, fechaFinParam, usuarioParam, lazyParam) {
        const ws_nombre = "INTERMEDIAWS_CATEGCORAL_LOAD_CAMBIOS";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = data.object.serCodigo.serUrl;
                const url = nuevaSerUrl + nuevaWsUrl;
                const requestData = {
                    object: JSON.stringify({
                        codArticulo: codArticuloParam,
                        nombreArticulo: nombreArticuloParam,
                        estados: estadosParam,
                        fechaInicio: fechaInicioParam,
                        fechaFin: fechaFinParam,
                        usuario: usuarioParam,
                        lazy: lazyParam
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
                const nuevaSerUrl = data.object.serCodigo.serUrl;
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

    updateEstadoCambioCategoria(cmbIdParam, nuevoEstadoParam, observacionesParam, usuarioParam) {
        const ws_nombre = "INTERMEDIAWS_CATEGCORAL_UPDATE_ESTADO_CAMBIO";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = data.object.serCodigo.serUrl;
                const url = nuevaSerUrl + nuevaWsUrl;
                const requestData = {
                    object: JSON.stringify({
                        cmbId: cmbIdParam,
                        nuevoEstado: nuevoEstadoParam,
                        observaciones: observacionesParam,
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
