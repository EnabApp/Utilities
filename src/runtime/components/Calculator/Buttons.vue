<template>
  <div h='[15%]'>
    <div h-full xl:class="grid gap-6px grid-rows-5 justify-between items-start" >
      <!-- =====>> First Row <<===== -->
      <div flex="~" justify="around" md:justify="evenly" h-full>
        <div flex="~" justify="center" items="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" rounded="5px" @click="Backspace()"
          :class="{
            'w-full h-[full text-info text-5xl p-2': twoXl,
            'w-full h-full text-info text-4xl p-2': xl,
            'w-full h-[5rem] text-info text-3xl p-2': lg,
            'w-full h-[3.2rem] text-info text-3xl p-2': md,
            'w-full h-full] text-info text-2xl p-2': sm,
            'w-full h-[3rem] text-info text-2xl p-2': xs,
            'w-full h-[2.2rem] text-info text-xl p-2': twoXs,
          }">
          <div class="i-akar-icons-backspace-fill" />
        </div>
        <div flex="~" justify="center" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
          duration="150" rounded="5px" :class="{
            'w-full h-[full] text-info text-7xl p-2 items-center': twoXl,
            'w-full h-full text-info text-6xl p-2 items-center': xl,
            'w-full h-[5rem] text-info text-7xl p-2 items-center': lg,
            'w-full h-[3.2rem] text-info text-6xl p-2 items-end': md,
            'w-[99%] h-[3rem] text-info text-5xl p-2 items-end': sm,
            'w-full h-[3.2rem] text-info text-4xl p-2 items-start': xs,
            'w-full h-[2.2rem] text-info text-4xl p-2 items-end': twoXs,
          }" @click="Operation('/')">
          ÷
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" font="black" rounded="5px" :class="{
            'w-full h-[full] p-2 text-info text-5xl': twoXl,
            'w-full h-full p-2 text-info text-4xl': xl,
            'w-full h-[5rem] p-2 text-info text-4xl': lg,
            'w-full h-[3.2rem] p-2 text-info text-3xl': md,
            'w-[99%] h-[3.2rem] text-info text-3xl p-2 items-end': sm,
            'w-full h-[2rem] p-2 text-info text-2xl py-[1rem]': xs,
            'w-full h-[2.2rem] p-2 text-info text-xl': twoXs,
          }" @click="Operation('%')">
          %
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" rounded="5px" :class="{
            'w-full h-[full] text-error text-5xl p-2': twoXl,
            'w-full h-full text-error text-4xl p-2': xl,
            'w-full h-[5rem] text-error text-4xl p-2': lg,
            'w-full h-[3.2rem] text-error text-3xl p-2': md,
            'w-[99%] h-[3.2rem] text-error text-3xl p-2 items-end': sm,
            'w-full h-[3rem] text-error text-2xl p-2': xs,
            'w-full h-[2.2rem] text-error text-xl p-2': twoXs,
          }" @click="Clear('-')">
          C
        </div>
      </div>
      <!-- =====>> Second Row <<===== -->
      <div flex="~" justify="around" md:justify="evenly" h-full>
        <div flex="~" justify="center" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
          duration="150" rounded="5px" :class="{
            'w-full h-full p-2 text-info text-7xl items-center': twoXl,
            'w-full h-[full] p-2 text-info text-6xl items-center': xl,
            'w-full h-[5rem] p-2 text-info text-5xl items-center': lg,
            'w-full h-[3.2rem] p-2 text-info text-4xl': md,
            'w-[99%] h-[3rem] text-info text-4xl p-2 items-end': sm,
            'w-full h-[3rem] p-2 text-info text-3xl': xs,
            'w-full h-[2.2rem] p-2 text-info text-2xl': twoXs,
          }" @click="Operation('*')">
          ×
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary"
          lg:text="primaryOp dark:primary " md:text="primaryOp dark:primary" text="primaryOp dark:primary "
          rounded="5px" :class="{
            'w-full h-full text-4xl p-2': twoXl,
            'w-full h-[full] text-4xl p-2': xl,
            'w-full h-[5rem] text-4xl p-2': lg,
            'w-full h-[3.2rem] text-4xl p-2': md,
            'w-full h-[3rem] text-4xl p-2': sm,
            'w-[99%] h-[3rem] text-4xl p-2 ': xs,
            'w-full h-[2.2rem] text-4xl p-2': twoXs,
          }" @click="ButtonClicked('9')">
          9
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary " md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-full text-4xl p-2': twoXl,
            'w-full h-[full] text-4xl p-2': xl,
            'w-full h-[5rem] text-4xl p-2': lg,
            'w-full h-[3.2rem] text-3xl p-2': md,
            'w-full h-[3rem] text-3xl p-2': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': xs,
            'w-full h-[2.2rem] text-xl p-2': twoXs,
          }" @click="ButtonClicked('8')">
          8
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-full text-4xl p-2': twoXl,
            'w-full h-[full] text-4xl p-2': xl,
            'w-full h-[5rem] text-4xl p-2': lg,
            'w-full h-[3.2rem] text-3xl p-2': md,
            'w-full h-[3rem] text-3xl p-2': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': xs,
            'w-full h-[2.2rem] text-xl p-2': twoXs,
          }" @click="ButtonClicked('7')">
          7
        </div>
      </div>
      <!-- =====>> Third Row <<===== -->
      <div flex="~" justify="around" md:justify="evenly" h-full>
        <div flex="~" justify="center" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
          duration="150" rounded="5px" :class="{
            'w-full h-[full] text-info text-7xl items-center p-2': twoXl,
            'w-full h-full text-info text-6xl items-center p-2 ': xl,
            'w-full h-[5rem] text-info text-5xl items-center p-2': lg,
            'w-full h-[3.2rem] text-info text-4xl items-center p-2': md,
            'w-full h-[3rem] text-info text-4xl items-center p-2': sm,
            'w-full h-[3rem] text-info text-2xl p-2': xs,
            'w-full h-[2.2rem] text-info text-2xl p-2': twoXs,
          }" @click="Operation('+')">
          +
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-[full] text-4xl p-2': twoXl,
            'w-full h-full text-4xl p-2': xl,
            'w-full h-[5rem] text-4xl p-2': lg,
            'w-full h-[3.2rem] text-3xl p-2': md,
            'w-full h-[3rem] text-3xl p-2': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': xs,
            'w-full h-[2.2rem] text-xl p-2': twoXs,
          }" @click="ButtonClicked('6')">
          6
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-[full] text-4xl p-2': twoXl,
            'w-full h-full text-4xl p-2': xl,
            'w-full h-[5rem] text-4xl p-2': lg,
            'w-full h-[3.2rem] text-3xl p-2': md,
            'w-full h-[3rem] text-3xl p-2': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': xs,
            'w-full h-[2.2rem] text-xl p-2': twoXs,
          }" @click="ButtonClicked('5')">
          5
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-[full] text-4xl p-2': twoXl,
            'w-full h-full text-4xl p-2': xl,
            'w-full h-[5rem] text-4xl p-2': lg,
            'w-full h-[3.2rem] text-3xl p-2': md,
            'w-full h-[3rem] text-3xl p-2': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': xs,
            'w-full h-[2.2rem] text-xl p-2': twoXs,
          }" @click="ButtonClicked('4')">
          4
        </div>
      </div>
      <!-- =====>> Forth Row <<===== -->
      <div flex="~" justify="around" md:justify="evenly" h-full>
        <div flex="~" justify="center" lg:items="center" items="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" lg:text="info 3xl" md:text="info 3xl"
          text="info 2xl" font="black" rounded="5px" :class="{
            'w-full h-full text-info text-7xl p-2': twoXl,
            'w-full h-[full] text-info text-6xl p-2': xl,
            'w-full h-[5rem] text-info text-6xl p-2': lg,
            'w-full h-[3.2rem] text-info text-5xl p-2': md,
            'w-[99%] h-[3rem]  text-info text-4xl p-2 ': sm,
            'w-full h-[3rem] text-info text-3xl p-2': xs,
            'w-full h-[2.2rem] text-info text-2xl p-2': twoXs,
          }" @click="Operation('-')">
          –
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-[full] text-4xl p-2': twoXl,
            'w-full h-full text-4xl p-2': xl,
            'w-full h-[5rem] text-4xl p-2': lg,
            'w-full h-[3.2rem] text-3xl p-2': md,
            'w-full h-[3rem] text-3xl p-2': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': xs,
            'w-full h-[2.2rem] text-xl p-2': twoXs,
          }" @click="ButtonClicked('3')">
          3
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-[full] text-4xl p-2': twoXl,
            'w-full h-full text-4xl p-2': xl,
            'w-full h-[5rem] text-4xl p-2': lg,
            'w-full h-[3.2rem] text-3xl p-2': md,
            'w-full h-[3rem] text-3xl p-2': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': xs,
            'w-full h-[2.2rem] text-xl p-2': twoXs,
          }" @click="ButtonClicked('2')">
          2
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-[full] text-4xl p-2': twoXl,
            'w-full h-full text-4xl p-2': xl,
            'w-full h-[5rem] text-4xl p-2': lg,
            'w-full h-[3.2rem] text-3xl p-2': md,
            'w-full h-[3rem] text-3xl p-2': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': xs,
            'w-full h-[2.2rem] text-xl p-2': twoXs,
          }" @click="ButtonClicked('1')">
          1
        </div>
      </div>
      <!-- =====>> Fifth Row <<===== -->
      <div flex="~ " justify="around" md:justify="evenly" h-full>
        <div flex="~" items="center" justify="center" cursor="pointer" bg="info" hover="bg-opacity-50"
          text="primaryOp dark:primary 4xl" rounded="5px" :class="{
            'w-full h-[full] text-6xl p-2': twoXl,
            'w-full h-full text-5xl p-2': xl,
            'w-full h-[5rem] p-2': lg,
            'w-full h-[3.2rem] p-2': md,
            'w-[99%] h-[3rem] text-5xl p-2 items-end': sm,
            'w-full h-[3rem] p-2': xs,
            'w-full h-[2.2rem] p-2': twoXs,
          }" @click="Operation('=')">
          =
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 2xl"
          lg:text="primaryOp dark:primary 2xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-[full] text-4xl p-2': twoXl,
            'w-full h-full text-4xl p-2': xl,
            'w-full h-[5rem] text-4xl p-2': lg,
            'w-full h-[3.2rem] text-3xl p-2': md,
            'w-full h-[3rem] text-3xl p-2': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': xs,
            'w-full h-[2.2rem] text-xl p-2': twoXs,
          }" @click="ButtonClicked('000')">
          000
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-[full] text-4xl p-2': twoXl,
            'w-full h-full text-4xl p-2': xl,
            'w-full h-[5rem] text-4xl p-2': lg,
            'w-full h-[3.2rem] text-3xl p-2': md,
            'w-full h-[3rem] text-3xl p-2': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': sm,
            'w-[99%] h-[3rem] text-2xl p-2 ': xs,
            'w-full h-[2.2rem] text-xl p-2': twoXs,
          }" @click="ButtonClicked('0')">
          0
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" text="primaryOp dark:primary 6xl"
          rounded="5px" :class="{
            'w-full h-[full] p-2': twoXl,
            'w-full h-full p-2': xl,
            'w-full h-[5rem] p-2': lg,
            'w-full h-[3.2rem] p-2': md,
            'w-[99%] h-[3rem] text-5xl p-2 items-end': sm,
            'w-full h-[3rem] p-2': xs,
            'w-full h-[2.2rem] p-2': twoXs,
          }" @click="Operation('.')">
          .
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onKeyStroke } from "#imports";

