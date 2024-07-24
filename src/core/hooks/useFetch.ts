/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react'
import axios, { AxiosRequestConfig, Method } from 'axios'
import useAuthStore from 'core/store/useAuthStore'
import Cookies from 'js-cookie'
import { AuthConfig } from 'core/config/auth'

interface FetchState<T> {
  data: T | null
  isLoading: boolean
  error: string | null
}

export function useFetch<T>(
  endpoint: string,
  method: Method,
  requestData?: any
): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { token, login, logout } = useAuthStore((state) => ({
    token: state.token,
    login: state.login,
    logout: state.logout
  }))

  const baseUrl = import.meta.env.VITE_API_BASE_URL

  const refreshToken = useCallback(async () => {
    try {
      const response = await axios.post(
        `${baseUrl}${AuthConfig.refreshTokenUrl}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      const newToken = response.data.token
      const user = JSON.parse(Cookies.get('user') || '{}')
      login(newToken, user)
      return newToken
    } catch (error) {
      logout()
      throw new Error('Failed to refresh token')
    }
  }, [baseUrl, token, login, logout])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (!token) {
          throw new Error('No authentication token found')
        }

        const config: AxiosRequestConfig = {
          url: `${baseUrl}${endpoint}`,
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          data: requestData
        }

        let response = await axios(config)

        if (response.status === 401) {
          const newToken = await refreshToken()
          config.headers!.Authorization = `Bearer ${newToken}`
          response = await axios(config)
        }

        setData(response.data)
      } catch (error: any) {
        setError(error.message || 'Failed to fetch')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [baseUrl, endpoint, method, requestData, token, refreshToken])

  return { data, isLoading, error }
}
