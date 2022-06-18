import { API_URL, QUERY_KEY } from 'src/constants';
import axios from 'src/utils/axios';
import { treeShakeObject } from 'src/utils/common';
import { generateHash } from 'src/utils/crypto';

const getById = async (id: string): Promise<User> => {
  const { data } = await axios.get(`${API_URL.PROFILE}/id/${id}`);
  return data;
};

const getByCompanyId = (id: string) =>
  axios.get(`${API_URL.PROFILE}/get_by_company/${id}`);

const getUsers = async (): Promise<CCQueryResponse<User>> => {
  const { data } = await axios.get(API_URL.PROFILE);
  return data;
};

const createUser = async (
  companyId: string,
  email: string,
  password: string,
  lastname: string,
  firstname: string,
  language: string
) => {
  const { data } = await axios.post(API_URL.PROFILE, {
    uid: generateHash(),
    companyId,
    email,
    password,
    lastname,
    firstname,
    language,
    roles: [3]
  });
  return data;
};

const inviteUser = async (
  inviterName: string,
  companyName: string,
  userEmail: string,
  password: string
) => {
  const { data } = await axios.post(`${API_URL.PROFILE}/invite`, {
    inviterName,
    companyName,
    userEmail,
    password
  });
  return data;
};

const resendInvitation = async (
  email: string
): Promise<CCQueryResponse<any>> => {
  const { data } = await axios.post(`${API_URL.PROFILE}/invite/${email}`, {});
  return data;
};

const updateUser = async (
  original: User,
  changes: Partial<User>
): Promise<CCQueryResponse<User>> => {
  const { data } = await axios.put(API_URL.PROFILE, {
    ...treeShakeObject(original),
    ...changes
  });
  return data;
};

const deleteUser = async (uid: string): Promise<CCQueryResponse<any>> => {
  const { data } = await axios.delete(`${API_URL.PROFILE}/${uid}`);
  return data;
};

const deleteUsers = (ids: string[]) =>
  axios.delete('/users', {
    data: {
      ItemList: ids
    }
  });

const getUserExternal = async (
  id: string,
  token: string
): Promise<CCQueryResponse<User>> => {
  const { data } = await axios.get(`${API_URL.PROFILE}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export default {
  getById,
  getByCompanyId,
  getUsers,
  createUser,
  inviteUser,
  updateUser,
  deleteUser,
  deleteUsers,
  resendInvitation,
  getUserExternal
};
