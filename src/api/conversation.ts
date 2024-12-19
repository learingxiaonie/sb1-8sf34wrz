import { api, getErrorMessage } from '@/utils/api'
import type { Conversation, Message } from '@/types/conversation'

export const conversationApi = {
  async fetchConversations(): Promise<Conversation[]> {
    try {
      const response = await api.get('/conversations/')
      return response.data
    } catch (error) {
      throw getErrorMessage(error)
    }
  },

  async createConversation(title: string): Promise<Conversation> {
    try {
      const response = await api.post('/conversations/', { title })
      return response.data
    } catch (error) {
      throw getErrorMessage(error)
    }
  },

  async sendMessage(conversationId: number, content: string): Promise<Message> {
    try {
      const response = await api.post(
        `/conversations/${conversationId}/chat/`,
        { message: content }
      )
      return response.data.message
    } catch (error) {
      throw getErrorMessage(error)
    }
  }
}