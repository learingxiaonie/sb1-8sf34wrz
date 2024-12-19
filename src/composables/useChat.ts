import { ref, computed } from 'vue'
import { useConversationStore } from '@/stores/conversation'
import { storeToRefs } from 'pinia'

export function useChat() {
  const store = useConversationStore()
  const { currentMessages, isLoading, error } = storeToRefs(store)
  const message = ref('')
  const retryQueue = ref<string[]>([])
  
  const sendMessage = async () => {
    const content = message.value.trim()
    if (!content || isLoading.value) return
    
    message.value = '' // Clear input immediately for better UX
    
    try {
      await store.sendMessage(content)
    } catch (error) {
      // Add failed message to retry queue
      retryQueue.value.push(content)
    }
  }
  
  const retryFailedMessage = async (index: number) => {
    if (index >= retryQueue.value.length) return
    
    const content = retryQueue.value[index]
    retryQueue.value.splice(index, 1)
    
    try {
      await store.sendMessage(content)
    } catch {
      // If retry fails, add back to queue
      retryQueue.value.push(content)
    }
  }
  
  const clearError = () => {
    store.clearError()
  }

  return {
    message,
    sendMessage,
    retryFailedMessage,
    messages: currentMessages,
    isLoading,
    error,
    clearError,
    hasRetries: computed(() => retryQueue.value.length > 0),
    retryQueue: computed(() => retryQueue.value)
  }
}