<template>
  <div>
    <div xl:class="grid gap-6px grid-rows-5 justify-between" :class="{ 'gap-16 ': twoXs }">
      <!-- =====>> First Row <<===== -->
      <!-- FIRST ROW COMPONent -->

      <div flex="~" justify="around" md:justify="evenly">
        <div flex="~" justify="center" items="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="info 4xl" lg:text="info 2xl"
          md:text="info xl" text="info xl" rounded="5px" @click="Backspace()" :class="{
            'w-[8.5rem] h-[4.5rem] p-2': twoXl,
            'w-[7.5rem] h-[3.8rem] p-2': xl,
            'w-[6.3rem] h-[3.4rem] p-2': lg,
            'w-[5.8rem] h-[3.2rem] p-2': md,
            'w-[3.5rem] h-[2.5rem] p-2': sm,
            'w-[3rem] h-[3rem] p-2': xs,
            'w-[2.5rem] h-[2.2rem] p-2': twoXs,
          }">
          <div class="i-akar-icons-backspace-fill" />
        </div>
        <div flex="~" justify="center" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
          duration="150" rounded="5px" :class="{
            'w-[8.5rem] h-[4.5rem] text-info text-7xl p-2 items-end':
              twoXl,
            'w-[7.5rem] h-[3.8rem] text-info text-6xl p-2 items-end':
              xl,
            'w-[6.3rem] h-[3.4rem] text-info text-7xl p-2 items-end':
              lg,
            'w-[5.8rem] h-[3.2rem] text-info text-6xl p-2 items-end':
              md,
            'w-[3.5rem] h-[2.5rem] text-info text-5xl p-2 items-end':
              sm,
            'w-[3rem] h-[3rem] text-info text-4xl p-2 items-center':
              xs,
            'w-[2.5rem] h-[2.2rem] text-info text-4xl p-2 items-end':
              twoXs,
          }" @click="Operation('/')">
          ÷
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" font="black" rounded="5px" :class="{
            'w-[8.5rem] h-[4.5rem] p-2 text-info text-5xl': twoXl,
            'w-[7.5rem] h-[3.8rem] p-2 text-info text-4xl': xl,
            'w-[6.3rem] h-[3.4rem] p-2 text-info text-4xl': lg,
            'w-[5.8rem] h-[3.2rem] p-2 text-info text-3xl': md,
            'w-[3.5rem] h-[2.5rem] p-2 text-info text-2xl': sm,
            'w-[3rem] h-[3rem] p-2 text-info text-2xl': xs,
            'w-[2.5rem] h-[2.2rem] p-2 text-info text-xl': twoXs,
          }" @click="Operation('%')">
          %
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="error 4xl"
          lg:text="error 3xl" md:text="error 2xl" text="error 2xl" rounded="5px" :class="{
            'w-[8.5rem] h-[4.5rem] p-2': twoXl,
            'w-[7.5rem] h-[3.8rem] p-2': xl,
            'w-[6.3rem] h-[3.4rem] p-2': lg,
            'w-[5.8rem] h-[3.2rem] p-2': md,
            'w-[3.5rem] h-[2.5rem] p-2': sm,
            'w-[3rem] h-[3rem] p-2': xs,
            'w-[2.5rem] h-[2.2rem] p-2': twoXs,
          }" @click="Clear('-')">
          C
        </div>
      </div> -->
      <!-- =====>> Second Row <<===== -->
      <div flex="~" justify="around" md:justify="evenly">
        <div flex="~" justify="center" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
          duration="150" text="info 4xl" rounded="5px" :class="{
            'w-[8.5rem] h-[4.5rem] p-2 text-info text-7xl': twoXl,
            'w-[7.5rem] h-[3.8rem] p-2 text-info text-6xl': xl,
            'w-[6.3rem] h-[3.4rem] p-2 text-info text-5xl': lg,
            'w-[5.8rem] h-[3.2rem] p-2 text-info text-4xl': md,
            'w-[3.5rem] h-[2.5rem] p-2 text-info text-3xl': sm,
            'w-[3rem] h-[3rem] p-2 text-info text-3xl': xs,
            'w-[2.5rem] h-[2.2rem] p-2 text-info text-2xl': twoXs,
          }" @click="Operation('*')">
          ×
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-[8.5rem] h-[4.5rem] p-2': twoXl,
            'w-[7.5rem] h-[3.8rem] p-2': xl,
            'w-[6.3rem] h-[3.4rem] p-2': lg,
            'w-[5.8rem] h-[3.2rem] p-2': md,
            'w-[3.5rem] h-[2.5rem] p-2': sm,
            'w-[3rem] h-[3rem] p-2': xs,
            'w-[2.5rem] h-[2.2rem] p-2': twoXs,
          }" @click="ButtonClicked('9')">
          9
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-[8.5rem] h-[4.5rem] p-2': twoXl,
            'w-[7.5rem] h-[3.8rem] p-2': xl,
            'w-[6.3rem] h-[3.4rem] p-2': lg,
            'w-[5.8rem] h-[3.2rem] p-2': md,
            'w-[3.5rem] h-[2.5rem] p-2': sm,
            'w-[3rem] h-[3rem] p-2': xs,
            'w-[2.5rem] h-[2.2rem] p-2': twoXs,
          }" @click="ButtonClicked('8')">
          8
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-[8.5rem] h-[4.5rem] p-2': twoXl,
            'w-[7.5rem] h-[3.8rem] p-2': xl,
            'w-[6.3rem] h-[3.4rem] p-2': lg,
            'w-[5.8rem] h-[3.2rem] p-2': md,
            'w-[3.5rem] h-[2.5rem] p-2': sm,
            'w-[3rem] h-[3rem] p-2': xs,
            'w-[2.5rem] h-[2.2rem] p-2': twoXs,
          }" @click="ButtonClicked('7')">
          7
        </div>
      </div>
      <!-- =====>> Third Row <<===== -->
      <div flex="~" justify="around" md:justify="evenly">
        <div flex="~" justify="center" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
          duration="150" rounded="5px" :class="{
            'w-[8.5rem] h-[4.5rem] text-info text-7xl items-center p-2':
              twoXl,
            'w-[7.5rem] h-[3.8rem] text-info text-6xl items-center p-2 ':
              xl,
            'w-[6.3rem] h-[3.4rem] text-info text-5xl items-center p-2':
              lg,
            'w-[5.8rem] h-[3.2rem] text-info text-4xl items-center p-2':
              md,
            'w-[3.5rem] h-[2.5rem] text-info text-3xl items-center p-2':
              sm,
            'w-[3rem] h-[3rem] text-info text-2xl p-2': xs,
            'w-[2.5rem] h-[2.2rem] text-info text-2xl p-2': twoXs,
          }" @click="Operation('+')">
          +
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-[8.5rem] h-[4.5rem] p-2': twoXl,
            'w-[7.5rem] h-[3.8rem] p-2': xl,
            'w-[6.3rem] h-[3.4rem] p-2': lg,
            'w-[5.8rem] h-[3.2rem] p-2': md,
            'w-[3.5rem] h-[2.5rem] p-2': sm,
            'w-[3rem] h-[3rem] p-2': xs,
            'w-[2.5rem] h-[2.2rem] p-2': twoXs,
          }" @click="ButtonClicked('6')">
          6
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-[8.5rem] h-[4.5rem] p-2': twoXl,
            'w-[7.5rem] h-[3.8rem] p-2': xl,
            'w-[6.3rem] h-[3.4rem] p-2': lg,
            'w-[5.8rem] h-[3.2rem] p-2': md,
            'w-[3.5rem] h-[2.5rem] p-2': sm,
            'w-[3rem] h-[3rem] p-2': xs,
            'w-[2.5rem] h-[2.2rem] p-2': twoXs,
          }" @click="ButtonClicked('5')">
          5
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-[8.5rem] h-[4.5rem] p-2': twoXl,
            'w-[7.5rem] h-[3.8rem] p-2': xl,
            'w-[6.3rem] h-[3.4rem] p-2': lg,
            'w-[5.8rem] h-[3.2rem] p-2': md,
            'w-[3.5rem] h-[2.5rem] p-2': sm,
            'w-[3rem] h-[3rem] p-2': xs,
            'w-[2.5rem] h-[2.2rem] p-2': twoXs,
          }" @click="ButtonClicked('4')">
          4
        </div>
      </div>
      <!-- =====>> Forth Row <<===== -->
      <div flex="~" justify="around" md:justify="evenly">
        <div flex="~" justify="center" lg:items="center" items="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="info 4xl" lg:text="info 3xl"
          md:text="info 3xl" text="info 2xl" font="black" rounded="5px" :class="{
            'w-[8.5rem] h-[4.5rem] p-2': twoXl,
            'w-[7.5rem] h-[3.8rem] p-2': xl,
            'w-[6.3rem] h-[3.4rem] p-2': lg,
            'w-[5.8rem] h-[3.2rem] p-2': md,
            'w-[3.5rem] h-[2.5rem] p-2': sm,
            'w-[3rem] h-[3rem] p-2': xs,
            'w-[2.5rem] h-[2.2rem] p-2': twoXs,
          }" @click="Operation('-')">
          –
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-[8.5rem] h-[4.5rem] p-2': twoXl,
            'w-[7.5rem] h-[3.8rem] p-2': xl,
            'w-[6.3rem] h-[3.4rem] p-2': lg,
            'w-[5.8rem] h-[3.2rem] p-2': md,
            'w-[3.5rem] h-[2.5rem] p-2': sm,
            'w-[3rem] h-[3rem] p-2': xs,
            'w-[2.5rem] h-[2.2rem] p-2': twoXs,
          }" @click="ButtonClicked('3')">
          3
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-[8.5rem] h-[4.5rem] p-2': twoXl,
            'w-[7.5rem] h-[3.8rem] p-2': xl,
            'w-[6.3rem] h-[3.4rem] p-2': lg,
            'w-[5.8rem] h-[3.2rem] p-2': md,
            'w-[3.5rem] h-[2.5rem] p-2': sm,
            'w-[3rem] h-[3rem] p-2': xs,
            'w-[2.5rem] h-[2.2rem] p-2': twoXs,
          }" @click="ButtonClicked('2')">
          2
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-[8.5rem] h-[4.5rem] p-2': twoXl,
            'w-[7.5rem] h-[3.8rem] p-2': xl,
            'w-[6.3rem] h-[3.4rem] p-2': lg,
            'w-[5.8rem] h-[3.2rem] p-2': md,
            'w-[3.5rem] h-[2.5rem] p-2': sm,
            'w-[3rem] h-[3rem] p-2': xs,
            'w-[2.5rem] h-[2.2rem] p-2': twoXs,
          }" @click="ButtonClicked('1')">
          1
        </div>
      </div>
      <!-- =====>> Fifth Row <<===== -->
      <div flex="~ " justify="around" md:justify="evenly">
        <div flex="~" items="center" justify="center" cursor="pointer" bg="info" hover="bg-opacity-50"
          text="primaryOp dark:primary 4xl" rounded="5px" :class="{
            'w-[8.5rem] h-[4.5rem] p-2': twoXl,
            'w-[7.5rem] h-[3.8rem] p-2': xl,
            'w-[6.3rem] h-[3.4rem] p-2': lg,
            'w-[5.8rem] h-[3.2rem] p-2': md,
            'w-[3.5rem] h-[2.5rem] p-2': sm,
            'w-[3rem] h-[3rem] p-2': xs,
            'w-[2.5rem] h-[2.2rem] p-2': twoXs,
          }" @click="Operation('=')">
          =
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 2xl"
          lg:text="primaryOp dark:primary 2xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-[8.5rem] h-[4.5rem] p-2': twoXl,
            'w-[7.5rem] h-[3.8rem] p-2': xl,
            'w-[6.3rem] h-[3.4rem] p-2': lg,
            'w-[5.8rem] h-[3.2rem] p-2': md,
            'w-[3.5rem] h-[2.5rem] p-2': sm,
            'w-[3rem] h-[3rem] p-2': xs,
            'w-[2.5rem] h-[2.2rem] p-2': twoXs,
          }" @click="ButtonClicked('000')">
          000
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-[8.5rem] h-[4.5rem] p-2': twoXl,
            'w-[7.5rem] h-[3.8rem] p-2': xl,
            'w-[6.3rem] h-[3.4rem] p-2': lg,
            'w-[5.8rem] h-[3.2rem] p-2': md,
            'w-[3.5rem] h-[2.5rem] p-2': sm,
            'w-[3rem] h-[3rem] p-2': xs,
            'w-[2.5rem] h-[2.2rem] p-2': twoXs,
          }" @click="ButtonClicked('0')">
          0
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" text="primaryOp dark:primary 6xl"
          rounded="5px" :class="{
            'w-[8.5rem] h-[4.5rem] p-2': twoXl,
            'w-[7.5rem] h-[3.8rem] p-2': xl,
            'w-[6.3rem] h-[3.4rem] p-2': lg,
            'w-[5.8rem] h-[3.2rem] p-2': md,
            'w-[3.5rem] h-[2.5rem] p-2': sm,
            'w-[3rem] h-[3rem] p-2': xs,
            'w-[2.5rem] h-[2.2rem] p-2': twoXs,
          }" @click="Operation('.')">
          .
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onKeyStroke } from "#imports";

const props = defineProps(['windowBreakpoint'])

const {
  size,
  twoXs,
  xs,
  sm,
  md,
  lg,
  xl,
  twoXl
} = props.windowBreakpoint

const ButtonClicked = (number) => {
  if (screen.value.length > 13) return;
  if (screen.value == "0" && number == "000") return;
  if (screen.value == "0") {
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

const clearEsc = (event) => {
  if (screen.value === "Escape") {
    screen.value = "0";
  }
};

</script>
