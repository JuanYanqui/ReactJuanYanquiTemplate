import axios from 'axios';

export class ArticulosService {

  PostListaArticulos() {
    const url = 'http://192.168.200.24:8080/intermediaws/ws/articulos/listarArticulosListaFull';
    const requestData = {
      object: JSON.stringify({
        codigo: "",
        incluirBarras: false,
        soloVentaRetail: false,
        soloVentaMayor: false,
        soloTransferencia: true,
        soloActivos: true,
        soloPendientes: false,
        soloSinRentas: false,
        soloSinPrecios: false,
        soloCompra: false
      }),
      rowCount: 0
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
        console.error('Error al obtener datos de la articulos', error);
        return null;
      });
  }

  
}