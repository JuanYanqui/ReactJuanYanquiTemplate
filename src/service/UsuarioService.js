import axios from 'axios';
import { PathService } from './Path.Service';
import React, { useState } from 'react';
import App from '../App';

export class UsuarioService {

  constructor() {
    this.pathService = new PathService();
  }

  MenuUsuario(usuario) {
    const url = `http://wsgo.gerardoortiz.com/ApiJavadb/menuUsuario/menuAllUser?userId=${usuario}&app=APP`;
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


  PostUsuario(usuario) {
    const url = 'http://192.168.200.24:8080/javaws/ws/usuarios/getUsuario';
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

