export interface Message {
  id: number
  content: string
  is_user: boolean
  created_at: string
}

export interface Conversation {
  id: number
  title: string
  created_at: string
  messages: Message[]
}

export interface ConversationState {
  conversations: Conversation[]
  currentConversation: Conversation | null
  loading: boolean
  error: string | null
  sendingMessage: boolean
}

export type ApiError = {
  message: string
  code: string
  status?: number
}

export enum ErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}