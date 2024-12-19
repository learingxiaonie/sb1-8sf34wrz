import { defineStore } from 'pinia'
import { conversationApi } from '@/api/conversation'
import type { ConversationState } from '@/types/conversation'
import { handleApiError } from '@/utils/error-handler'

export const useConversationStore = defineStore('conversation', {
  state: (): ConversationState => ({
    conversations: [],
    currentConversation: null,
    loading: false,
    error: null,
    sendingMessage: false
  }),
  
  actions: {
    async loadConversations() {
      if (this.loading) return
      
      this.loading = true
      this.error = null
      
      try {
        this.conversations = await conversationApi.fetchConversations()
      } catch (error) {
        const handledError = handleApiError(error)
        this.error = `Failed to load conversations: ${handledError.message}`
      } finally {
        this.loading = false
      }
    },
    
    async sendMessage(content: string) {
      if (this.sendingMessage) return
      
      this.sendingMessage = true
      this.error = null
      
      try {
        if (!this.currentConversation) {
          const title = content.length > 30 
            ? `${content.slice(0, 30)}...`
            : content
            
          this.currentConversation = await conversationApi.createConversation(title)
        }
        
        const message = await conversationApi.sendMessage(
          this.currentConversation.id,
          content
        )
        
        if (!this.currentConversation.messages) {
          this.currentConversation.messages = []
        }
        
        this.currentConversation.messages.push(message)
      } catch (error) {
        const handledError = handleApiError(error)
        this.error = `Failed to send message: ${handledError.message}`
        throw error // Re-throw to handle in the component
      } finally {
        this.sendingMessage = false
      }
    },
    
    clearError() {
      this.error = null
    },
    
    resetState() {
      this.$reset()
    }
  },
  
  getters: {
    currentMessages: (state) => state.currentConversation?.messages || [],
    isLoading: (state) => state.loading || state.sendingMessage,
    hasError: (state) => state.error !== null,
    canSendMessage: (state) => !state.sendingMessage && !state.loading
  }
})