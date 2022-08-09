import { defineNuxtPlugin } from '#app'
import { useStoreApps } from '#imports'
import config from './config.json'

export default defineNuxtPlugin((nuxtApp) => {
    // Registering App
    const appStore = useStoreApps()
    appStore.addApp(config)
})
