
import { PathService } from "../service/Path.Service";
import axios from "axios";

export class GestionPropuestasIntermediaws {

    constructor() {
        this.pathService = new PathService();
    }

    resumenPropuestas(fecha) {
        const ws_nombre = "INTERMEDIAWS_SOLPED_RESUMEN";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://192.168.56.167:8080";
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
                const url = nuevaSerUrl + nuevaWsUrl;
                //console.log(url);
                const requestData = {
                    object: JSON.stringify({
                        fecha: fecha
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
                        console.log(response)
                        return objectData;

                    })
                    .catch((error) => {
                        console.error('Error GestionPropuestasIntermediaws metodo resumenPropuestas', error);
                        window.alert('Ocurrió un error: ' + error.message);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error GestionPropuestasIntermediaws metodo resumenPropuestas', error);
                window.alert('Ocurrió un error: ' + error.message);
                return null;
            });
    }


    descargarPropuestasService(fecha, usuario, ip) {
        const ws_nombre = "INTERMEDIAWS_SOLPED_DOWNLOAD_PROPUESTAS";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://192.168.56.167:8080";
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
                const url = nuevaSerUrl + nuevaWsUrl;
                //console.log(url);
                const requestData = {
                    object: JSON.stringify({
                        fecha: fecha,
                        usuario: usuario,
                        ip: ip,
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
                        console.error('Error GestionPropuestasIntermediaws metodo descargarPropuestasService', error);
                        window.alert('Ocurrió un error: ' + error.message);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error GestionPropuestasIntermediaws metodo descargarPropuestasService', error);
                window.alert('Ocurrió un error: ' + error.message);
                return null;
            });
    }

    forzarValidacion(fecha, centro, usuario, ip) {
        const ws_nombre = "INTERMEDIAWS_SOLPED_FORZAR_VALIDACION";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://192.168.56.167:8080";
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
                const url = nuevaSerUrl + nuevaWsUrl;
                //console.log(url);
                const requestData = {
                    object: JSON.stringify({
                        fecha: fecha,
                        centro : centro,
                        usuario: usuario,
                        ip: ip,
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
                        console.error('Error GestionPropuestasIntermediaws metodo forzarValidacion', error);
                        window.alert('Ocurrió un error: ' + error.message);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error GestionPropuestasIntermediaws metodo forzarValidacion', error);
                window.alert('Ocurrió un error: ' + error.message);
                return null;
            });
    }


    
    forzarPreaprobacion(fecha, centro, usuario, ip) {
        const ws_nombre = "INTERMEDIAWS_SOLPED_FORZAR_PREAPROBACION";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://192.168.56.167:8080";
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
                const url = nuevaSerUrl + nuevaWsUrl;
                //console.log(url);
                const requestData = {
                    object: JSON.stringify({
                        fecha: fecha,
                        centro : centro,
                        usuario: usuario,
                        ip: ip,
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
                        console.error('Error GestionPropuestasIntermediaws metodo forzarPreaprobacion', error);
                        window.alert('Ocurrió un error: ' + error.message);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error GestionPropuestasIntermediaws metodo forzarPreaprobacion', error);
                window.alert('Ocurrió un error: ' + error.message);
                return null;
            });
    }

    forzarAprobacion(fecha, centro, usuario, ip) {
        const ws_nombre = "INTERMEDIAWS_SOLPED_FORZAR_APROBACION";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://192.168.56.167:8080";
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
                const url = nuevaSerUrl + nuevaWsUrl;
                //console.log(url);
                const requestData = {
                    object: JSON.stringify({
                        fecha: fecha,
                        centro : centro,
                        usuario: usuario,
                        ip: ip,
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
                        console.error('Error GestionPropuestasIntermediaws metodo forzarAprobacion', error);
                        window.alert('Ocurrió un error: ' + error.message);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error GestionPropuestasIntermediaws metodo forzarAprobacion', error);
                window.alert('Ocurrió un error: ' + error.message);
                return null;
            });
    }

    forzarEnvio(fecha, centro, usuario, ip) {
        const ws_nombre = "INTERMEDIAWS_SOLPED_FORZAR_ENVIO";
        return this.pathService.getUrl(ws_nombre)
            .then((data) => {
                const nuevaWsUrl = data.object.wsUrl;
                const nuevaSerUrl = "http://192.168.56.167:8080";
                //const nuevaSerUrl = data.object.serCodigo.serUrl;
                const url = nuevaSerUrl + nuevaWsUrl;
                //console.log(url);
                const requestData = {
                    object: JSON.stringify({
                        fecha: fecha,
                        centro : centro,
                        usuario: usuario,
                        ip: ip,
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
                        console.error('Error GestionPropuestasIntermediaws metodo forzarEnvio', error);
                        window.alert('Ocurrió un error: ' + error.message);
                        return null;
                    });
            })
            .catch((error) => {
                console.error('Error GestionPropuestasIntermediaws metodo forzarEnvio', error);
                window.alert('Ocurrió un error: ' + error.message);
                return null;
            });
    }

    
}