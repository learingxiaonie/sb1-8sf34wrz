<script setup lang="ts">
defineProps<{
  modelValue: string
  disabled?: boolean
  loading?: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'send'): void
}>()
</script>

<template>
  <div class="input-area">
    <el-input
      :model-value="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      type="textarea"
      :rows="3"
      :disabled="disabled"
      placeholder="Type your message here..."
      @keyup.enter.exact="$emit('send')"
    />
    <el-button 
      type="primary" 
      :loading="loading"
      @click="$emit('send')"
    >
      Send
    </el-button>
  </div>
</template>

<style scoped>
.input-area {
  padding: 20px;
  border-top: 1px solid var(--el-border-color);
  display: flex;
  gap: 10px;
}
</style>