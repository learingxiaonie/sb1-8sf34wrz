<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <el-container class="layout">
    <el-aside width="250px">
      <el-menu class="sidebar">
        <el-menu-item index="1" route="/">
          <el-icon><ChatLineRound /></el-icon>
          <span>Chat</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>

<style scoped>
.layout {
  height: 100vh;
}

.sidebar {
  height: 100%;
  border-right: solid 1px var(--el-border-color);
}
</style>