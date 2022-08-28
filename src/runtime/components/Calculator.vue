<template>
  <!-- Application -->
  <Transition>
    <UiDesktopWindow v-if="app.running" v-show="!app.minimized" :app="app">
      <div flex="~" ref="windowRef" text="white" :class="{
        'justify-center items-center w-[100%] h-[100%]': twoXs,
        'justify-between  w-[100%] h-[100%]': xs,
        'justify-between items-center w-[100%] h-[100%]': sm,
        'justify-start items-center w-[100%] h-[100%]': md,
        'justify-between items-center w-[100%] h-[100%]': lg,
        'justify-between items-end w-[100%] h-[100%] ': xl,
        'justify-start w-[100%] h-[100%]  py-[2rem]': twoXl,
      }">
        <div flex="~" p="x-2" :class="{
          'justify-between items-center w-[100%] h-[100%%]': twoXs,
          'justify-between items-center w-[100%] h-[100%]': xs,
          'justify-between items-center w-[99%] h-[100%]': sm,
          'items-center justify-between w-[75%] h-[100%]': md,
          'justify-between items-start w-[80%] h-[100%]': lg,
          'justify-between items-center w-[80%] h-[80%] ': xl,
          'justify-start w-[80%] h-[100%]': twoXl,
        }">
          <div m="y-2" xl:h="full" flex="grow">
            <div xl:h="100%" flex="col" divide="y-1 dark:secondaryOp secondary">
              <!-- ======>> Screen <<====== -->
              <div id="calculation-result-bar" flex="~" border="rounded-lg" w="full" text="right" :class="{
                'h-[2.6875rem]': md,
                'h-[3.8rem] py-9': lg,
                'h-[3.5rem]': xl,
                'py-[3rem] h-[6rem]': twoXl,
              }">
                <div :class="[
                  screen.length < 8
                    ? 'text-4xl'
                    : screen.length < 12
                      ? 'text-2xl'
                      : screen.length < 16
                        ? 'text-xl'
                        : 'text-lg',
                ]" w="full" p="x-4 y-2" text="primaryOp dark:primary" dir="ltr">
                  {{ screen }} {{ size }}
                </div>
                <div v-if="!(twoXl || xl || lg || md)" p="1" m="1" border="0" rounded="lg"
                  hover="bg-secondary dark:secondaryOp dark:bg-opacity-25">
                  <div class="i-codicon-history visible" m="1" text="24px primaryOp dark:primary" cursor="pointer"
                    @click="historyToggle()" />
                </div>
              </div>
              <!-- ======>> History Model <<====== -->
              <div position="relative" text="primaryOp dark:primary" w="full" h="full">
                <Teleport to="body">
                  <UiModal v-model="historyState" @cancel="modalCanceled">
                    <template #title> سجل الحاسبة </template>
                    <div v-if="historyState" opacity="93%" z="20" border="rounded-5px" h="full" w="full">
                      <h3 v-if="screenHistory.length == 0" m="10" text="center primaryOp dark:primary">
                        لا يوجد سجل
                      </h3>
                      <div flex="~ col" justify="center">
                        <div class="overflow-y-auto h-429px">
                          <div v-for="h in screenHistory.reverse()" :key="h.history" text="primaryOp dark:primary" m="2"
                            flex="~ col gap-2">
                            <div
                              class="border-0 rounded-lg border-w-5 hover:bg-secondary bg-opacity-10 dark:secondaryOp dark:bg-opacity-25">
                              <div m="3" text="xl primaryOp dark:primary">
                                <h5>{{ " = " }} {{ h.history }}</h5>
                              </div>
                              <div m="3" text="2xl primaryOp dark:primary">
                                <h5>{{ h.result }}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div flex="~" justify="center">
                        <div class="p-1 border-0 rounded-lg">
                          <div v-if="screenHistory.length > 0" text="2xl primaryOp dark:primary" border="2 transparent"
                            cursor="pointer" class="i-ant-design-delete-outlined" hover="border-gray-700" z="30"
                            bottom="1" left="45%" @click="screenHistory = []" />
                        </div>
                      </div>
                    </div>
                  </UiModal>
                </Teleport>
                <!-- ======>> Numbers / Operations <<====== -->
                <CalculatorButtons :windowBreakpoint="windowBreakpoint" :screen="screen" />
              </div>
            </div>
          </div>
        </div>
        <!-- DISPLAY THE HISTORY ON LARGE SCREEN SIZES -->
        <div v-if="twoXl || xl || lg || md" :class="{
          'w-[20%] h-[100%]': twoXl,
          'w-[25%] h-[90%]': xl,
          'w-[25%] h-[100%]': md || lg,
        }" bg="white" text-black text-5xl text-center >
          SIGIL
        </div>
      </div>
    </UiDesktopWindow>
  </Transition>
</template>

<script setup>
import { useAppManager, ref, useToggle, useBreakpointWindow } from "#imports";

const AppManager = useAppManager();

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});

const screen = ref("0");
const screenHistory = ref([]);
const [historyState, historyToggle] = useToggle(false);
//= ====>> Buttons Clicked Function <<=====//

const modalCanceled = () => {
  console.log("Canceled");
  historyState.value = false;
};

const windowRef = ref(null);

const windowBreakpoint = useBreakpointWindow(windowRef);

const { size, twoXs, xs, sm, md, lg, xl, twoXl } = windowBreakpoint;
</script>
