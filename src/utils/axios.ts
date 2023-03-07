/* eslint-disable no-param-reassign */
import axios from 'axios'
import { API_URL, GLOBAL } from 'src/constants'
import { isExpired } from './common'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_PROXY,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  if (
    config.url === `${API_URL.PROFILE}/tokenlogin` ||
    config.url === `${API_URL.PROFILE}/token_refresh`
  ) {
    return config
  }
  if (config.headers?.Authorization) {
    return config
  }
  const token = localStorage.getItem(GLOBAL.ACCESS_TOKEN)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (isExpired(err)) {
      localStorage.removeItem(GLOBAL.REFRESH_TOKEN_EXPIRED)
      localStorage.removeItem(GLOBAL.REFRESH_TOKEN)
      localStorage.removeItem(GLOBAL.ACCESS_TOKEN_EXPIRED)
      localStorage.removeItem(GLOBAL.ACCESS_TOKEN)
    }
    throw err
  },
)

export default axiosInstance
