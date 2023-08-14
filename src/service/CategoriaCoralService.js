import React, { useEffect, useState } from 'react';
import App from '../App';
import { sassNull } from 'sass';
import Dashboard from '../components/Dashboard';

const CategoriaCoralService = () => {

      const [CategoriaCoralData, setCategoriaCoralData] = useState(null);

        const [codigo, setCodigo] = useState(localStorage.getItem('cod'));
        const [descripcion, setDescripcion] = useState(localStorage.getItem('des'));
        const [nivel, setNivel] = useState(localStorage.getItem('ni'));
  
     

        useEffect(() => {
          const handleStorageUpdate = () => {
            setCodigo(localStorage.getItem('cod'));
            setDescripcion(localStorage.getItem('des'));
            setNivel(localStorage.getItem('ni'));
            console.log("pass",codigo);
            console.log("pass",descripcion);
            console.log("pass",nivel);

          };
      
          window.addEventListener('storageUpdated', handleStorageUpdate);
      
          return () => {
            window.removeEventListener('storageUpdated', handleStorageUpdate);
          };
        }, []);
  
      //////////PETICION POST//////////////////////

      useEffect(() => {
        fetchUserData2();
      }, []);


      const fetchUserData2 = () => {
        const url = 'http://192.168.200.24:8080/intermediaws/ws/categoriascoral/listarCategoriasCoralVista';
        const body = {
          object: JSON.stringify({
            codigo: codigo,
            descripcion: descripcion,
            nivel: nivel
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
            const objectData = JSON.parse(data.object);
            setCategoriaCoralData(objectData);
            console.log(objectData);
          })
          .catch(error => {
            console.error('Error al obtener datos de la categoría', error);
          });
      };
      return <Dashboard categoriaCoralData={CategoriaCoralData} />;
  
    }

export default CategoriaCoralService;
