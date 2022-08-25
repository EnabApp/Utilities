import { defineNuxtPlugin } from '#app'
import { useAppManager } from '#imports'
import todo from './todo.json'
import calculator from './calculator.json'

export default defineNuxtPlugin((nuxtApp) => {
    // Registering App
    const appStore = useAppManager()
    appStore.addApp(todo) 
    appStore.addApp(calculator)
})