// const props = defineProps(['windowBreakpoint'])

const props = defineProps({
  screen: {
    type: String,
    required: true,
  },
  windowBreakpoint: {
    type: Object,
  },
});

const { size, twoXs, xs, sm, md, lg, xl, twoXl } = props.windowBreakpoint;

const ButtonClicked = (number) => {
  if (props.screen.value.length > 13) return;
  if (props.screen.value == "0" && number == "000") return;
  if (props.screen.value == "0") {
    props.screen.value = number;
  } else {
    props.screen.value += number;
  }
};
//= ====>> Operations Function <<=====//
const Operation = (operation) => {
  const lastChar = props.screen.value.slice(-1);
  if (lastChar == operation) {
    return;
  }
  if (
    lastChar == "*" ||
    lastChar == "+" ||
    lastChar == "-" ||
    lastChar == "/"
  ) {
    props.screen.value += lastChar;
  }
  if (operation === "=" || operation === "Enter") {
    const history = props.screen.value.toString();
    props.screen.value = eval(props.screen.value).toString().substring(0, 19);
    props.screenHistory.value.push({
      history,
      result: props.screen.value,
    });
  } else if (operation === "%") {
    props.screen.value = (eval(props.screen.value) / 100)
      .toString()
      .substring(0, 19);
  } else {
    props.screen.value += operation;
  }
};

//=====>> Clear / Deletes All Numbers <<=====//
const Clear = () => {
  props.screen.value = "0";
};

//=====>> BackSpace / Delete One Number  <<=====//
const Backspace = () => {
  props.screen.value =
    props.screen.value.length <= 1 ? "0" : props.screen.value.slice(0, -1);
};

//=====>> keyboard <<=====//
onKeyStroke(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."], (e) => {
  if (!(props.app.id == AppManager.focused)) {
    return;
  }

  if (props.screen.value.length > 19) {
    return;
  }
  if (props.screen.value == "0") {
    props.screen.value = e.key;
  } else {
    props.screen.value += e.key;
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
</script>
