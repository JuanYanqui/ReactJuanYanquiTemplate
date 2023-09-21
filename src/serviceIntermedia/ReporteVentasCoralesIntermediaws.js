import { PathService } from "../service/Path.Service";
import axios from "axios";

export class ReporteVentasCoralesIntermediaws {

    constructor() {
        this.pathService = new PathService();
    }

    centrologistico(sucursal, sociedad, centro, nombreCentro, tipoCentro) {
        const ws_nombre = "INTERMEDIAWS_LISTAR_CENTRO";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                //const nuevaSerUrl = "http://192.168.56.167:8080";
                const nuevaSerUrl = data.object.serCodigo.serUrl;
                const url = nuevaSerUrl + nuevaWsUrl;
                //console.log(url);
                const requestData = {
                    object: JSON.stringify({
                        sucursal: sucursal,
                        sociedad: sociedad,
                        centro: centro,
                        nombreCentro: nombreCentro,
                        tipoCentro: tipoCentro
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
                        console.error('Error ReporteVentasCoralesIntermediaws metodo centrologistico', error);
                        window.alert('Ocurrió un error: ' + error.message);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error ReporteVentasCoralesIntermediaws metodo centrologistico', error);
                window.alert('Ocurrió un error: ' + error.message);
                return null;
            });
    }

    loadVentas(numCaja, fechaInicio, fechaFin,serverseleccionado, currentPage,rowsPerPage) {
        const ws_nombre = "INTERMEDIAWS_LISTAR_CENTRO";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                //const nuevaWsUrl = data.object.wsUrl;
                //console.log(serverseleccionado)
                const nuevaWsUrl = ":18443/retailws/ws/vouchers/loadVentas";
                const nuevaSerUrl = serverseleccionado;
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
                const url = nuevaSerUrl + nuevaWsUrl;
                //console.log(url)
                const paginationInfo = {
                    count: false,
                    pagesize: rowsPerPage,
                    first: currentPage,
                    sortBy: {},
                    filterBy: {}
                  };
                //console.log(url);
                const requestData = {
                    object: JSON.stringify({
                        numCaja: numCaja,
                        fechaInicio: fechaInicio,
                        fechaFin: fechaFin,
                        lazyInfo: JSON.stringify(paginationInfo)
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
                        ///console.log(objectData);
                        return objectData;

                    })
                    .catch((error) => {
                        console.error('Error ReporteVentasCoralesIntermediaws metodo centrologistico', error);
                        window.alert('Ocurrió un error: ' + error.message);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error ReporteVentasCoralesIntermediaws metodo centrologistico', error);
                window.alert('Ocurrió un error: ' + error.message);
                return null;
            });
    }


    loadVentasPaginacion(numCaja, fechaInicio, fechaFin,serverseleccionado) {
        const ws_nombre = "INTERMEDIAWS_LISTAR_CENTRO";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                //const nuevaWsUrl = data.object.wsUrl;
                const nuevaWsUrl = ":18443/retailws/ws/vouchers/loadVentas";
                const nuevaSerUrl = serverseleccionado;
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
                const url = nuevaSerUrl + nuevaWsUrl;
                const paginationInfo = {
                    count: true,
                    sortBy: {},
                    filterBy: {}
                  };
                //console.log(url);
                const requestData = {
                    object: JSON.stringify({
                        numCaja: numCaja,
                        fechaInicio: fechaInicio,
                        fechaFin: fechaFin,
                        lazyInfo: JSON.stringify(paginationInfo)
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
                        console.error('Error ReporteVentasCoralesIntermediaws metodo centrologistico', error);
                        window.alert('Ocurrió un error: ' + error.message);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error ReporteVentasCoralesIntermediaws metodo centrologistico', error);
                window.alert('Ocurrió un error: ' + error.message);
                return null;
            });
    }

}