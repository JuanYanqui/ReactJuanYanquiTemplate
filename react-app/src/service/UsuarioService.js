import axios from 'axios';
import { PathService } from './Path.Service';

export class UsuarioService {

  constructor() {
    this.pathService = new PathService();
  }

  GetMenuUsuarioIngreso(usuario) {
    const url = `http://192.168.200.70:8081/https://wsgo.gerardoortiz.com/ApiJavadb/menuUsuario/menuAllUser?userId=${usuario}&app=APP`;
    return axios.get(url)
      .then((res) => {
        const userData = res.data;
        return userData;
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        throw error;
      });
  }


  PostUsuarioIngreso(usuario) {
    const url = 'http://192.168.200.70:8081/https://wsback.gerardoortiz.com:8443/javaws/ws/usuarios/getUsuario';
    const requestData = {
      object: JSON.stringify({
        usuario: usuario
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
        console.error('Error en el nuevo método', error);
        return null;
      });
  }

}