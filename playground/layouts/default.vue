<template>
  <div class="bg-default" position="relative" h="screen" w="screen">
    <div h="full" flex="~ col">
      <div id="openedwindows"></div>
      <!-- class="backdrop-blur-2xl" -->
      <div flex="grow">
          <slot />
      </div>
    </div>
  </div>
</template>
