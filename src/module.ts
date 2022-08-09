import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin } from '@nuxt/kit'
import path from "path";

export interface ModuleOptions {
  // addPlugin: boolean,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'module-starter',
    configKey: 'moduleStarter'
  },
  defaults: {
    // addPlugin: true,
  },
  setup (options, nuxt) {
    // if (options.addPlugin) {}
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)
    addPlugin(resolve(runtimeDir, 'registerer'))
    addPlugin(resolve(runtimeDir, 'plugin'))

    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: resolve(runtimeDir, 'components'),
        global: true
      })
    })

    nuxt.hook('autoImports:dirs', (dirs) => {
      dirs.push(resolve(runtimeDir, 'composables'))
      dirs.push(resolve(runtimeDir, 'stores'))
    })
  }
})
