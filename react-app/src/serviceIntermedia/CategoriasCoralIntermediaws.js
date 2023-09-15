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
                const nuevaSerUrl = "http://localhost:8081/http://192.168.56.167:8080";
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
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
                        console.error('Error EstadosCuentaIntermediaws metodo listarCategoriasCoralVista', error);
                        window.alert('Ocurrió un error: ' + error.message);
                        return null;
                      });
                  })
                  .catch((error) => {
                    console.error('Error EstadosCuentaIntermediaws metodo listarCategoriasCoralVista', error);
                    window.alert('Ocurrió un error: ' + error.message);
                    return null;
                  });
    }



    getCambioCategoria(cmbIdParam) {
        const ws_nombre = "INTERMEDIAWS_CATEGCORAL_GET_CAMBIO";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://localhost:8081/http://192.168.56.167:8080";
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
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
                        console.error('Error EstadosCuentaIntermediaws metodo getCambioCategoria', error);
                        window.alert('Ocurrió un error: ' + error.message);
                        return null;
                      });
                  })
                  .catch((error) => {
                    console.error('Error EstadosCuentaIntermediaws metodo getCambioCategoria', error);
                    window.alert('Ocurrió un error: ' + error.message);
                    return null;
                  });
    }

    guardarCambiosCategoria(cambios, usuarioParam) {
        const ws_nombre = "INTERMEDIAWS_CATEGCORAL_SAVE_CAMBIO";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://localhost:8081/http://192.168.56.167:8080";
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
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
                        console.error('Error EstadosCuentaIntermediaws metodo guardarCambiosCategoria', error);
                        window.alert('Ocurrió un error: ' + error.message);
                        return null;
                      });
                  })
                  .catch((error) => {
                    console.error('Error EstadosCuentaIntermediaws metodo guardarCambiosCategoria', error);
                    window.alert('Ocurrió un error: ' + error.message);
                    return null;
                  });
    }

    listarCategoriaCambio(codigoParam, estadosParam, fechaInicioParam, fechaFinParam) {
        const ws_nombre = "INTERMEDIAWS_CATEGCORAL_LIST_CAMBIOS";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://localhost:8081/http://192.168.56.167:8080";
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
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
                        console.error('Error EstadosCuentaIntermediaws metodo listarCategoriaCambio', error);
                        window.alert('Ocurrió un error: ' + error.message);
                        return null;
                      });
                  })
                  .catch((error) => {
                    console.error('Error EstadosCuentaIntermediaws metodo listarCategoriaCambio', error);
                    window.alert('Ocurrió un error: ' + error.message);
                    return null;
                  });
    }


    loadCategoriaCambio(codArticuloParam, nombreArticuloParam, estadosParam, fechaInicioParam, fechaFinParam, usuarioParam, currentPage, rowsPerPage) {
        const ws_nombre = "INTERMEDIAWS_CATEGCORAL_LOAD_CAMBIOS";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://localhost:8081/http://192.168.56.167:8080";
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
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
                        console.error('Error EstadosCuentaIntermediaws metodo loadCategoriaCambio', error);
                        window.alert('Ocurrió un error: ' + error.message);
                        return null;
                      });
                  })
                  .catch((error) => {
                    console.error('Error EstadosCuentaIntermediaws metodo loadCategoriaCambio', error);
                    window.alert('Ocurrió un error: ' + error.message);
                    return null;
                  });
    }

    PaginacionloadCategoriaCambio(codArticuloParam, nombreArticuloParam, estadosParam, fechaInicioParam, fechaFinParam, usuarioParam, currentPage, rowsPerPage) {
        const ws_nombre = "INTERMEDIAWS_CATEGCORAL_LOAD_CAMBIOS";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://localhost:8081/http://192.168.56.167:8080";
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
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
                        console.error('Error EstadosCuentaIntermediaws metodo PaginacionloadCategoriaCambio', error);
                        window.alert('Ocurrió un error: ' + error.message);
                        return null;
                      });
                  })
                  .catch((error) => {
                    console.error('Error EstadosCuentaIntermediaws metodo PaginacionloadCategoriaCambio', error);
                    window.alert('Ocurrió un error: ' + error.message);
                    return null;
                  });
    }

    updateCambioCategoria(cmbIdParam, usuarioParam) {
        const ws_nombre = "INTERMEDIAWS_CATEGCORAL_UPDATE_CAMBIO";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://localhost:8081/http://192.168.56.167:8080";
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
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
                        console.error('Error EstadosCuentaIntermediaws metodo updateCambioCategoria', error);
                        window.alert('Ocurrió un error: ' + error.message);
                        return null;
                      });
                  })
                  .catch((error) => {
                    console.error('Error EstadosCuentaIntermediaws metodo updateCambioCategoria', error);
                    window.alert('Ocurrió un error: ' + error.message);
                    return null;
                  });
    }

    updateEstadoCambioCategoria(cmbIdParam, nuevoEstadoParam, usuarioParam) {
        const ws_nombre = "INTERMEDIAWS_CATEGCORAL_UPDATE_ESTADO_CAMBIO";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://localhost:8081/http://192.168.56.167:8080";
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
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
                        console.error('Error EstadosCuentaIntermediaws metodo updateEstadoCambioCategoria', error);
                        window.alert('Ocurrió un error: ' + error.message);
                        return null;
                      });
                  })
                  .catch((error) => {
                    console.error('Error EstadosCuentaIntermediaws metodo updateEstadoCambioCategoria', error);
                    window.alert('Ocurrió un error: ' + error.message);
                    return null;
                  });
    }

}
