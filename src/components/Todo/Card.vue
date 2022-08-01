<template>
  <div flex="~" flex-col="~" ref="hoverdate">
    <div
      :class="{ shake: disabled }"
      m="6"
      w="96"
      h="30"
      bg="[#252C37]"
      rounded="lg"
      hover="shadow-md -translate-y-1"
      border="r-7 green-400"
      ref="htmlRefHook"
      cursor="pointer"
      duration="200"
    >
      <div flex="~ col" gap="1">
        <div flex="~ col">
          <div flex="~" items="center" justify="between">
            <!-- Title -->
            <h3 class="font-semibold" text="white" p="1" mr="2">
              {{ task.title }}
            </h3>
            <UiCloseButton
              v-if="longPressedHook == false"
              ml="2"
              mt="1"
              ref="longpressoutside"
              color="primary"
              @click="removeTask()"
            />
          </div>
          <!-- Description -->
          <div>
            <p text="gray-300 md" px="4">
              {{ task.content.substring(0, 60) + "..." }}
            </p>
          </div>
        </div>

        <div flex="~" justify="between">
          <div flex="~" mr="2.5" items="center" text="gray-400">
            Category
            <div
              text="gray-400 2xl"
              class="i-icon-park-solid-category-management"
            ></div>
          </div>

          <!-- Date -->
          <div
            flex="~"
            justify="end"
            items="center"
            font="sans"
            text="gray-400"
            ml="2"
          >
            <span>{{ isHovered ? task.endDate : task.startDate }}</span>

            <div text="gray-400 2xl" class="i-uim-calender"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLongPress } from "@vueuse/core";
import { onClickOutside } from "@vueuse/core";
import { useElementHover } from "@vueuse/core";

const props = defineProps({
  task: Object,
});
console.log(props.task);

const longpressoutside = ref(null);

const htmlRefHook = ref<HTMLElement | null>(null);
const longPressedHook = ref(true);

const hoverdate = ref();
const isHovered = useElementHover(hoverdate);

//===Card Long Press Function====//
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
