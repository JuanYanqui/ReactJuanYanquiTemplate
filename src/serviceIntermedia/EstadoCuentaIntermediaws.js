
import axios from "axios";
import { PathService } from "../service/Path.Service";
export class EstadoCuentaIntermediaws{

    constructor(){
        this.PathService = new PathService();
    }

    GetEstadoCuentas(bp, nombreCuenta, cedulaCuenta){
        const asignacion = "INTERMEDIAWS_CATEGCORAL_LIST_VISTA";
        return this.pathService.getUrl(asignacion)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://192.168.19.117:8080";

                const url = nuevaSerUrl + nuevaWsUrl;
                const requestData = {
                    object: JSON.stringify({
                        cpe_codigo_business_partner: bp,
                        cpe_nombre: nombreCuenta,
                        cpe_ruc_cedula: cedulaCuenta,
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


}