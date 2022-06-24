import { API_URL } from 'src/constants';
import { parseContentRange } from 'src/utils';
import axios from 'src/utils/axios';
import { treeShakeObject } from 'src/utils/common';

const getWarehouse = async (id: string): Promise<Warehouse> => {
  const { data } = await axios.get(`${API_URL.WAREHOUSE}/id/${id}`);
  return data;
};

const getWarehouses: PaginatedAxios<
  WithContentRange<
    CCQueryResponse<
      Warehouse,
      {
        offset: number;
        page: number;
        limit: number;
        searchQuery: string;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
      }
    >
  >
> = async (skip, limit, filter, sort) => {
  const { headers, data } = await axios.get(`${API_URL.WAREHOUSE}`, {
    params: {
      skip,
      limit,
      filter,
      sort
    }
  });
  return { headers: parseContentRange(headers), body: data };
};

const createWarehouse = async (name: string, createdBy: string) => {
  const { data } = await axios.post(`${API_URL.WAREHOUSE}/add`, {
    name,
    createdBy
  });
  return data;
};

const updateWarehouse = async (
  original: Warehouse,
  changes: Partial<Warehouse>
): Promise<Warehouse> => {
  const { data } = await axios.put(`${API_URL.WAREHOUSE}/id/${original._id}`, {
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
  getWarehouse,
  getWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  deleteWarehouses
};
