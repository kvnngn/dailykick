import { API_URL, QUERY_KEY } from 'src/constants';
import axios from 'src/utils/axios';

const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const { data } = await axios.post(`${API_URL.AUTH}/login`, {
    email,
    password
  });
  return data;
};

const register = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
): Promise<LoginResponse> => {
  const { data } = await axios.post(`${API_URL.AUTH}/register`, {
    firstname,
    lastname,
    email,
    password
  });
  return data;
};

const loginWithToken = async (token: string): Promise<LoginResponse> => {
  const { data } = await axios.post(
    `${API_URL.PROFILE}/tokenlogin`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return data;
};

const resetPassword = async (email: string) => {
  const { data } = await axios.post(`${API_URL.PROFILE}/resetpw/${email}`);
  return data;
};

const updatePassword = async (token: string, password: string) => {
  const { data } = await axios.post(`${API_URL.PROFILE}/updatepw/${token}`, {
    password
  });
  return data;
};

const resendVerification = async (email: string) => {
  const { data } = await axios.post(
    `${API_URL.PROFILE}/send_verification/${email}`
  );
  return data;
};

export default {
  login,
  register,
  loginWithToken,
  resetPassword,
  updatePassword,
  resendVerification
};
