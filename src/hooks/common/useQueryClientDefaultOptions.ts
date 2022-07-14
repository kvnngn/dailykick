/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQueryClient } from 'react-query'

import { useLocation, useNavigate } from 'react-router-dom'

import { useCallback, useEffect } from 'react'
import moment from 'moment'
import { GLOBAL, API_URL } from 'src/constants'
import { isExpired, decryptLocalStorage, isAxiosError } from 'src/utils'
import axios from 'src/utils/axios'
import useSnackbar from './useSnackbar'

export default () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { showErrorSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const retryHandler = useCallback(
    (failureCount: number, error: any) => {
      console.log({ error })
      if (isExpired(error)) {
        localStorage.removeItem(GLOBAL.REFRESH_TOKEN_EXPIRED)
        localStorage.removeItem(GLOBAL.REFRESH_TOKEN)
        localStorage.removeItem(GLOBAL.ACCESS_TOKEN_EXPIRED)
        localStorage.removeItem(GLOBAL.ACCESS_TOKEN)
        queryClient.cancelQueries()
        queryClient.cancelMutations()
        queryClient.clear()
        showErrorSnackbar(
          error.response.status === 403
            ? 'Invalid credentials.'
            : 'The session has expired. Please log-in again.',
        )
        navigate('/login')
      }
      return false
    },
    [queryClient, navigate, pathname],
  )
  const refreshTokenHandler = useCallback(async (data: any, error: any) => {
    if (!error) {
      const accessToken = localStorage.getItem(GLOBAL.ACCESS_TOKEN)
      const accessExpired = localStorage.getItem(GLOBAL.ACCESS_TOKEN_EXPIRED)
      const refreshToken = decryptLocalStorage(GLOBAL.REFRESH_TOKEN)
      const refreshExpired = decryptLocalStorage(GLOBAL.REFRESH_TOKEN_EXPIRED)
      if (accessToken && accessExpired && refreshToken && refreshExpired) {
        const exp = moment(Number(accessExpired) * 1000)
        if (exp.diff(moment(), 'milliseconds') < 345600000) {
          try {
            const { data: response } = await axios.post<LoginResponse>(
              `${API_URL.PROFILE}/token_refresh`,
              {
                refresh_token: refreshToken,
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            )
            if (response) {
              localStorage.setItem(GLOBAL.ACCESS_TOKEN, response.token)
              localStorage.setItem(
                GLOBAL.ACCESS_TOKEN_EXPIRED,
                response.expires.toString(),
              )
            }
          } catch (e) {
            if (isAxiosError(e) && e.message) {
              // eslint-disable-next-line default-case
              switch (e.message) {
                case 'Refresh token had expired.':
                  console.log('Refresh token expired')
              }
            }
          }
        }
      }
    }
  }, [])
  useEffect(() => {
    queryClient.setDefaultOptions({
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 60000,
        retry: retryHandler,
        // onSettled: refreshTokenHandler,
      },
      mutations: {
        retry: retryHandler,
        // onSettled: refreshTokenHandler,
      },
    })
  }, [])
}
