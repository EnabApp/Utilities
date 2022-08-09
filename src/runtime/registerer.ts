import { defineNuxtPlugin } from '#app'
import { useAppManager } from '#imports'
import config from './config.json'

export default defineNuxtPlugin((nuxtApp) => {
    // Registering App
    const appStore = useAppManager()
    appStore.addApp(config)
})
