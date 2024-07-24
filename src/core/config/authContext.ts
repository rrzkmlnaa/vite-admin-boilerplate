import axios from 'axios'
import { AuthConfig } from './auth'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface AuthProps {
  type: 'login' | 'logout'
  body?: any
}

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const auth = async ({ type, body }: AuthProps) => {
  if (type === 'login') {
    if (!body) return 'Please provide body!'

    try {
      const response = await axios.post(
        `${baseUrl}${AuthConfig.loginUrl}`,
        body,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to login')
    }
  }

  return
}
