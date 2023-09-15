import { PathService } from "../service/Path.Service";
import axios from "axios";

export class VentasTargetasPosws {

    constructor() {
        this.pathService = new PathService();
    }


    ventasTargetas(centro, fecha, ptoemi) {

        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const nuevaSerUrl = "http://localhost:8080";
        const url = "http://localhost:8081/http://192.168.200.24:8080/posws/ws/vouchers/ventasTargetas";
        const requestData = {
            object: JSON.stringify({
                centro: centro,
                fecha: fecha,
                ptoemi: ptoemi
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
                console.error('Error EstadosCuentaIntermediaws metodo getPdfEf25Fi', error);
                window.alert('Ocurrió un error: ' + error.message);
                return null;
            });

    }

    generateVouchersReport(centro, sociedad) {


        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const nuevaSerUrl = "http://localhost:8081/http://192.168.56.167:8080";
        const url = "http://localhost:8080/posws/ws/vouchers/generateVouchersReport";
        const requestData = {
            object: JSON.stringify({
                centro: centro,
                sociedad: sociedad
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
                console.error('Error EstadosCuentaIntermediaws metodo getPdfEf25Fi', error);
                window.alert('Ocurrió un error: ' + error.message);
                return null;
            });
    }
}