import axios from 'axios';
import { PathService } from './Path.Service';

export class CategoriaCoralService {

  constructor() {
    this.pathService = new PathService();
  }

  PostCategoriaCoralData(cod, des, niv) {
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
              'Content-Type': 'application/json',
            },
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