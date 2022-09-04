import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin } from '@nuxt/kit'
import path from "path";

export interface ModuleOptions {
  // addPlugin: boolean,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'utilities',
    configKey: 'utilities'
  },
  defaults: {
    // addPlugin: true,
  },
  setup (options, nuxt) {
    // if (options.addPlugin) {}
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: resolve(runtimeDir, 'components'),
        global: true
      })
    })

    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolve(runtimeDir, 'composables'))
    })
  }
})
