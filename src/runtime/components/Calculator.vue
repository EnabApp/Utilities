<template>
  <!-- Application -->
  <!-- //====== Calculator Screen ======// -->
  <div
    p="x-10px b-5px"
    text="2xl right primaryOp dark:primary"
    dir="ltr"
    w="full"
    class="text-3xl"
    ref="windowRef"
    :class="{
      'text-4xl': lg,
      'text-5xl': xl || twoXl,
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

  <!-- //====== Buttons styles and loop includes Numbers & Operations ======// -->
  <div m="5px" h="full" flex="~ col" justify="end">
    <div grid="~ cols-10">
      <div
        class="grid grid-cols-4 gap-1px col-span-10"
        :class="{ 'col-span-7': twoXl || xl || lg || md }"
      >
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
            'text-4xl': lg || xl || twoXl,
            'text-info dark:text-info hover:bg-secondaryOp hover:bg-opacity-25 bg-inherit':
              ((index + 1) % 4 === 0 || index < 7 || index === 20) &&
              button !== '=' &&
              button !== 'C',
            'text-error bg-inherit hover:bg-error hover:text-primary':
              button === 'C',
            'bg-info text-primary hover:bg-opacity-50': button === '=',
            'bg-inherit dark:text-primary  hover:bg-secondaryOp hover:bg-opacity-25':
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
      <!-- DISPLAY THE HISTORY ON LARGE SCREEN SIZES -->
      <div
        relative="~"
        v-if="twoXl || xl || lg || md"
        col="span-3"
        overflow="y-scroll"
        h="350px"
      >
        <div class="p-1 border-0 rounded-lg">
          <div
            hover:bg="secondary dark:secondaryOp"
            p="2"
            rounded="5px"
            duration="150"
            class="text-xl text-primaryOp dark:text-primary"
            m="5"
            v-for="history in historyList"
            :key="history"
            dir="rtl"
          >
            {{ history }}
          </div>
          <h3
            v-if="historyList.length == 0"
            m="10"
            text="center primaryOp dark:primary"
          >
            لا يوجد سجل
          </h3>
          <div
            absolute="~"
            v-if="historyList.length > 0"
            text="2xl primaryOp dark:primary"
            border="2 transparent"
            cursor="pointer"
            class="i-ant-design-delete-outlined"
            hover="border-gray-700"
            top="8"
            left="5%"
            @click="historyList = []"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  useBreakpointWindow,
  useAppManager,
  onKeyStroke,
  useToggle,
} from "#imports";
import { storeToRefs } from "pinia";
import { useCalculatorStore } from "../composables/useCalculatorStore";

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});

const AppManager = useAppManager();

//====== Window Size Changing ======//
const windowRef = ref(null);
const BreakpointWindow = useBreakpointWindow(windowRef);
const { size, twoXs, xs, sm, md, lg, xl, twoXl } = BreakpointWindow;

//====== Store Defining and usage ======//
const store = useCalculatorStore();
const { ans, operator, num } = storeToRefs(store);
const { calculate, addToNumber } = store;

//====== History Toggle ======//
const historyList = ref([
  "3456",
  "435670",
  "986756534",
  "56789034-",
  "4356435678",
  "3453456789",
  "546789565750",
  "2347654",
  "554 x 2 = 1108",
  "10*10 = 100",
  "10/2 = 5",
  "10+10 = 20",
  "10-10 = 0",
]);
const [historyState, historyToggle] = useToggle(false);

//====== Buttons Defining ======//
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

//====== Operations Defining ======//
const operators: any = {
  add: "+",
  subtract: "-",
  multiply: "x",
  divide: "÷",
};

//====== Handle Click for the Operations and Numbers ======//
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
      if (operator.value === "") {
        if (ans.value.toString().includes(".")) {
          return;
        } else {
          ans.value = ans.value.toString() + ".";
        }
      } else {
        if (num.value.toString().includes(".")) {
          return;
        } else {
          num.value = num.value.toString() + ".";
        }
      }
    }
  }
};

//====== Checks Calculate Function ======//
const checkCalculate = (): void => {
  if (!(operator.value === "" || num.value === 0)) {
    calculate();
  }
};

//====== Keyboard Buttons ======//

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
  if (e.key === "+") {
    operator.value = "add";
  } else if (e.key === "-") {
    operator.value = "subtract";
  } else if (e.key === "*") {
    operator.value = "multiply";
  } else if (e.key === "/") {
    operator.value = "divide";
  } else if (e.key === "%") {
    operator.value = "divide";
  } else if (e.key === "Enter") {
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
