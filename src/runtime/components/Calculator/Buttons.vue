<template>
  <div class="h-5/6">
    <div class="flex flex-col  h-5/5 gap-0">
      <!-- =====>> First Row <<===== -->
      <div flex="~" justify="around" md:justify="evenly" class="h-1/5">
        <div flex="~" justify="center" items="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" rounded="5px" @click="calculatorStore.Backspace()"
          :class="{
            'w-full h-full text-info text-5xl ': twoXl,
            'w-full h-full text-info text-4xl px': xl,
            'w-full h-full text-info text-3xl ': lg,
            'w-full  text-info text-3xl ': md,
            'w-full h-full text-info text-2xl py-1': sm,
            'w-full h-full text-info text-2xl ': xs,
            'w-full h-full text-info text-xl ': twoXs,
          }">
          <div class="i-akar-icons-backspace-fill" />
        </div>
        <div flex="~" justify="center" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
          duration="150" rounded="5px" :class="{
            'w-full h-[full] text-info text-7xl  items-center': twoXl,
            'w-full h-full text-info text-6xl items-center px': xl,
            'w-full h-full text-info text-7xl  items-center': lg,
            'w-full  text-info text-6xl  items-center': md,
            'w-[99%] h-[full] text-info text-5xl  items-center': sm,
            'w-full h-h-full text-info text-4xl  items-center': xs,
            'w-full items-center text-info text-4xl  items-end': twoXs,
          }" @click="calculatorStore.Operation('/')">
          ÷
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" font="black" rounded="5px" :class="{
            'w-full h-full text-info text-5xl': twoXl,
            'w-full h-full  text-info text-4xl px': xl,
            'w-full h-full  text-info text-4xl ': lg,
            'w-full   text-info text-3xl ': md,
            'w-[99%] h-[full] text-info text-3xl  items-end ': sm,
            'w-full h-full  text-info text-2xl ': xs,
            'w-full items-center  text-info text-xl ': twoXs,
          }" @click="calculatorStore.Operation('%')">
          %
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" rounded="5px" :class="{
            'w-full h-full text-error text-5xl': twoXl,
            'w-full h-full text-error text-4xl px': xl,
            'w-full h-full text-error text-4xl ': lg,
            'w-full  text-error text-3xl ': md,
            'w-[99%] h-[full] text-error text-3xl  items-end': sm,
            'w-full h-full text-error text-2xl ': xs,
            'w-full items-center text-error text-xl ': twoXs,
          }" @click="calculatorStore.Clear('-')">
          C
        </div>
      </div>
      <!-- =====>> Second Row <<===== -->
      <div flex="~" justify="around" md:justify="evenly" class="h-1/5">
        <div flex="~" justify="center" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
          duration="150" rounded="5px" :class="{
            'w-full h-full  text-info text-7xl items-center': twoXl,
            'w-full h-[full]  text-info text-6xl items-center px': xl,
            'w-full h-full  text-info text-5xl items-center': lg,
            'w-full   text-info text-4xl items-center': md,
            'w-[99%] h-[full] text-info text-4xl  items-center': sm,
            'w-full h-full  text-info text-3xl items-center': xs,
            'w-full items-center  text-info text-2xl': twoXs,
          }" @click="calculatorStore.Operation('*')">
          ×
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary"
          lg:text="primaryOp dark:primary " md:text="primaryOp dark:primary" text="primaryOp dark:primary "
          rounded="5px" :class="{
            'w-full h-full  text-4xl ': twoXl,
            'w-full h-full text-4xl px': xl,
            'w-full h-full text-4xl ': lg,
            'w-full  text-4xl ': md,
            'w-full h-[full] text-4xl ': sm,
            'w-[99%] h-full text-4xl  ': xs,
            'w-full items-center text-4xl ': twoXs,
          }" @click="calculatorStore.ButtonClicked('9')">
          9
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary " md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-full px-1 text-4xl ': twoXl,
            'w-full text-4xl px': xl,
            'w-full h-full text-4xl ': lg,
            'w-full  text-3xl ': md,
            'w-full h-[full] text-3xl ': sm,
            'w-[99%] h-full text-2xl  ': xs,
            'w-full items-center text-xl ': twoXs,
          }" @click="calculatorStore.ButtonClicked('8')">
          8
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-full px-1 text-4xl ': twoXl,
            'w-full h-full text-4xl px': xl,
            'w-full h-full text-4xl ': lg,
            'w-full text-3xl ': md,
            'w-full h-full text-2xl  ': sm,
            'w-[99%] h-full text-2xl  ': xs,
            'w-full items-center text-xl ': twoXs,
          }" @click="calculatorStore.ButtonClicked('7')">
          7
        </div>
      </div>
      <!-- =====>> Third Row <<===== -->
      <div flex="~" justify="around" md:justify="evenly" class="h-1/5">
        <div flex="~" justify="center" cursor="pointer" hover="bg-secondary dark:secondaryOp dark:bg-opacity-25"
          duration="150" rounded="5px" :class="{
            'w-full h-[full] text-info text-7xl items-center ': twoXl,
            'w-full h-full text-info text-6xl items-center  px': xl,
            'w-full h-full text-info text-5xl items-center ': lg,
            'w-full  text-info text-4xl items-center ': md,
            'w-full h-[full] text-info text-4xl items-center ': sm,
            'w-full h-full text-info text-2xl items-center': xs,
            'w-full items-center text-info text-2xl ': twoXs,
          }" @click="calculatorStore.Operation('+')">
          +
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-[full] text-4xl ': twoXl,
            'w-full h-full text-4xl px ': xl,
            'w-full h-full text-4xl ': lg,
            'w-full text-3xl ': md,
            'w-full h-[full] text-3xl ': sm,
            'w-[99%] h-full text-2xl  ': xs,
            'w-full items-center text-xl ': twoXs,
          }" @click="calculatorStore.ButtonClicked('6')">
          6
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-[full] text-4xl ': twoXl,
            'w-full h-full text-4xl px': xl,
            'w-full h-full text-4xl ': lg,
            'w-full text-3xl ': md,
            'w-full h-full text-2xl  ': sm,
            'w-[99%] h-full text-2xl  ': xs,
            'w-full items-center text-xl ': twoXs,
          }" @click="calculatorStore.ButtonClicked('5')">
          5
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-[full] text-4xl ': twoXl,
            'w-full h-full text-4xl px': xl,
            'w-full h-full text-4xl ': lg,
            'w-full text-3xl ': md,
            'w-full h-full text-2xl  ': sm,
            'w-[99%] h-full text-2xl  ': xs,
            'w-full items-center text-xl ': twoXs,
          }" @click="calculatorStore.ButtonClicked('4')">
          4
        </div>
      </div>
      <!-- =====>> Forth Row <<===== -->
      <div flex="~" justify="around" md:justify="evenly" class="h-1/5">
        <div flex="~" justify="center" lg:items="center" items="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" lg:text="info 3xl" md:text="info 3xl"
          text="info 2xl" font="black" rounded="5px" :class="{
            'w-full h-full text-info text-7xl ': twoXl,
            'w-full h-[full] text-info text-6xl px': xl,
            'w-full h-full text-info text-6xl ': lg,
            'w-full text-info text-5xl ': md,
            'w-[99%] h-full  text-info text-4xl  ': sm,
            'w-full h-full text-info text-3xl ': xs,
            'w-full items-center text-info text-2xl ': twoXs,
          }" @click="calculatorStore.Operation('-')">
          –
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-[full] text-4xl ': twoXl,
            'w-full h-full text-4xl px': xl,
            'w-full h-full text-4xl ': lg,
            'w-full text-3xl ': md,
            'w-full h-full text-3xl ': sm,
            'w-[99%] h-full text-2xl  ': xs,
            'w-full items-center text-xl ': twoXs,
          }" @click="calculatorStore.ButtonClicked('3')">
          3
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-[full] text-4xl ': twoXl,
            'w-full h-full text-4xl px': xl,
            'w-full h-full text-4xl ': lg,
            'w-full text-3xl ': md,
            'w-full h-full text-3xl ': sm,
            'w-[99%] h-full text-2xl  ': xs,
            'w-full items-center text-xl ': twoXs,
          }" @click="calculatorStore.ButtonClicked('2')">
          2
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-[full] text-4xl ': twoXl,
            'w-full h-full text-4xl px': xl,
            'w-full h-full text-4xl ': lg,
            'w-full text-3xl ': md,
            'w-full h-full text-3xl ': sm,
            'w-[99%] h-full text-2xl  ': xs,
            'w-full items-center text-xl ': twoXs,
          }" @click="calculatorStore.ButtonClicked('1')">
          1
        </div>
      </div>
      <!-- =====>> Fifth Row <<===== -->
      <div flex="~" justify="around" md:justify="evenly" class="h-1/5">
        <div flex="~" items="center" justify="center" cursor="pointer" bg="info" hover="bg-opacity-50"
          text="primaryOp dark:primary 4xl" rounded="5px" :class="{
            'w-[99%] h-[full] text-6xl ': twoXl,
            'w-full h-[full] text-5xl px': xl,
            'w-full h-full text-4xl ': lg,
            'w-full ': md,
            'w-[99%] h-full text-5xl  items-end': sm,
            'w-full h-full ': xs,
            'w-full items-center ': twoXs,
          }" @click="calculatorStore.Operation('=')">
          =
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 2xl"
          lg:text="primaryOp dark:primary 2xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-[full] text-4xl ': twoXl,
            'w-full h-full text-4xl px': xl,
            'w-full h-full text-4xl ': lg,
            'w-full text-3xl ': md,
            'w-full h-full text-3xl ': sm,
            'w-[99%] h-full text-2xl  ': xs,
            'w-full items-center text-xl ': twoXs,
          }" @click="calculatorStore.ButtonClicked('000')">
          000
        </div>
        <div flex="~" items="center" justify="center" cursor="pointer"
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" xl:text="primaryOp dark:primary 4xl"
          lg:text="primaryOp dark:primary 3xl" md:text="primaryOp dark:primary 2xl" text="primaryOp dark:primary xl"
          rounded="5px" :class="{
            'w-full h-[full] text-4xl ': twoXl,
            'w-full h-full text-4xl px': xl,
            'w-full h-full text-4xl ': lg,
            'w-full text-3xl ': md,
            'w-full h-full text-3xl ': sm,
            'w-[99%] h-full text-2xl  ': xs,
            'w-full items-center text-xl ': twoXs,
          }" @click="calculatorStore.ButtonClicked('0')">
          0
        </div>
        <div flex="~" cursor="pointer" justify-center items-center
          hover="bg-secondary dark:secondaryOp dark:bg-opacity-25" duration="150" text="primaryOp dark:primary 6xl"
          rounded="5px" :class="{
            'w-full h-[full] text-4xl ': twoXl,
            'w-full h-full text-4xl px': xl,
            'w-full h-full text-4xl ': lg,
            'w-full text-3xl ': md,
            'w-full h-full text-3xl ': sm,
            'w-[99%] h-full text-2xl  ': xs,
            'w-full items-center text-xl ': twoXs,
          }" @click="calculatorStore.Operation('.')">
          .
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onKeyStroke, useCalculatorStore } from "#imports";

const props = defineProps({
  screen: {
    type: String
  },
  windowBreakpoint: {
    type: Object
  },
  screenHistory: {
    type: String
  },
  historyState: {
    type: Object
  },
})


const { size, twoXs, xs, sm, md, lg, xl, twoXl } = props.windowBreakpoint;
//= ====>> Buttons Clicked Function <<=====//

//= ====>> Operations Function <<=====//
const calculatorStore = useCalculatorStore()



//=====>> Clear / Deletes All Numbers <<=====//


//=====>> BackSpace / Delete One Number  <<=====//


//=====>> keyboard <<=====//
onKeyStroke(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."], (e) => {
  if (!(props.app.id == AppManager.focused)) {
    return;
  }
  if (props.screen.length > 19) {
    return;
  }
  if (props.screen == "0") {
    props.screen = e.key;
  } else {
    props.screen += e.key;
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


</script>
