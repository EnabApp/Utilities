<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useAppManager } from '#imports';
const appStore = useAppManager()
appStore.addApp({
    "name": "Todo",
    "title": "مهامي",
    "icon": "i-ri-todo-fill",
    "owned":true,
    "minWidth": 350,  
    "minHeight": 550, 
    "maximized":  false,
    "maximizable": true
}) 
appStore.addApp({
  "name": "Calculator",
  "title": "الحاسبة",
  "icon": "i-ic-baseline-calculate",
  "minWidth": 300,  
  "minHeight": 300, 
  "maximizable": true
})
</script>