<template>
  <!-- Application -->
      <div
        p="x-10px b-5px"
        text="2xl right primaryOp dark:primary"
        dir="ltr"
        w="full"
        class="text-3xl"
        ref="windowRef"
        :class="{
          'text-6xl': xl,
          'text-7xl': twoXl,
        }"
      >
        {{ ans.toLocaleString("en-US", { maximumFractionDigits: 8 }) }}
        {{ operators[operator] }}
        {{
          num !== 0
            ? num.toLocaleString("en-US", {
                maximumFractionDigits: 8,
              })
            : ""
        }}
      </div>
      <div m="5px" h="full" flex="~ col" justify="end">
        <div class="grid grid-cols-4 gap-1px">
          <button
            cursor="pointer"
            duration="150"
            rounded="5px"
            p="y-10px"
            w="full"
            font="semibold"
            border="none"
            :class="{
              'text-lg': twoXs,
              'text-xl': xs,
              'text-2xl': sm,
              'text-3xl': md,
              'text-4xl': lg,
              'text-5xl': xl,
              'text-6xl': twoXl,
              'text-info dark:text-info hover:bg-secondaryOp hover:bg-opacity-25 bg-inherit':
                ((index + 1) % 4 === 0 || index < 7 || index === 20) &&
                button !== '=' &&
                button !== 'C',
              'text-error bg-inherit hover:bg-error hover:text-primary':
                button === 'C',
              'bg-info text-primary hover:bg-opacity-50': button === '=',
              'bg-inherit dark:text-primary':
                ((index + 1) % 4 !== 0 || index < 7 || index !== 20) &&
                button !== '=' &&
                button !== 'C',
            }"
            v-for="(button, index) in buttons"
            :key="index"
            @click="handleClick(button)"
            type="button"
          >
            {{ button }}
          </button>
        </div>
      </div>
</template>

<script setup lang="ts">
import { ref, useBreakpointWindow, useAppManager } from "#imports";
import { storeToRefs } from "pinia";
import { useCalculatorStore } from "../composables/useCalculatorStore";

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});

const AppManager = useAppManager();

const windowRef = ref(null);
const BreakpointWindow = useBreakpointWindow(windowRef);
const { size, twoXs, xs, sm, md, lg, xl, twoXl } = BreakpointWindow;

const store = useCalculatorStore();
const { ans, operator, num } = storeToRefs(store);
const { calculate, addToNumber } = store;

const buttons = [
  "C",
  "π",
  "%",
  "Del",
  "1/x",
  "x²",
  "√x",
  "÷",
  7,
  8,
  9,
  "x",
  4,
  5,
  6,
  "-",
  1,
  2,
  3,
  "+",
  "+/-",
  0,
  ".",
  "=",
];

const operators: any = {
  add: "+",
  subtract: "-",
  multiply: "x",
  divide: "÷",
};

const handleClick = (button: string | number) => {
  if (typeof button === "number") {
    addToNumber(button);
  } else {
    if (button === "C") {
      ans.value = 0;
      num.value = 0;
      operator.value = "";
    } else if (button === "π") {
      if (operator.value === "") {
        ans.value = 3.142;
      } else {
        num.value = 3.142;
      }
    } else if (button === "%") {
      checkCalculate();
      ans.value = parseFloat((ans.value / 100).toFixed(3));
    } else if (button === "Del") {
      if (operator.value === "") {
        if (ans.value.toString().length === 1) {
          ans.value = 0;
        } else {
          ans.value = parseFloat(ans.value.toString().slice(0, -1));
        }
      } else if (num.value === 0) {
        operator.value = "";
      } else {
        if (num.value.toString().length === 1) {
          num.value = 0;
        } else {
          num.value = parseFloat(num.value.toString().slice(0, -1));
        }
      }
    } else if (button === "1/x") {
      checkCalculate();
      ans.value = parseFloat((1 / ans.value).toFixed(8));
    } else if (button === "x²") {
      checkCalculate();
      ans.value = parseFloat((ans.value * ans.value).toFixed(8));
    } else if (button === "√x") {
      checkCalculate();
      ans.value = parseFloat(Math.sqrt(ans.value).toFixed(8));
    } else if (button === "÷") {
      checkCalculate();
      operator.value = "divide";
    } else if (button === "x") {
      checkCalculate();
      operator.value = "multiply";
    } else if (button === "-") {
      checkCalculate();
      operator.value = "subtract";
    } else if (button === "+") {
      checkCalculate();
      operator.value = "add";
    } else if (button === "+/-") {
      if (num.value === 0) {
        ans.value = -ans.value;
      } else {
        num.value = -num.value;
      }
    } else if (button === "=") {
      calculate();
    } else if (button === ".") {
      operator.value = ".";
    }
  }
};
const checkCalculate = (): void => {
  if (!(operator.value === "" || num.value === 0)) {
    calculate();
  }
};
onKeyStroke(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], (e) => {
  if (!(props.app.id == AppManager.focused)) {
    return;
  }
  if (operator.value === "") {
    addToNumber(e.key);
  } else {
    num.value += e.key;
  }
  e.preventDefault();
});

onKeyStroke(["+", "-", "*", "/", "%", "Enter"], (e) => {
  if (!(props.app.id == AppManager.focused)) {
    return;
  }
  if (operator.value === "") {
    operator.value = e.key;
  } else {
    calculate();
  }
  e.preventDefault();
});

onKeyStroke(["Backspace"], (e) => {
  if (!(props.app.id == AppManager.focused)) {
    return;
  }
  if (operator.value === "") {
    if (ans.value.toString().length === 1) {
      ans.value = 0;
    } else {
      ans.value = parseFloat(ans.value.toString().slice(0, -1));
    }
  } else if (num.value === 0) {
    operator.value = "";
  } else {
    if (num.value.toString().length === 1) {
      num.value = 0;
    } else {
      num.value = parseFloat(num.value.toString().slice(0, -1));
    }
  }
  e.preventDefault();
});

onKeyStroke(["Escape"], (e) => {
  if (!(props.app.id == AppManager.focused)) {
    return;
  }
  num.value = 0;
  ans.value = 0;
  operator.value = "";
  e.preventDefault();
});
</script>
