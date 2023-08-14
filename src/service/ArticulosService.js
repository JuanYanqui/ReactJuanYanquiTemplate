import React, { useEffect, useState } from 'react';
import App from '../App';
import { sassNull } from 'sass';
import Dashboard from '../components/Dashboard';

const ArticulosService = () => {

  const [ArticuloData, setArticulosData] = useState(null);

  //////////PETICION POST//////////////////////
  useEffect(() => {
    fetchUserData2();
  }, []);


  const fetchUserData2 = () => {
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

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => response.json())
      .then(data => {
        const objectData = JSON.parse(data.object);
        setArticulosData(objectData);
        console.log(objectData);
      })
      .catch(error => {
        console.error('Error al obtener datos de la categoría', error);
      });
  };

  
  return <Dashboard articuloData={ArticuloData}/>;

}

export default ArticulosService;
