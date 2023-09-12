import axios from 'axios';
import { PathService } from './Path.Service';

export class UsuarioService {

  constructor() {
    this.pathService = new PathService();
  }

  GetMenuUsuarioIngreso(usuario) {
    const url = `https://wsgo.gerardoortiz.com/ApiJavadb/menuUsuario/menuAllUser?userId=${usuario}&app=APP`;
    return axios.get(url)
      .then((res) => {
        const userData = res.data;
        return userData;
      })
      .catch((error) => {
        console.error('Error UsuarioService metodo GetMenuUsuarioIngreso', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }


  PostUsuarioIngreso(usuario) {
    const url = 'https://wsback.gerardoortiz.com:8443/javaws/ws/usuarios/getUsuario';
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
        console.error('Error UsuarioService metodo PostUsuarioIngreso', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

}

