import axios from 'axios';
import { PathService } from './Path.Service';


export class ArticulosIntermediaws {

  constructor() {
    this.pathService = new PathService();
  }

  actualizaArticuloTipoAdq(tipoAdqParam, codigoParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULO_UPD_TIPO_ADQ";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.error('Error ArticulosIntermediaws metodo actualizaArticuloTipoAdq...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo actualizaArticuloTipoAdq', error);
        return null;
      });
  }

  actualizaPrecioSap(codigosParam, todoParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULOS_UPD_PRECIO_SAP";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.error('Error ArticulosIntermediaws metodo actualizaPrecioSap...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo actualizaPrecioSap', error);
        return null;
      });
  }

  actualizarCalculoPrecio(codigosParam, todoParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULOS_UPD_PRECIO_CALC";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.error('Error ArticulosIntermediaws metodo actualizarCalculoPrecio...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo actualizarCalculoPrecio', error);
        return null;
      });
  }

  actualizarCostosArticulo(codigosParam) {
    const ws_nombre = "INTERMEDIAWS_ACTUALIZA_COSTOS_ARTICULOS";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.error('Error ArticulosIntermediaws metodo actualizarCostosArticulo...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo actualizarCostosArticulo', error);
        return null;
      });
  }

  actualizarCostosArticuloAll() {
    const ws_nombre = "INTERMEDIAWS_ACTUALIZA_COSTOS_ARTICULOS_ALL";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
        const url = nuevaSerUrl + nuevaWsUrl;
        return axios
          .post(url, "", {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            return null;
          })
          .catch((error) => {
            console.error('Error ArticulosIntermediaws metodo actualizarCostosArticuloAll...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo actualizarCostosArticuloAll', error);
        return null;
      });
  }

  getArticuloPresentacion(codigoParam, unidadParam, codigosParam) {
    const ws_nombre = "INTERMEDIAWS_GET_ARTICULO_PRESENTACION";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.error('Error ArticulosIntermediaws metodo getArticuloPresentacion...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo getArticuloPresentacion', error);
        return null;
      });
  }

  getArticuloUltimoCostoTransito(codigoParam, sociedadParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULO_ULTIMO_COSTO_TRANSITO";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.error('Error ArticulosIntermediaws metodo getArticuloUltimoCostoTransito...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo getArticuloUltimoCostoTransito', error);
        return null;
      });
  }

  getArticulos(codigoParam, codigosParam) {
    const ws_nombre = "INTERMEDIAWS_GET_ARTICULOS";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.error('Error ArticulosIntermediaws metodo getArticulos...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo getArticulos', error);
        return null;
      });
  }

  getArticulosByJerarquia(codigoParam, nombreParam, jerarquiaParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULOS_BY_JERARQUIA";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.error('Error ArticulosIntermediaws metodo getArticulosByJerarquia...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo getArticulosByJerarquia', error);
        return null;
      });
  }

  getTArticuloBarra(barraParam, soloActivoParam) {
    const ws_nombre = "INTERMEDIAWS_GET_ARTICULO_BARRA";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.log("getTArticuloBarra",response);
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error ArticulosIntermediaws metodo getTArticuloBarra...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo getTArticuloBarra', error);
        return null;
      });
  }

  listarArticuloAllBarra(codigoParam, sociedadParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULO_ALL_BARRA";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.log(response);
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error ArticulosIntermediaws metodo listarArticuloAllBarra...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo listarArticuloAllBarra', error);
        return null;
      });
  }

  listarArticuloBodegas(codigoParam, tiendaParam, sociedadParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULO_BODEGAS";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.log(response);
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error ArticulosIntermediaws metodo listarArticuloBodegas...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo listarArticuloBodegas', error);
        return null;
      });
  }

  listarArticuloHistoriCostos(codigoParam, centroParam, almacenParam, sociedadParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULO_HISTORICO_COSTOS";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.error('Error ArticulosIntermediaws metodo listarArticuloHistoriCostos...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo listarArticuloHistoriCostos', error);
        return null;
      });
  }

  listarArticuloHistoriCostosXAnio(codigoParam, sociedadParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULO_HISTORICO_COSTOS_XANIO";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.error('Error ArticulosIntermediaws metodo listarArticuloHistoriCostosXAnio...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo listarArticuloHistoriCostosXAnio', error);
        return null;
      });
  }

  listarArticuloPresentacion(codigoParam, sociedadParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULO_PRESENTACION";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.error('Error ArticulosIntermediaws metodo listarArticuloPresentacion...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo listarArticuloPresentacion', error);
        return null;
      });
  }

  listarArticuloTiendas(codigoParam, sociedadParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULO_TIENDAS";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.error('Error ArticulosIntermediaws metodo listarArticuloTiendas...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo listarArticuloTiendas', error);
        return null;
      });
  }

  listarArticulosListaFull(codigoParam, presentacionParam, descripcionParam, proveedorParam, barraParam, soloActivosParam, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, soloCompraParam, soloVentaRetailParam, soloVentaMayorParam, soloTransferenciaParam, jerarquiaParam, centroParam, lazyInfoParam) {
    const ws_nombre = "INTERMEDIAWS_LISTAR_ARTICULOS_LISTA_FULL";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.log("listarArticulosListaFull", response);
            const objectData = JSON.parse(response.data.object);
            console.log(objectData);
            return objectData;
          })
          .catch((error) => {
            console.error('Error ArticulosIntermediaws metodo listarArticulosListaFull...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo listarArticulosListaFull', error);
        return null;
      });
  }

  listarArticulosPrecio(codigoParam, presentacionParam, descripcionParam, proveedorParam, barraParam, soloActivosParam, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, lazyInfoParam) {
    const ws_nombre = "INTERMEDIAWS_LISTAR_ARTICULOS_PRECIO";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.log("listarArticulosPrecio", response);
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error ArticulosIntermediaws metodo listarArticulosPrecio...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo listarArticulosPrecio', error);
        return null;
      });
  }

  listarArticulosPrecioFull(codigoParam, presentacionParam, descripcionParam, proveedorParam, barraParam, soloActivosParam, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, soloCompraParam, soloVentaRetailParam, soloVentaMayorParam, soloTransferenciaParam, jerarquiaParam, lazyInfoParam) {
    const ws_nombre = "INTERMEDIAWS_LISTAR_ARTICULOS_PRECIO_FULL";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.log("listarArticulosPrecioFull",response);
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error ArticulosIntermediaws metodo listarArticulosPrecioFull...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo listarArticulosPrecioFull', error);
        return null;
      });
  }

  listarArticulosPresentaciones(codigoParam, sociedadParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULOS_PRESENTACIONES";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.log("listarArticulosPresentaciones", response);
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error ArticulosIntermediaws metodo listarArticulosPresentaciones...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo listarArticulosPresentaciones', error);
        return null;
      });
  }

  listarArticulosSolicitudPedFull(codigoParam, presentacionParam, descripcionParam, proveedorParam, barraParam, soloActivosParam, soloPendientesParam, incluirBarrasParam, soloSinRentasParam, soloSinPreciosParam, soloCompraParam, soloVentaRetailParam, soloVentaMayorParam, soloTransferenciaParam, jerarquiaParam, centroParam, almacenParam, numPedidoParam, lazyInfoParam) {
    const ws_nombre = "INTERMEDIAWS_LISTAR_ARTICULOS_SOLICITUD_PED_FULL";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.log("listarArticulosSolicitudPedFull", response);
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error ArticulosIntermediaws metodo listarArticulosSolicitudPedFull...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo listarArticulosSolicitudPedFull', error);
        return null;
      });
  }

  listarCostoArticulo19MM(codigosParam, centroParam) {
    const ws_nombre = "INTERMEDIAWS_LISTAR_COSTO_ARTICULO_19_MM";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.error('Error ArticulosIntermediaws metodo listarCostoArticulo19MM...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo listarCostoArticulo19MM', error);
        return null;
      });
  }

  listarIndicadores(codigosParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULOS_LISTAR_INDICADORES";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.log(response);
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error ArticulosIntermediaws metodo listarIndicadores...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo listarIndicadores', error);
        return null;
      });
  }

  listarPresentacionesByJerarquia(codigosParam, jerarquiaParam, soloVentaRetailParam, soloPedidoParam, soloCompraParam, soloActivosParam) {
    const ws_nombre = "INTERMEDIAWS_ARTS_LIST_PRESENT_JERAR";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.error('Error ArticulosIntermediaws metodo listarPresentacionesByJerarquia...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo listarPresentacionesByJerarquia', error);
        return null;
      });
  }

  listarRestricciones(sociedadParam, materialParam, codBpParam, presentacionParam, centroParam, almacenParam, aplicacionParam, soloActivosParam) {
    const ws_nombre = "INTERMEDIAWS_ARTICULOS_LISTAR_RESTRICCIONES";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.error('Error ArticulosIntermediaws metodo listarRestricciones...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo listarRestricciones', error);
        return null;
      });
  }

  loadPreciosMayoreo(sociedadParam, canalParam, codigoParam, barraParam, descripcionParam, jerarquiaParam, codigosParam, conPrecioParam, conIvaParam, lazyParam) {
    const ws_nombre = "INTERMEDIA_ARTICULOS_PRECIOS_MAYOR";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.error('Error ArticulosIntermediaws metodo loadPreciosMayoreo...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo loadPreciosMayoreo', error);
        return null;
      });
  }

  obtenerArticuloCaja(codigoParam) {
    const ws_nombre = "INTERMEDIAWS_OBTENER_ARTICULO_CAJA";
    return this.pathService.getUrl(ws_nombre)
      .then((data) => {
        const nuevaWsUrl = data.object.wsUrl;
        const nuevaSerUrl = data.object.serCodigo.serUrl;
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
            console.log("obtenerArticuloCaja",response);
            const objectData = JSON.parse(response.data.object);
            return objectData;
          })
          .catch((error) => {
            console.error('Error ArticulosIntermediaws metodo obtenerArticuloCaja...!!!!', error);
            return null;
          });
      })
      .catch((error) => {
        console.error('Error ArticulosIntermediaws metodo obtenerArticuloCaja', error);
        return null;
      });
  }

}