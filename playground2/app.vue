<template>
  <NuxtLayout>
    <div>Nuxt module playground!</div>
    <UiDesktopIcon :app="app" />
    <component :app="app" :is="app.name"></component>
    <component v-for="subApp in app?.subApps" :key="app.id + '-sub-' + subApp.id" :app="subApp" :is="`${app.name}Apps${subApp.name}`"></component>
  </NuxtLayout>
</template>

<script setup>
import App from './classes/App.ts';

const app = ref(new App({
  id: 1,
  name: 'AppName',
  title: "سوبر ماركت",
  icon: "i-bxs-cart",
  maximized: true,
  solid: true,
  owned: true,
  // widgets: [
  //   new Widget({
  //     id: 1,
  //     name: 'First',
  //     title: 'للسوبر ماركت',
  //   })
  // ],
  subApps: [
    new App({
      id: 1,
      name: 'Second',
      title: "برنامج ثاني",
      icon: "i-bxs-cart",
      size: "min-w-2xl min-h-3xl",
    })
  ]
}))
</script>
