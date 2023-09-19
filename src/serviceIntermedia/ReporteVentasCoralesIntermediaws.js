import { PathService } from "../service/Path.Service";
import axios from "axios";

export class ReporteVentasCoralesIntermediaws {

    constructor() {
        this.pathService = new PathService();
    }


    centrologistico(sucursal, sociedad, centro, nombreCentro, tipoCentro) {

        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = "http://192.168.200.24:8080/intermediaws/ws/centroslogisticos/listarCentroLogistico";
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

    }

}