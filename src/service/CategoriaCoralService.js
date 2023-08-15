import axios from 'axios';

export class CategoriaCoralService {
  PostCategoriaCoralData(cod, des, niv) {
    const url = 'http://192.168.200.24:8080/intermediaws/ws/categoriascoral/listarCategoriasCoralVista';
    const body = {
      object: JSON.stringify({
        codigo: cod,
        descripcion: des,
        nivel: niv,
      }),
      rowCount: 0,
    };

    return axios
      .post(url, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const objectData = JSON.parse(response.data.object);
        return objectData;
      })
      .catch((error) => {
        console.error('Error al obtener datos de la categoría', error);
        return null;
      });
  }
}