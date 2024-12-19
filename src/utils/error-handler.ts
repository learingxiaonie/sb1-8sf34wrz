import type { ApiError } from '@/types/conversation'
import { ErrorCode } from '@/types/conversation'
import { isNetworkError } from '@/utils/api'

export function handleApiError(error: unknown): ApiError {
  if (isNetworkError(error)) {
    return {
      message: 'Network connection error. Please check your internet connection and try again.',
      code: ErrorCode.NETWORK_ERROR
    }
  }
  
  if (error instanceof Error) {
    // Handle specific error types
    if (error.name === 'TimeoutError') {
      return {
        message: 'Request timed out. Please try again.',
        code: ErrorCode.NETWORK_ERROR
      }
    }
    
    return {
      message: error.message,
      code: ErrorCode.UNKNOWN_ERROR
    }
  }
  
  return {
    message: 'An unexpected error occurred. Please try again.',
    code: ErrorCode.UNKNOWN_ERROR
  }
}

export function isRetryableError(error: ApiError): boolean {
  return error.code === ErrorCode.NETWORK_ERROR || 
         (error.code === ErrorCode.SERVER_ERROR && error.status === 503)
}