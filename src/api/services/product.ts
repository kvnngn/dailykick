import { API_URL } from 'src/constants';
import { parseContentRange } from 'src/utils';
import axios from 'src/utils/axios';
import { treeShakeObject } from 'src/utils/common';

const getProduct = async (id: string): Promise<Product> => {
  const { data } = await axios.get(`${API_URL.PRODUCT}/id/${id}`);
  return data;
};

const getProducts: PaginatedAxios<
  WithContentRange<
    CCQueryResponse<
      Product,
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
  const { headers, data } = await axios.get(`${API_URL.PRODUCT}`, {
    params: {
      skip,
      limit,
      filter,
      sort
    }
  });
  return { headers: parseContentRange(headers), body: data };
};

const createProduct = async (
  brand: string,
  brandModel: string,
  image_urls: string[],
  colors: string[],
  createdBy: string
) => {
  const { data } = await axios.post(`${API_URL.PRODUCT}/add`, {
    brand,
    brandModel,
    image_urls,
    colors,
    createdBy
  });
  return data;
};

const updateProduct = async (
  original: Product,
  changes: Partial<Product>
): Promise<Product> => {
  const { data } = await axios.put(`${API_URL.PRODUCT}/id/${original._id}`, {
    ...treeShakeObject(original),
    ...changes
  });
  return data;
};

const deleteProduct = async (id: string): Promise<any> => {
  const { data } = await axios.delete(`${API_URL.PRODUCT}/id/${id}`);
  return data;
};

const deleteProducts = (ids: string[]) =>
  axios.delete('/users', {
    data: {
      ItemList: ids
    }
  });

export default {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProducts
};
