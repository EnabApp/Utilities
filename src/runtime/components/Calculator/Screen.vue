<template>
  <div id="calculation-result-bar" flex="~" border="rounded-lg" w="full" text="right" :class="{
    'h-[2.6875rem]': md,
    'h-[3.8rem] py-9': lg,
    'h-[3.5rem]': xl,
    'py-[3rem] h-[6rem]': twoXl,
  }">
    <div :class="[
      screen.length < 8
        ? 'text-4xl'
        : props.screen.length < 12
          ? 'text-2xl'
          : props.screen.length < 16
            ? 'text-xl'
            : 'text-lg',
    ]" w="full" p="x-4 y-2" text="primaryOp dark:primary" dir="ltr">
      {{ props.screen }} {{ size }}
    </div>
    <div v-if="!(twoXl || xl || lg || md)" p="1" m="1" border="0" rounded="lg"
      hover="bg-secondary dark:secondaryOp dark:bg-opacity-25">
      <div class="i-codicon-history visible" m="1" text="24px primaryOp dark:primary" cursor="pointer"
        @click="historyToggle()" />
    </div>
  </div>
</template>

<script setup>


const props = defineProps({
  screen: {
    type: String,
  },
  windowBreakpoint: {
    type: Object,
  },
  historyToggle: {
    type: Function
  }
});
const { size, twoXs, xs, sm, md, lg, xl, twoXl } = props.windowBreakpoint;


</script>
