import React, { useEffect, useState } from 'react';
import App from '../App';
import { sassNull } from 'sass';
import LazyLoadDemo from '../components/Dashboard';

const CategoriaCoralService = () => {

      const [CategoriaCoralData, setCategoriaCoralData] = useState(null);

      //////////PETICION POST//////////////////////
      useEffect(() => {
        fetchUserData2();
      }, []);

      const fetchUserData2 = () => {
        const url = 'http://192.168.200.24:8080/intermediaws/ws/categoriascoral/listarCategoriasCoralVista';
        const body = {
          object: JSON.stringify({
            codigo: "",
            descripcion: "",
            nivel: null 
          }),
          rowCount: 0
        };
      
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
          .then(response => response.json())
          .then(data => {
            setCategoriaCoralData(data);
            console.log(data);
          })
          .catch(error => {
            console.error('Error al obtener datos de la categoría', error);
          });
      };
  
      //////MANDA EL OBJETO A LA SIGUIENTE VENTANA JS ////////////
      return (
        <>
          {CategoriaCoralData && <LazyLoadDemo CategoriaCoralData={CategoriaCoralData} />},
        </>
      );
  
    }

export default CategoriaCoralService;
