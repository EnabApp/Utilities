<template>
  <div flex="~" ref="hoverdate">
    <div
      :class="{ shake: disabled, border: disabled }"
      m="6"
      w="[90%]"
      h="[100%]"
      bg="[#252C37]"
      rounded="lg"
      hover="shadow-md -translate-y-1"
      border="r-7 green-400"
      ref="htmlRefHook"
      cursor="pointer"
      duration="200"
    >
      <div gap="1">
        <div flex="~ col">
          <div flex="~" items="center" justify="between">
            <!-- Title -->
            <h3 class="font-semibold" text="white" p="1" mr="2">
              {{ task.title ? task.title : "لم يذكر" }}
            </h3>
            <UiCloseButton
              v-if="longPressedHook == false"
              ml="2"
              mt="1"
              ref="longpressoutside"
              color="primary"
            />
          </div>
          <!-- Description -->
          <div>
            <p text="gray-300 md" px="4">
              {{ task.content.substring(0, 75) + "..." }}
            </p>
          </div>
        </div>

        <div
          flex="~"
          justify="between"
          font="sans"
          text="gray-400"
          mt="4"
          mb="2"
        >
          <!-- Category -->
          <div
            hover="bg-w-10"
            mr="3"
            border="0.5"
            rounded="~"
            text="sm"
            px="0.5"
          >
            Category
          </div>
          <div flex="~" items="center" gap="3" border="0.5" rounded="~" px="2">
            <div
            @click="isnew()"
              :class="{
                'text-white':isNew,
                'opacity-30': isProgress,
                'opacity-20': isDone,
              }"
              class="i-clarity-new-line hover:text-w-90 text-lg cursor-pointer"
            ></div>
            <div
            @click="isprogress()"
              :class="{
                'text-amber-400': isProgress,
                'opacity-30': isNew,
                'opacity-20': isDone,
              }"
              class="i-mdi-progress-clock hover:text-amber-300 cursor-pointer"
            ></div>
            <div
            @click="isdone()"
              :class="{
                'text-green-400': isDone,
                'opacity-30': isNew,
                'opacity-20': isProgress,
              }"
              class="i-mdi-progress-check hover:text-green-400 cursor-pointer"
            ></div>
          </div>
          <!-- Date -->
          <div ml="2">
            <span>{{ isHovered ? task.endDate : task.startDate }}</span>
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
import { tryUseNuxt } from "~~/../node_modules/@nuxt/kit/dist";

const props = defineProps({
  task: Object,
});

console.log(props.task);

const isProgress = ref(false);

const isDone = ref(false);

const isNew = ref(true);

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

//===Buttons Function====//
const isnew = () => {
  isNew.value = true;
  isProgress.value = false;
  isDone.value = false;
};

const isprogress = () => {
  isProgress.value = true;
  isNew.value = false;
  isDone.value = false;
};

const isdone = () => {
  isDone.value = true;
  isNew.value = false;
  isProgress.value = false;
};

</script>

<style>
.shake {
  animation: shake 0.85s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
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
