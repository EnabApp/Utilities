<template>
  <div
    :class="{ shake: disabled }"
    m="6"
    mt="10"
    w="52"
    h="56"
    bg="[#252C37]"
    rounded="lg"
    shadow="sm"
    border="t-7 green-400"
    ref="htmlRefHook"
    cursor="pointer"
  >
    <UiCloseButton
      ref="longpressoutside"
      v-if="longPressedHook == false"
      absolute="~"
      color="primary"
      @click="removeTask()"
    />
    <div class="p-2 text-center flex flex-col gap-5">
      <!-- Title -->
      <h3 class="font-semibold" text="white">{{task.title}}</h3>
      <div>
        <!-- Description -->
        <p text="gray-300" class="text-sm">
            {{task.content}}
        </p>
      </div>
      <div class="flex justify-end mt-3">
        <!-- Date -->
        <p text="gray-400" class="text-xs">من {{task.startDate}} الى {{task.endDate}}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLongPress } from "@vueuse/core";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  task:Object,
});
console.log(props.task);

const longpressoutside = ref(null);

const htmlRefHook = ref<HTMLElement | null>(null);
const longPressedHook = ref(true);


//===Card Shake Function====//

const removeTask =() => {
  props.task;
}
const onLongPressCallbackHook = (e: PointerEvent) => {
  longPressedHook.value = false;
  warnDisabled();
};

onClickOutside(longpressoutside, () => {
  longPressedHook.value = true;
});

onLongPress(htmlRefHook, onLongPressCallbackHook, {
  modifiers: { prevent: true },
});
const disabled = ref(false);

//===Card Shake Function====//
function warnDisabled() {
  disabled.value = true;
  setTimeout(() => {
    disabled.value = false;
  }, 500);
}
</script>

<style>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
