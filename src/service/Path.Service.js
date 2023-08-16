import axios from 'axios';

export class PathService {

    getUrl(asignacion) {
        const url = `http://wssap.gerardoortiz.com/ApiJavadb/configuraciones/getByCodigo/${asignacion}`;
        return axios.get(url).then((res) => res.data);
    }


}




