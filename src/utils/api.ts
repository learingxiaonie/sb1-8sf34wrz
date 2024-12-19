import axios, { AxiosError } from 'axios'
import type { ApiError } from '@/types/conversation'

const API_BASE_URL = 'http://localhost:8000/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export function isNetworkError(error: unknown): boolean {
  return error instanceof AxiosError && !error.response
}

export function getErrorMessage(error: unknown): ApiError {
  if (isNetworkError(error)) {
    return {
      message: 'Network connection error. Please check your internet connection.',
      code: 'NETWORK_ERROR'
    }
  }
  
  if (error instanceof AxiosError && error.response) {
    return {
      message: error.response.data?.message || 'Server error occurred',
      code: 'SERVER_ERROR',
      status: error.response.status
    }
  }
  
  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR'
  }
}