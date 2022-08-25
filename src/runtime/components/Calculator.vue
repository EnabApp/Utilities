<template>
  <!-- Application -->
  <Transition>
    <UiDesktopWindow v-if="app.running" v-show="!app.minimized" :app="app">
      <div xl:h="full" xl:w="21rem" lg:h="23rem" lg:w="17rem" md:h="19.1rem" md:w="17rem" h="15.5rem" flex="~ col"
        p="x-2">
        <div m="y-2" xl:h="full" flex="grow">
          <div flex="col" divide="y-1 dark:secondaryOp secondary">
            <!-- ======>> Screen <<====== -->
            <div flex="~" border="rounded-lg" items="end" w="full" xl:h="75px" lg:h="55px" md:h="43px" h="35px"
              text="right">
              <div :class="[
                screen.length < 8
                  ? 'text-4xl'
                  : screen.length < 12
                    ? 'text-2xl'
                    : screen.length < 16
                      ? 'text-xl'
                      : 'text-lg',
              ]" w="full" p="x-4 y-2" text="primaryOp dark:primary" dir="ltr">
                {{ screen }}
              </div>
              <div p="1" m="1" border="0" rounded="lg" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25">
                <div @click="historyToggle()" class="i-codicon-history" m="1" text="24px primaryOp dark:primary"
                  cursor="pointer"></div>
              </div>
            </div>
            <!-- ======>> History Model <<====== -->
            <div position="relative" text="primaryOp dark:primary" w="full">
              <Teleport to="body">
                <UiModal v-model="historyState" @cancel="modalCanceled">
                  <template v-slot:title>سجل الحاسبة</template>
                  <div v-if="historyState" opacity="93%" z="20" border="rounded-5px" h="full" w="full">
                    <h3 m="10" text="center primaryOp dark:primary" v-if="screenHistory.length == 0">
                      لا يوجد سجل
                    </h3>
                    <div flex="~ col" justify="center">
                      <div class="overflow-y-auto h-429px">
                        <div text="primaryOp dark:primary" m="2" flex="~ col gap-2" v-for="h in screenHistory.reverse()"
                          :key="h.history">
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
                        <div text="2xl primaryOp dark:primary" border="2 transparent" cursor="pointer"
                          class="i-ant-design-delete-outlined" hover="border-gray-700" z="30" bottom="1" left="45%"
                          v-if="screenHistory.length > 0" @click="screenHistory = []"></div>
                      </div>
                    </div>
                  </div>
                </UiModal>
              </Teleport>
              <!-- ======>> Numbers / Operations <<====== -->
              <div>
                <div xl:class="grid gap-6px grid-rows-5 justify-center" md:gap="0px">
                  <!-- =====>> First Row <<===== -->
                  <div flex="~" justify="around">
                    <div flex="~" items="center" justify="center" lg:w="60px" lg:h="60px" md:h="50px" md:w="50px"
                      h="40px" w="40px" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                      duration="150" xl:text="info 3xl" lg:text="info 2xl" md:text="info xl" text="info xl"
                      rounded="5px" @click="Backspace()">
                      <div class="i-akar-icons-backspace-fill"></div>
                    </div>
                    <div flex="~" justify="center" lg:w="60px" lg:h="60px" md:h="50px" md:w="50px" h="40px" w="40px"
                      cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150"
                      lg:text="info 5xl" md:text="info 4xl" text="info 3xl" rounded="5px" @click="Operation('/')">
                      ÷
                    </div>
                    <div flex="~" items="center" justify="center" lg:w="60px" lg:h="60px" md:h="50px" md:w="50px"
                      h="40px" w="40px" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                      duration="150" lg:text="info 3xl" md:text="info 2xl" text="info xl" font="black" rounded="5px"
                      @click="Operation('%')">
                      %
                    </div>
                    <div flex="~" items="center" justify="center" lg:w="60px" lg:h="60px" md:h="50px" md:w="50px"
                      h="40px" w="40px" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                      duration="150" xl:text="error 4xl" lg:text="error 3xl" md:text="error 2xl" text="error 2xl"
                      rounded="5px" @click="Clear('-')">
                      C
                    </div>
                  </div>
                  <!-- =====>> Second Row <<===== -->
                  <div flex="~" justify="around">
                    <div flex="~" justify="center" lg:w="60px" lg:h="60px" md:h="50px" md:w="50px" h="40px" w="40px"
                      cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150"
                      text="info 4xl" rounded="5px" @click="Operation('*')">
                      ×
                    </div>
                    <div flex="~" items="center" justify="center" lg:w="60px" lg:h="60px" md:h="50px" md:w="50px"
                      h="40px" w="40px" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                      duration="150" xl:text="primaryOp dark:primary 4xl" lg:text="primaryOp dark:primary 3xl"
                      md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl" rounded="5px"
                      @click="ButtonClicked('9')">
                      9
                    </div>
                    <div flex="~" items="center" justify="center" lg:w="60px" lg:h="60px" md:h="50px" md:w="50px"
                      h="40px" w="40px" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                      duration="150" xl:text="primaryOp dark:primary 4xl" lg:text="primaryOp dark:primary 3xl"
                      md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl" rounded="5px"
                      @click="ButtonClicked('8')">
                      8
                    </div>
                    <div flex="~" items="center" justify="center" lg:w="60px" lg:h="60px" md:h="50px" md:w="50px"
                      h="40px" w="40px" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                      duration="150" xl:text="primaryOp dark:primary 4xl" lg:text="primaryOp dark:primary 3xl"
                      md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl" rounded="5px"
                      @click="ButtonClicked('7')">
                      7
                    </div>
                  </div>
                  <!-- =====>> Third Row <<===== -->
                  <div flex="~" justify="around">
                    <div flex="~" justify="center" lg:w="60px" lg:h="60px" md:h="50px" md:w="50px" h="40px" w="40px"
                      cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150"
                      text="info 4xl" rounded="5px" @click="Operation('+')">
                      +
                    </div>
                    <div flex="~" items="center" justify="center" lg:w="60px" lg:h="60px" md:h="50px" md:w="50px"
                      h="40px" w="40px" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                      duration="150" xl:text="primaryOp dark:primary 4xl" lg:text="primaryOp dark:primary 3xl"
                      md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl" rounded="5px"
                      @click="ButtonClicked('6')">
                      6
                    </div>
                    <div flex="~" items="center" justify="center" lg:w="60px" lg:h="60px" md:h="50px" md:w="50px"
                      h="40px" w="40px" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                      duration="150" xl:text="primaryOp dark:primary 4xl" lg:text="primaryOp dark:primary 3xl"
                      md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl" rounded="5px"
                      @click="ButtonClicked('5')">
                      5
                    </div>
                    <div flex="~" items="center" justify="center" lg:w="60px" lg:h="60px" md:h="50px" md:w="50px"
                      h="40px" w="40px" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                      duration="150" xl:text="primaryOp dark:primary 4xl" lg:text="primaryOp dark:primary 3xl"
                      md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl" rounded="5px"
                      @click="ButtonClicked('4')">
                      4
                    </div>
                  </div>
                  <!-- =====>> Forth Row <<===== -->
                  <div flex="~" justify="around">
                    <div flex="~" justify="center" lg:items="center" items="center" lg:w="60px" lg:h="60px" md:h="50px"
                      md:w="50px" h="40px" w="40px" cursor="pointer"
                      hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="info 4xl"
                      lg:text="info 3xl" md:text="info 3xl" text="info 2xl" font="black" rounded="5px"
                      @click="Operation('-')">
                      –
                    </div>
                    <div flex="~" items="center" justify="center" lg:w="60px" lg:h="60px" md:h="50px" md:w="50px"
                      h="40px" w="40px" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                      duration="150" xl:text="primaryOp dark:primary 4xl" lg:text="primaryOp dark:primary 3xl"
                      md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl" rounded="5px"
                      @click="ButtonClicked('3')">
                      3
                    </div>
                    <div flex="~" items="center" justify="center" lg:w="60px" lg:h="60px" md:h="50px" md:w="50px"
                      h="40px" w="40px" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                      duration="150" xl:text="primaryOp dark:primary 4xl" lg:text="primaryOp dark:primary 3xl"
                      md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl" rounded="5px"
                      @click="ButtonClicked('2')">
                      2
                    </div>
                    <div flex="~" items="center" justify="center" lg:w="60px" lg:h="60px" md:h="50px" md:w="50px"
                      h="40px" w="40px" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                      duration="150" xl:text="primaryOp dark:primary 4xl" lg:text="primaryOp dark:primary 3xl"
                      md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl" rounded="5px"
                      @click="ButtonClicked('1')">
                      1
                    </div>
                  </div>
                  <!-- =====>> Fifth Row <<===== -->
                  <div flex="~ " justify="around">
                    <div flex="~" items="center" justify="center" cursor="pointer" lg:w="60px" lg:h="60px" md:w="50px"
                      md:h="50px" h="40px" w="40px" bg="info" hover="bg-opacity-50" text="primaryOp dark:primary 4xl"
                      rounded="5px" @click="Operation('=')">
                      =
                    </div>
                    <div flex="~" items="center" justify="center" lg:w="60px" lg:h="60px" md:w="50px" md:h="50px"
                      h="40px" w="40px" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                      duration="150" xl:text="primaryOp dark:primary 2xl" lg:text="primaryOp dark:primary 2xl"
                      md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl" rounded="5px"
                      @click="ButtonClicked('000')">
                      000
                    </div>
                    <div flex="~" items="center" justify="center" lg:w="60px" lg:h="60px" md:w="50px" md:h="50px"
                      h="40px" w="40px" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                      duration="150" xl:text="primaryOp dark:primary 4xl" lg:text="primaryOp dark:primary 3xl"
                      md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl" rounded="5px"
                      @click="ButtonClicked('0')">
                      0
                    </div>
                    <div flex="~" items="center" justify="center" lg:w="60px" lg:h="60px" md:w="50px" md:h="50px"
                      h="40px" w="40px" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
                      duration="150" text="primaryOp dark:primary 4xl" rounded="5px" @click="Operation('.')">
                      .
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
import { useAppManager, ref, useToggle, onKeyStroke } from "#imports";

