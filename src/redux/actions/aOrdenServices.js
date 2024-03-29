import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Notify } from '../../utils/notify/Notify';
import { socket } from '../../utils/socket/connect';
import { LS_CancelarDeliveryDevolucion } from '../states/delivery';

export const GetOrdenServices_Date = createAsyncThunk('service_order/GetOrdenServices_Date', async (datePago) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/lava-ya/get-factura/date/${datePago}`);
    return response.data;
  } catch (error) {
    // Puedes manejar los errores aquí
    console.log(error.response.data.mensaje);
    Notify('Error', 'No se pudo obtemer la lista de Ordenes de Servicio', 'fail');
    throw new Error(error);
  }
});

export const GetOrdenServices_DateRange = createAsyncThunk(
  'service_order/GetOrdenServices_DateRange',
  async ({ dateInicio, dateFin }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/lava-ya/get-factura/date/${dateInicio}/${dateFin}`
      );

      return response.data;
    } catch (error) {
      // Puedes manejar los errores aquí
      //Notify('Error', 'No se ontemer la lista de Ordenes de Servicio', 'fail');
      console.log(error.response.data.mensaje);
      throw new Error(`No se pudo actualizar el cliente - ${error}`);
    }
  }
);

export const AddOrdenServices = createAsyncThunk(
  'service_order/AddOrdenServices',
  async ({ infoRecibo, infoDelivery, rol }) => {
    try {
      const dataSend = {
        infoRecibo,
        rol,
        ...(infoRecibo.Modalidad === 'Delivery' && { infoDelivery }),
      };
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/lava-ya/add-factura`, dataSend);

      const res = response.data;

      socket.emit('client:newOrder', res);
      const { newOrder } = res;

      return newOrder;
    } catch (error) {
      console.log(error.response.data.mensaje);
      Notify('Error', 'No se registro la Orden de Servicio', 'fail');
      throw new Error(error);
    }
  }
);

export const UpdateOrdenServices = createAsyncThunk(
  'service_order/UpdateOrdenServices',
  async ({ id, infoRecibo, rol, infoAnulacion, infoDelivery }) => {
    try {
      const dataSend = {
        infoRecibo,
        rol,
        ...(infoRecibo.estadoPrenda === 'anulado' && { infoAnulacion }),
        ...(infoRecibo.Modalidad === 'Delivery' && { infoDelivery }),
      };

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/lava-ya/update-factura/${id}`,
        dataSend
      );
      const res = response.data;

      socket.emit('client:updateOrder', res);
      const { orderUpdated } = res;

      return orderUpdated;
    } catch (error) {
      // Puedes manejar los errores aquí
      console.log(error.response.data.mensaje);
      Notify('Error', 'No se actualizo la Orden de Servicio', 'fail');
      throw new Error(error);
    }
  }
);

export const CancelEntrega_OrdenService = createAsyncThunk(
  'service_order/CancelEntrega_OrdenService',
  async ({ IdCliente, info }, { dispatch }) => {
    try {
      // Lógica para cancelar entrega en el backend
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/lava-ya/cancel-entrega/${IdCliente}`,
        info
      );

      const res = response.data;

      const { orderUpdate } = res;

      Notify('Éxito', 'Entrega y/o Pago de la Orden de Servicio cancelada correctamente', 'success');

      if ('idDeliveryDeleted' in res) {
        const { idDeliveryDeleted } = res;
        socket.emit('client:cancel-delivery', { idDeliveryDeleted, dni: orderUpdate.dni });
        dispatch(LS_CancelarDeliveryDevolucion(idDeliveryDeleted));
      }
      socket.emit('client:updateOrder', { orderUpdated: orderUpdate });

      return orderUpdate;
    } catch (error) {
      console.error('Error al cancelar entrega:', error);
      Notify('Error', 'No se pudo realizar la cancelación de la Orden de Servicio', 'fail');
      throw new Error(error);
    }
  }
);
