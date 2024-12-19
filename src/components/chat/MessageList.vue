<script setup lang="ts">
import type { Message } from '@/types/conversation'

defineProps<{
  messages: Message[]
}>()
</script>

<template>
  <div class="messages" ref="messagesContainer">
    <div v-for="msg in messages" :key="msg.id" 
         :class="['message', msg.is_user ? 'user' : 'assistant']">
      {{ msg.content }}
    </div>
  </div>
</template>

<style scoped>
.messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  margin: 10px 0;
}

.message {
  margin: 10px 0;
  padding: 10px;
  border-radius: 8px;
  max-width: 70%;
}

.user {
  background-color: var(--el-color-primary-light-9);
  margin-left: auto;
}

.assistant {
  background-color: var(--el-fill-color-light);
}
</style>