import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin } from '@nuxt/kit'
import path from "path";

export interface ModuleOptions {
  addPlugin: boolean,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'module-starter',
    configKey: 'moduleStarter'
  },
  defaults: {
    addPlugin: true,
  },
  hooks: {
    // COMPONENTS
    "components:dirs"(dirs) {
      // Add ./components dir to the list
      dirs.push({
        path: path.resolve(__dirname, "./components")
      });
    },

    // COMPOSABLES
    // "autoImports:dirs"(dirs) {
    //  dirs.push(path.resolve(__dirname, "./composables"));
    // },
  },
  setup (options, nuxt) {
    if (options.addPlugin) {
      const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
      nuxt.options.build.transpile.push(runtimeDir)
      addPlugin(resolve(runtimeDir, 'plugin'))
    }
  }
})