const AppManager = useAppManager();

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});

let screen = ref("0");
const screenHistory = ref([]);
const [historyState, historyToggle] = useToggle(false);
//=====>> Buttons Clicked Function <<=====//
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
  let lastChar = screen.value.slice(-1);
  if (lastChar == operation) return;
  if (
    lastChar == "*" ||
    lastChar == "+" ||
    lastChar == "-" ||
    lastChar == "/"
  ) {
    screen.value += lastChar;
  }
  if (operation === "=" || operation === "Enter") {
    let history = screen.value.toString();
    screen.value = eval(screen.value).toString().substring(0, 19);
    screenHistory.value.push({
      history: history,
      result: screen.value,
    });
  } else if (operation === "%") {
    screen.value = (eval(screen.value) / 100).toString().substring(0, 19);
  } else {
    screen.value += operation;
  }
};

//=====>> Clear / Deletes All Numbers <<=====//
const Clear = () => {
  screen.value = "0";
};

//=====>> BackSpace / Delete One Number  <<=====//
const Backspace = () => {
  screen.value = screen.value.length <= 1 ? "0" : screen.value.slice(0, -1);
};

//=====>> keyboard <<=====//
onKeyStroke(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."], (e) => {
  if (!(props.app.id == AppManager.focused)) return;

  if (screen.value.length > 19) return;
  if (screen.value == "0") {
    screen.value = e.key;
  } else {
    screen.value += e.key;
  }
  e.preventDefault();
});

onKeyStroke(["+", "-", "*", "/", "%", "Enter"], (e) => {
  if (!(props.app.id == AppManager.focused)) return;
  Operation(e.key);

  e.preventDefault();
});

onKeyStroke(["Backspace"], (e) => {
  if (!(props.app.id == AppManager.focused)) return;
  Backspace();
  e.preventDefault();
});

onKeyStroke(["Delete"], (e) => {
  if (!(props.app.id == AppManager.focused)) return;
  Clear();
  e.preventDefault();
});

const modalCanceled = () => {
  console.log("Canceled");
  historyState.value = false;
};
</script>
