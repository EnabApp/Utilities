import MyModule from '..'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,

    modules: [
        MyModule,
        '@enab/systemapps',
        '@enab/core',
        '@nuxtjs/supabase',
        '@nuxt/image-edge',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@unocss/nuxt',
        "@nuxtjs/color-mode",
    ],
})
