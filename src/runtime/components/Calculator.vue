<template>
  <!-- Application -->
  <Transition>
    <UiDesktopWindow v-if="app.running" v-show="!app.minimized" :app="app">
      <!-- IMPORT ALL THE COMPONENT -->
      <div
        flex="~"
        justify="end"
        items="center"
        w="full"
        h="full"
        ref="windowRef"
        text="white"
        :class="{'justify-center': twoXs}"
      >
        <div
          flex="~ "
          xl:h="100%"
          xl:w="full"
          lg:h="full"
          lg:w="75%"
          md:h="full"
          md:w="78%"
          sm:h="full"
          sm:w="full"
          h="full"
          w="full"
          justify="center"
          items="center"
          p="x-2"
        >
          <div m="y-2" xl:h="full" flex="grow">
            <div xl:h="100%" flex="col" divide="y-1 dark:secondaryOp secondary">
              <!-- ======>> Screen <<====== -->
              <div
                id="calculation-result-bar"
                flex="~"
                border="rounded-lg"
                items="end"
                w="full"
                xl:h="4.6875rem"
                lg:h="3.4375rem"
                md:h="2.6875rem"
                h="2.1875rem"
                text="right"
              >
                <div
                  :class="[
                    screen.length < 8
                      ? 'text-4xl'
                      : screen.length < 12
                      ? 'text-2xl'
                      : screen.length < 16
                      ? 'text-xl'
                      : 'text-lg',
                  ]"
                  w="full"
                  p="x-4 y-2"
                  text="primaryOp dark:primary"
                  dir="ltr"
                >
                  {{ screen }}
                </div>
                <div
                  v-if="!(twoXl || xl || lg || md)"
                  p="1"
                  m="1"
                  border="0"
                  rounded="lg"
                  hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                >
                  <div
                    class="i-codicon-history visible"
                    m="1"
                    text="24px primaryOp dark:primary"
                    cursor="pointer"
                    @click="historyToggle()"
                  />
                </div>
              </div>
              <!-- ======>> History Model <<====== -->
              <div position="relative" text="primaryOp dark:primary" w="full">
                <Teleport to="body">
                  <UiModal v-model="historyState" @cancel="modalCanceled">
                    <template #title> سجل الحاسبة </template>
                    <div
                      v-if="historyState"
                      opacity="93%"
                      z="20"
                      border="rounded-5px"
                      h="full"
                      w="full"
                    >
                      <h3
                        v-if="screenHistory.length == 0"
                        m="10"
                        text="center primaryOp dark:primary"
                      >
                        لا يوجد سجل
                      </h3>
                      <div flex="~ col" justify="center">
                        <div class="overflow-y-auto h-429px">
                          <div
                            v-for="h in screenHistory.reverse()"
                            :key="h.history"
                            text="primaryOp dark:primary"
                            m="2"
                            flex="~ col gap-2"
                          >
                            <div
                              class="border-0 rounded-lg border-w-5 hover:bg-secondary bg-opacity-10 dark:secondaryOp dark:bg-opacity-25"
                            >
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
                          <div
                            v-if="screenHistory.length > 0"
                            text="2xl primaryOp dark:primary"
                            border="2 transparent"
                            cursor="pointer"
                            class="i-ant-design-delete-outlined"
                            hover="border-gray-700"
                            z="30"
                            bottom="1"
                            left="45%"
                            @click="screenHistory = []"
                          />
                        </div>
                      </div>
                    </div>
                  </UiModal>
                </Teleport>
                <!-- ======>> Numbers / Operations <<====== -->
                <div>
                  <div
                    xl:class="grid gap-6px grid-rows-5 justify-center"
                    md:gap="0px"
                  >
                    <!-- =====>> First Row <<===== -->
                    <div flex="~" justify="around" xl:justify="evenly">
                      <div
                        flex="~"
                        items="center"
                        justify="center"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        cursor="pointer"
                        hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                        duration="150"
                        xl:text="info 4xl"
                        lg:text="info 2xl"
                        md:text="info xl"
                        text="info xl"
                        rounded="5px"
                        @click="Backspace()"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-info 2xl:text-5xl"
                      >
                        <div class="i-akar-icons-backspace-fill" />
                      </div>
                      <div
                        flex="~"
                        justify="center"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        cursor="pointer"
                        hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                        duration="150"
                        xl:text="info 6xl"
                        lg:text="info 5xl"
                        md:text="info 4xl"
                        text="info 3xl"
                        rounded="5px"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-info 2xl:text-5xl 2xl:items-center"
                        @click="Operation('/')"
                      >
                        ÷
                      </div>
                      <div
                        flex="~"
                        items="center"
                        justify="center"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        cursor="pointer"
                        hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                        duration="150"
                        lg:text="info 3xl"
                        md:text="info 2xl"
                        text="info xl"
                        font="black"
                        rounded="5px"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-info 2xl:text-5xl"
                        @click="Operation('%')"
                      >
                        %
                      </div>
                      <div
                        flex="~"
                        items="center"
                        justify="center"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        cursor="pointer"
                        hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                        duration="150"
                        xl:text="error 4xl"
                        lg:text="error 3xl"
                        md:text="error 2xl"
                        text="error 2xl"
                        rounded="5px"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-error 2xl:text-5xl"
                        @click="Clear('-')"
                      >
                        C
                      </div>
                    </div>
                    <!-- =====>> Second Row <<===== -->
                    <div flex="~" justify="around" xl:justify="evenly">
                      <div
                        flex="~"
                        justify="center"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        cursor="pointer"
                        hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                        duration="150"
                        text="info 4xl"
                        rounded="5px"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-info 2xl:text-5xl 2xl:items-center"
                        @click="Operation('*')"
                      >
                        ×
                      </div>
                      <div
                        flex="~"
                        items="center"
                        justify="center"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        cursor="pointer"
                        hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                        duration="150"
                        xl:text="primaryOp dark:primary 4xl"
                        lg:text="primaryOp dark:primary 3xl"
                        md:text="primaryOp dark:primary 2xl"
                        text="primaryOp dark:primary xl"
                        rounded="5px"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-5xl"
                        @click="ButtonClicked('9')"
                      >
                        9
                      </div>
                      <div
                        flex="~"
                        items="center"
                        justify="center"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        cursor="pointer"
                        hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                        duration="150"
                        xl:text="primaryOp dark:primary 4xl"
                        lg:text="primaryOp dark:primary 3xl"
                        md:text="primaryOp dark:primary 2xl"
                        text="primaryOp dark:primary xl"
                        rounded="5px"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-5xl"
                        @click="ButtonClicked('8')"
                      >
                        8
                      </div>
                      <div
                        flex="~"
                        items="center"
                        justify="center"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        cursor="pointer"
                        hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                        duration="150"
                        xl:text="primaryOp dark:primary 4xl"
                        lg:text="primaryOp dark:primary 3xl"
                        md:text="primaryOp dark:primary 2xl"
                        text="primaryOp dark:primary xl"
                        rounded="5px"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-5xl"
                        @click="ButtonClicked('7')"
                      >
                        7
                      </div>
                    </div>
                    <!-- =====>> Third Row <<===== -->
                    <div flex="~" justify="around" xl:justify="evenly">
                      <div
                        flex="~"
                        justify="center"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        cursor="pointer"
                        hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                        duration="150"
                        text="info 4xl"
                        rounded="5px"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-info 2xl:text-5xl 2xl:items-center"
                        @click="Operation('+')"
                      >
                        +
                      </div>
                      <div
                        flex="~"
                        items="center"
                        justify="center"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        cursor="pointer"
                        hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                        duration="150"
                        xl:text="primaryOp dark:primary 4xl"
                        lg:text="primaryOp dark:primary 3xl"
                        md:text="primaryOp dark:primary 2xl"
                        text="primaryOp dark:primary xl"
                        rounded="5px"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-5xl"
                        @click="ButtonClicked('6')"
                      >
                        6
                      </div>
                      <div
                        flex="~"
                        items="center"
                        justify="center"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        cursor="pointer"
                        hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                        duration="150"
                        xl:text="primaryOp dark:primary 4xl"
                        lg:text="primaryOp dark:primary 3xl"
                        md:text="primaryOp dark:primary 2xl"
                        text="primaryOp dark:primary xl"
                        rounded="5px"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-5xl"
                        @click="ButtonClicked('5')"
                      >
                        5
                      </div>
                      <div
                        flex="~"
                        items="center"
                        justify="center"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        cursor="pointer"
                        hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                        duration="150"
                        xl:text="primaryOp dark:primary 4xl"
                        lg:text="primaryOp dark:primary 3xl"
                        md:text="primaryOp dark:primary 2xl"
                        text="primaryOp dark:primary xl"
                        rounded="5px"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-5xl"
                        @click="ButtonClicked('4')"
                      >
                        4
                      </div>
                    </div>
                    <!-- =====>> Forth Row <<===== -->
                    <div flex="~" justify="around" xl:justify="evenly">
                      <div
                        flex="~"
                        justify="center"
                        lg:items="center"
                        items="center"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        cursor="pointer"
                        hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                        duration="150"
                        xl:text="info 4xl"
                        lg:text="info 3xl"
                        md:text="info 3xl"
                        text="info 2xl"
                        font="black"
                        rounded="5px"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-info 2xl:text-5xl 2xl:items-center"
                        @click="Operation('-')"
                      >
                        –
                      </div>
                      <div
                        flex="~"
                        items="center"
                        justify="center"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        cursor="pointer"
                        hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                        duration="150"
                        xl:text="primaryOp dark:primary 4xl"
                        lg:text="primaryOp dark:primary 3xl"
                        md:text="primaryOp dark:primary 2xl"
                        text="primaryOp dark:primary xl"
                        rounded="5px"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-5xl"
                        @click="ButtonClicked('3')"
                      >
                        3
                      </div>
                      <div
                        flex="~"
                        items="center"
                        justify="center"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        cursor="pointer"
                        hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                        duration="150"
                        xl:text="primaryOp dark:primary 4xl"
                        lg:text="primaryOp dark:primary 3xl"
                        md:text="primaryOp dark:primary 2xl"
                        text="primaryOp dark:primary xl"
                        rounded="5px"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-5xl"
                        @click="ButtonClicked('2')"
                      >
                        2
                      </div>
                      <div
                        flex="~"
                        items="center"
                        justify="center"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        cursor="pointer"
                        hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                        duration="150"
                        xl:text="primaryOp dark:primary 4xl"
                        lg:text="primaryOp dark:primary 3xl"
                        md:text="primaryOp dark:primary 2xl"
                        text="primaryOp dark:primary xl"
                        rounded="5px"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-5xl"
                        @click="ButtonClicked('1')"
                      >
                        1
                      </div>
                    </div>
                    <!-- =====>> Fifth Row <<===== -->
                    <div flex="~ " justify="around" xl:justify="evenly">
                      <div
                        flex="~"
                        items="center"
                        justify="center"
                        cursor="pointer"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        bg="info"
                        hover="bg-opacity-50"
                        text="primaryOp dark:primary 4xl"
                        rounded="5px"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-info 2xl:text-5xl 2xl:items-center"
                        @click="Operation('=')"
                      >
                        =
                      </div>
                      <div
                        flex="~"
                        items="center"
                        justify="center"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        cursor="pointer"
                        hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                        duration="150"
                        xl:text="primaryOp dark:primary 2xl"
                        lg:text="primaryOp dark:primary 2xl"
                        md:text="primaryOp dark:primary 2xl"
                        text="primaryOp dark:primary xl"
                        rounded="5px"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-5xl"
                        @click="ButtonClicked('000')"
                      >
                        000
                      </div>
                      <div
                        flex="~"
                        items="center"
                        justify="center"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        cursor="pointer"
                        hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                        duration="150"
                        xl:text="primaryOp dark:primary 4xl"
                        lg:text="primaryOp dark:primary 3xl"
                        md:text="primaryOp dark:primary 2xl"
                        text="primaryOp dark:primary xl"
                        rounded="5px"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-5xl"
                        @click="ButtonClicked('0')"
                      >
                        0
                      </div>
                      <div
                        flex="~"
                        items="center"
                        justify="center"
                        lg:w="3.75rem"
                        lg:h="3.75rem"
                        md:h="3.2rem"
                        md:w="3.2rem"
                        sm:h="2.5rem"
                        sm:w="2.5rem"
                        h="2rem"
                        w="2rem"
                        cursor="pointer"
                        hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                        duration="150"
                        text="primaryOp dark:primary 6xl"
                        rounded="5px"
                        class="xl:w-4.5rem xl:h-4.5rem 2xl:w-5.5rem 2xl:h-5.5rem 2xl:text-6xl"
                        @click="Operation('.')"
                      >
                        .
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UiDesktopWindow>
  </Transition>
