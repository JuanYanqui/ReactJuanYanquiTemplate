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
                console.log(url);
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

    centrologistico2(sucursal, sociedad, centro, nombreCentro, tipoCentro, urls) {
        const ws_nombre = "INTERMEDIAWS_LISTAR_CENTRO";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                //const nuevaWsUrl = data.object.wsUrl;
                const nuevaWsUrl = ":18080/retailws/ws/vouchers/loadVentas";
                const nuevaSerUrl = urls;
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
                const url = nuevaSerUrl + nuevaWsUrl;
                console.log(url);
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

}