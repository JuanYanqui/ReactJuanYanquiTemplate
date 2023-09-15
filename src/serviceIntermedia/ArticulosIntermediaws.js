import axios from 'axios';
import { PathService } from '../service/Path.Service';


export class ArticulosIntermediaws {

  constructor() {
    this.pathService = new PathService();
  }

  actualizaArticuloTipoAdq(tipoAdqParam, codigoParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULO_UPD_TIPO_ADQ";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            tipoAdq: tipoAdqParam,
            codigo: codigoParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            return null;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo actualizaArticuloTipoAdq', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo actualizaArticuloTipoAdq', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  actualizaPrecioSap(codigosParam, todoParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULOS_UPD_PRECIO_SAP";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigos: codigosParam,
            todo: todoParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            return null;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo actualizaPrecioSap', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo actualizaPrecioSap', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  actualizarCalculoPrecio(codigosParam, todoParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULOS_UPD_PRECIO_CALC";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigos: codigosParam,
            todo: todoParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            return null;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo actualizarCalculoPrecio', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo actualizarCalculoPrecio', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  actualizarCostosArticulo(codigosParam) {
    const ws_nombre = "INTERMEDIAWS_ACTUALIZA_COSTOS_ARTICULOS";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigos: codigosParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            return null;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo actualizarCostosArticulo', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo actualizarCostosArticulo', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  actualizarCostosArticuloAll() {
    const ws_nombre = "INTERMEDIAWS_ACTUALIZA_COSTOS_ARTICULOS_ALL";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        return axios
          .post(url, "", {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            ////console.log("actualizarCostosArticuloAll");
            return null;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo actualizarCostosArticuloAll', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo actualizarCostosArticuloAll', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  getArticuloPresentacion(codigoParam, unidadParam, codigosParam) {
    const ws_nombre = "INTERMEDIAWS_GET_ARTICULO_PRESENTACION";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigo: codigoParam,
            unidad: unidadParam,
            codigos: codigosParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo getArticuloPresentacion', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo getArticuloPresentacion', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  getArticuloUltimoCostoTransito(codigoParam, sociedadParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULO_ULTIMO_COSTO_TRANSITO";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigo: codigoParam,
            sociedad: sociedadParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo getArticuloUltimoCostoTransito', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo getArticuloUltimoCostoTransito', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  getArticulos(codigoParam, codigosParam) {
    const ws_nombre = "INTERMEDIAWS_GET_ARTICULOS";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigo: codigoParam,
            codigos: codigosParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo getArticulos', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo getArticulos', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  getArticulosByJerarquia(codigoParam, nombreParam, jerarquiaParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULOS_BY_JERARQUIA";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigo: codigoParam,
            nombre: nombreParam,
            jerarquia: jerarquiaParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo getArticulosByJerarquia', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo getArticulosByJerarquia', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  getTArticuloBarra(barraParam, soloActivoParam) {
    const ws_nombre = "INTERMEDIAWS_GET_ARTICULO_BARRA";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            barra: barraParam,
            soloActivo: soloActivoParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            ////console.log("getTArticuloBarra",response);
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo getTArticuloBarra', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo getTArticuloBarra', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  listarArticuloAllBarra(codigoParam, sociedadParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULO_ALL_BARRA";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigo: codigoParam,
            sociedad: sociedadParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            ////console.log(response);
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo listarArticuloAllBarra', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo listarArticuloAllBarra', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  listarArticuloBodegas(codigoParam, tiendaParam, sociedadParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULO_BODEGAS";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigo: codigoParam,
            tienda: tiendaParam,
            sociedad: sociedadParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            ////console.log(response);
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo listarArticuloBodegas', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo listarArticuloBodegas', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  listarArticuloHistoriCostos(codigoParam, centroParam, almacenParam, sociedadParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULO_HISTORICO_COSTOS";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigo: codigoParam,
            centro: centroParam,
            almacen: almacenParam,
            sociedad: sociedadParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo listarArticuloHistoriCostos', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo listarArticuloHistoriCostos', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  listarArticuloHistoriCostosXAnio(codigoParam, sociedadParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULO_HISTORICO_COSTOS_XANIO";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigo: codigoParam,
            sociedad: sociedadParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo listarArticuloHistoriCostosXAnio', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo listarArticuloHistoriCostosXAnio', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  listarArticuloPresentacion(codigoParam, sociedadParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULO_PRESENTACION";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigo: codigoParam,
            sociedad: sociedadParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo listarArticuloPresentacion', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo listarArticuloPresentacion', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  listarArticuloTiendas(codigoParam, sociedadParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULO_TIENDAS";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigo: codigoParam,
            sociedad: sociedadParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo listarArticuloTiendas', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo listarArticuloTiendas', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  listarArticulosListaFull(codigoParam, presentacionParam, descripcionParam, proveedorParam, barraParam, soloActivosParam, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, soloCompraParam, soloVentaRetailParam, jerarquiaParam, currentPage, rowsPerPage) {
    const ws_nombre = "INTERMEDIAWS_LISTAR_ARTICULOS_LISTA_FULL";
    ////console.log("hola",currentPage);
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        //const nuevaSerUrl = "http://wssap.gerardoortiz.com";
        const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const paginationInfo = {
          count: false,
          pagesize: rowsPerPage,
          first: currentPage,
          sortBy: {},
          filterBy: {}
        };

        const requestData = {
          object: JSON.stringify({
            codigo: codigoParam,
            presentacion: presentacionParam,
            descripcion: descripcionParam,
            proveedor: proveedorParam,
            barra: barraParam,
            soloActivos: soloActivosParam,
            soloPendientes: soloPendientesParam,
            incluirBarras: incluirBarrasParam,
            soloSinRentas: soloSinRentasParam,
            soloSinPrecios: soloSinPreciosParam,
            soloCompra: soloCompraParam,
            soloVentaRetail: soloVentaRetailParam,
            jerarquia: jerarquiaParam,
            lazyInfo: JSON.stringify(paginationInfo)
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            // //console.log("listarArticulosListaFull", response);
            const objectData = JSON.parse(response.data.object);
            ////console.log(objectData);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo listarArticulosListaFull', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo listarArticulosListaFull', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  PaginacionlistarArticulosListaFull(codigoParam, presentacionParam, descripcionParam, proveedorParam, barraParam, soloActivosParam, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, soloCompraParam, soloVentaRetailParam, jerarquiaParam, currentPage, rowsPerPage) {
    const ws_nombre = "INTERMEDIAWS_LISTAR_ARTICULOS_LISTA_FULL";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        //const nuevaSerUrl = "http://192.168.56.167:8080";
        const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const paginationInfo = {
          count: true,
          pagesize: rowsPerPage,
          first: currentPage,
          sortBy: {},
          filterBy: {}
        };
        const requestData = {
          object: JSON.stringify({
            codigo: codigoParam,
            presentacion: presentacionParam,
            descripcion: descripcionParam,
            proveedor: proveedorParam,
            barra: barraParam,
            soloActivos: soloActivosParam,
            soloPendientes: soloPendientesParam,
            incluirBarras: incluirBarrasParam,
            soloSinRentas: soloSinRentasParam,
            soloSinPrecios: soloSinPreciosParam,
            soloCompra: soloCompraParam,
            soloVentaRetail: soloVentaRetailParam,
            jerarquia: jerarquiaParam,
            lazyInfo: JSON.stringify(paginationInfo)
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            ////console.log("listarArticulosListaFull", response);
            const objectData = JSON.parse(response.data.object);
            ////console.log(objectData);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo PaginacionlistarArticulosListaFull', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo PaginacionlistarArticulosListaFull', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  listarArticulosPrecio(codigoParam, presentacionParam, descripcionParam, proveedorParam, barraParam, soloActivosParam, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, lazyInfoParam) {
    const ws_nombre = "INTERMEDIAWS_LISTAR_ARTICULOS_PRECIO";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigo: codigoParam,
            presentacion: presentacionParam,
            descripcion: descripcionParam,
            proveedor: proveedorParam,
            barra: barraParam,
            soloActivos: soloActivosParam,
            soloPendientes: soloPendientesParam,
            incluirBarras: incluirBarrasParam,
            soloSinRentas: soloSinRentasParam,
            soloSinPrecios: soloSinPreciosParam,
            lazyInfo: lazyInfoParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            ////console.log("listarArticulosPrecio", response);
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo listarArticulosPrecio', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo listarArticulosPrecio', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  listarArticulosPrecioFull(codigoParam, presentacionParam, descripcionParam, proveedorParam, barraParam, soloActivosParam, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, soloCompraParam, soloVentaRetailParam, soloVentaMayorParam, soloTransferenciaParam, jerarquiaParam, lazyInfoParam) {
    const ws_nombre = "INTERMEDIAWS_LISTAR_ARTICULOS_PRECIO_FULL";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigo: codigoParam,
            presentacion: presentacionParam,
            descripcion: descripcionParam,
            proveedor: proveedorParam,
            barra: barraParam,
            soloActivos: soloActivosParam,
            soloPendientes: soloPendientesParam,
            incluirBarras: incluirBarrasParam,
            soloSinRentas: soloSinRentasParam,
            soloSinPrecios: soloSinPreciosParam,
            soloCompra: soloCompraParam,
            soloVentaRetail: soloVentaRetailParam,
            soloVentaMayor: soloVentaMayorParam,
            soloTransferencia: soloTransferenciaParam,
            jerarquia: jerarquiaParam,
            lazyInfo: lazyInfoParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            ////console.log("listarArticulosPrecioFull",response);
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo listarArticulosPrecioFull', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo listarArticulosPrecioFull', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  listarArticulosPresentaciones(codigoParam, sociedadParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULOS_PRESENTACIONES";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigo: codigoParam,
            sociedad: sociedadParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            //("listarArticulosPresentaciones", response);
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo listarArticulosPresentaciones', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo listarArticulosPresentaciones', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  listarArticulosSolicitudPedFull(codigoParam, presentacionParam, descripcionParam, proveedorParam, barraParam, soloActivosParam, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, soloCompraParam, soloVentaRetailParam, soloVentaMayorParam, soloTransferenciaParam, jerarquiaParam, centroParam, almacenParam, numPedidoParam, lazyInfoParam) {
    const ws_nombre = "INTERMEDIAWS_LISTAR_ARTICULOS_SOLICITUD_PED_FULL";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigo: codigoParam,
            presentacion: presentacionParam,
            descripcion: descripcionParam,
            proveedor: proveedorParam,
            barra: barraParam,
            soloActivos: soloActivosParam,
            soloPendientes: soloPendientesParam,
            incluirBarras: incluirBarrasParam,
            soloSinRentas: soloSinRentasParam,
            soloSinPrecios: soloSinPreciosParam,
            soloCompra: soloCompraParam,
            soloVentaRetail: soloVentaRetailParam,
            soloVentaMayor: soloVentaMayorParam,
            soloTransferencia: soloTransferenciaParam,
            jerarquia: jerarquiaParam,
            centro: centroParam,
            almacen: almacenParam,
            numPedido: numPedidoParam,
            lazyInfo: lazyInfoParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            ////console.log("listarArticulosSolicitudPedFull", response);
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo listarArticulosSolicitudPedFull', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo listarArticulosSolicitudPedFull', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  listarCostoArticulo19MM(codigosParam, centroParam) {
    const ws_nombre = "INTERMEDIAWS_LISTAR_COSTO_ARTICULO_19_MM";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigos: codigosParam,
            centro: centroParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo listarCostoArticulo19MM', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo listarCostoArticulo19MM', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  listarIndicadores(codigosParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULOS_LISTAR_INDICADORES";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigos: codigosParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            ////console.log(response);
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo listarIndicadores', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo listarIndicadores', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  listarPresentacionesByJerarquia(codigosParam, jerarquiaParam, soloVentaRetailParam, soloPedidoParam, soloCompraParam, soloActivosParam) {
    const ws_nombre = "INTERMEDIAWS_ARTS_LIST_PRESENT_JERAR";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigos: codigosParam,
            jerarquia: jerarquiaParam,
            soloVentaRetail: soloVentaRetailParam,
            soloPedido: soloPedidoParam,
            soloCompra: soloCompraParam,
            soloActivos: soloActivosParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo listarPresentacionesByJerarquia', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo listarPresentacionesByJerarquia', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  listarRestricciones(sociedadParam, materialParam, codBpParam, presentacionParam, centroParam, almacenParam, aplicacionParam, soloActivosParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULOS_LISTAR_RESTRICCIONES";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            sociedad: sociedadParam,
            material: materialParam,
            codBp: codBpParam,
            presentacion: presentacionParam,
            centro: centroParam,
            almacen: almacenParam,
            aplicacion: aplicacionParam,
            soloActivos: soloActivosParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo listarRestricciones', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo listarRestricciones', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  loadPreciosMayoreo(sociedadParam, canalParam, codigoParam, barraParam, descripcionParam, jerarquiaParam, codigosParam, conPrecioParam, conIvaParam, lazyParam) {
    const ws_nombre = "INTERMEDIA_ARTICULOS_PRECIOS_MAYOR";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        //const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            sociedad: sociedadParam,
            canal: canalParam,
            codigo: codigoParam,
            barra: barraParam,
            descripcion: descripcionParam,
            jerarquia: jerarquiaParam,
            codigos: codigosParam,
            conPrecio: conPrecioParam,
            conIva: conIvaParam,
            lazy: lazyParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo loadPreciosMayoreo', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo loadPreciosMayoreo', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

  obtenerArticuloCaja(codigoParam) {
    const ws_nombre = "INTERMEDIAWS_OBTENER_ARTICULO_CAJA";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = "http://192.168.56.167:8080";
        const url = nuevaSerUrl + nuevaWsUrl;
        const requestData = {
          object: JSON.stringify({
            codigo: codigoParam
          }),
          rowCount: 0,
        };
        return axios
          .post(url, requestData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            ////console.log("obtenerArticuloCaja",response);
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error EstadosCuentaIntermediaws metodo obtenerArticuloCaja', error);
            window.alert('Ocurrió un error: ' + error.message);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error EstadosCuentaIntermediaws metodo obtenerArticuloCaja', error);
        window.alert('Ocurrió un error: ' + error.message);
        return null;
      });
  }

}