</template>

<script setup>
import {
  useAppManager,
  ref,
  useToggle,
  onKeyStroke,
  useBreakpointWindow,
} from "#imports";

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
const ButtonClicked = (number) => {
  if (screen.value.length > 13) {
    return;
  }
  if (screen.value === "0") {
    screen.value = number;
  } else {
    screen.value += number;
  }
};
//= ====>> Operations Function <<=====//
const Operation = (operation) => {
  const lastChar = screen.value.slice(-1);
  if (lastChar == operation) {
    return;
  }
  if (
    lastChar == "*" ||
    lastChar == "+" ||
    lastChar == "-" ||
    lastChar == "/"
  ) {
    screen.value += lastChar;
  }
  if (operation === "=" || operation === "Enter") {
    const history = screen.value.toString();
    screen.value = eval(screen.value).toString().substring(0, 19);
    screenHistory.value.push({
      history,
      result: screen.value,
    });
  } else if (operation === "%") {
    screen.value = (eval(screen.value) / 100).toString().substring(0, 19);
  } else {
    screen.value += operation;
  }
};

//= ====>> Clear / Deletes All Numbers <<=====//
const Clear = () => {
  screen.value = "0";
};

//= ====>> BackSpace / Delete One Number  <<=====//
const Backspace = () => {
  screen.value = screen.value.length <= 1 ? "0" : screen.value.slice(0, -1);
};

//= ====>> keyboard <<=====//
onKeyStroke(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."], (e) => {
  if (!(props.app.id == AppManager.focused)) {
    return;
  }

  if (screen.value.length > 19) {
    return;
  }
  if (screen.value == "0") {
    screen.value = e.key;
  } else {
    screen.value += e.key;
  }
  e.preventDefault();
});

onKeyStroke(["+", "-", "*", "/", "%", "Enter"], (e) => {
  if (!(props.app.id == AppManager.focused)) {
    return;
  }
  Operation(e.key);

  e.preventDefault();
});

onKeyStroke(["Backspace"], (e) => {
  if (!(props.app.id == AppManager.focused)) {
    return;
  }
  Backspace();
  e.preventDefault();
});

onKeyStroke(["Delete"], (e) => {
  if (!(props.app.id == AppManager.focused)) {
    return;
  }
  Clear();
  e.preventDefault();
});

const modalCanceled = () => {
  console.log("Canceled");
  historyState.value = false;
};

const windowRef = ref(null);

const { size, twoXs, xs, sm, md, lg, xl, twoXl } =
  useBreakpointWindow(windowRef);
</script>
