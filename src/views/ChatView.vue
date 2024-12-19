<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import MessageList from '@/components/chat/MessageList.vue'
import MessageInput from '@/components/chat/MessageInput.vue'
import { useChat } from '@/composables/useChat'
import { useConversationStore } from '@/stores/conversation'

const store = useConversationStore()
const { 
  message, 
  sendMessage, 
  messages, 
  isLoading, 
  error, 
  clearError,
  hasRetries,
  retryQueue,
  retryFailedMessage
} = useChat()

onMounted(() => {
  store.loadConversations()
})

onUnmounted(() => {
  store.resetState()
})
</script>

<template>
  <div class="chat-container">
    <el-alert
      v-if="error"
      :title="error"
      type="error"
      show-icon
      closable
      @close="clearError"
    />
    
    <el-alert
      v-if="hasRetries"
      type="warning"
      show-icon
      :closable="false"
    >
      <template #title>
        Some messages failed to send
        <el-button 
          type="primary" 
          link 
          @click="retryFailedMessage(0)"
        >
          Retry
        </el-button>
      </template>
    </el-alert>
    
    <MessageList :messages="messages" />
    
    <MessageInput
      v-model="message"
      :disabled="isLoading"
      :loading="isLoading"
      @send="sendMessage"
    />
  </div>
</template>

<style scoped>
.chat-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>