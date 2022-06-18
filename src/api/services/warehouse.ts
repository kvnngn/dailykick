import { API_URL } from 'src/constants';
import axios from 'src/utils/axios';
import { treeShakeObject } from 'src/utils/common';

const getById = async (id: string): Promise<Warehouse> => {
  const { data } = await axios.get(`${API_URL.WAREHOUSE}/id/${id}`);
  return data;
};

const getWarehouses = async (): Promise<CCQueryResponse<Warehouse>> => {
  const { data } = await axios.get(API_URL.WAREHOUSE);
  return data;
};

const createWarehouse = async (nom: string, createdBy: string) => {
  const { data } = await axios.post(API_URL.WAREHOUSE, {
    nom,
    createdBy
  });
  return data;
};

const updateWarehouse = async (
  original: Warehouse,
  changes: Partial<Warehouse>
): Promise<CCQueryResponse<Warehouse>> => {
  const { data } = await axios.put(API_URL.WAREHOUSE, {
    ...treeShakeObject(original),
    ...changes
  });
  return data;
};

const deleteWarehouse = async (uid: string): Promise<CCQueryResponse<any>> => {
  const { data } = await axios.delete(`${API_URL.WAREHOUSE}/${uid}`);
  return data;
};

const deleteWarehouses = (ids: string[]) =>
  axios.delete('/users', {
    data: {
      ItemList: ids
    }
  });

export default {
  getById,
  getWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  deleteWarehouses
};
