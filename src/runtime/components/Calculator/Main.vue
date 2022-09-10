<template>
  <!-- Application -->
  <!-- //====== Calculator Screen ======// -->
  <div class="flex flex-col h-full justify-end items-stretch">
    <div
      h="2rem"
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
      <!-- {{ ans.toLocaleString("en-US", { maximumFractionDigits: 8 }) }}
      {{ operators[operator] }}
      {{
        num !== 0
          ? num.toLocaleString("en-US", {
              maximumFractionDigits: 8,
            })
          : ""
      }} -->
      {{ previousValue + operation + currentValue }} {{ resultValue }}

      <CalculatorHistoryIcon
        v-if="twoXs || xs || sm"
        @click="toggleModal"
        class="absolute left-3 bottom-0 top-20 cursor-pointer"
        w="30px"
        h="30px"
      />
    </div>
    <!-- //====== Buttons styles and loop includes Numbers & Operations ======// -->
    <div m="5px" h="full" flex="~ col" justify="end">
      <div grid="~ cols-10">
        <div
          class="grid grid-cols-4 gap-1px col-span-10"
          :class="{ 'col-span-7': twoXl || xl || lg || md, 'col-span-10': sm || xs || twoXs}"
        >
          <button
            overflow="auto"
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
            @click="calculate(button)"
            type="button"
          >
            {{ button }}
          </button>
        </div>
        <!-- //====== Calculator History FOR LARGE SCREEN SIZES ======// -->
        <CalculatorHistory
          :historyList="historyList"
          :history="history"
          :BreakpointWindow="BreakpointWindow"
        />
        <!-- DISPLAY THE HISTORY FOR SMALL SCREEN SIZES -->
        <Teleport to="body">
          <UiModal v-model="stateModal" @cancel="modalCanceled">
            <template v-slot:title>Calculation History</template>
              <div class="h-32" overflow="y-scroll" flex="~ col gap-1" relative>
                <p v-if="historyList[0]" class="absolute left-2 top-0 py-3 px-5 bg-white text-center text-black cursor-pointer rounded-lg" @click="clearHistory">clear</p>
                <p class="text-center" v-else>لم يتم حساب اي عمليات</p>
                <h5 class="flex justify-end" dir="ltr" v-for="(result, index) in historyList" :key="index">{{ result}}</h5>
              </div>
          </UiModal>
        </Teleport>
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
// import { storeToRefs } from "pinia";
// import { useCalculatorStore } from "../../composables/useCalculatorStore";
const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});

// FUNCTION TO CLEAR THE HISTORY IN UIMODAL
function clearHistory() {
  while(historyList.value.length > 0) {
    historyList.value.pop()
  }
}

// for toggle the history list for small screen sizes
const [stateModal, toggleModal] = useToggle(false);

const modalCanceled = () => {
  stateModal.value = !stateModal;
};

const AppManager = useAppManager();

//====== Window Size Changing ======//
const windowRef = ref(null);
const BreakpointWindow = useBreakpointWindow(windowRef);
const { size, twoXs, xs, sm, md, lg, xl, twoXl } = BreakpointWindow;

//====== Store Defining and usage ======//
// const store = useCalculatorStore();
// const { ans, operator, num } = storeToRefs(store);
// const { calculate , addToNumber } = store;

//====== History ======//
const historyList = ref([]);
// let history = ref("");
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
  "×",
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
// const operators: any = {
//   add: "+",
//   subtract: "-",
//   multiply: "x",
//   divide: "÷",
// };
//====== Handle Click for the Operations and Numbers ======//
// const handleClick = (button: string | number) => {
//   if (typeof button === "number") {
//     addToNumber(button);
//   } else {
//     if (button === "C") {
//       ans.value = 0;
//       num.value = 0;
//       operator.value = "";
//     } else if (button === "π") {
//       if (operator.value === "") {
//         ans.value = 3.142;
//       } else {
//         num.value = 3.142;
//       }
//     } else if (button === "%") {
//       checkCalculate();
//       ans.value = parseFloat((ans.value / 100).toFixed(3));
//     } else if (button === "Del") {
//       if (operator.value === "") {
//         if (ans.value.toString().length === 1) {
//           ans.value = 0;
//         } else {
//           ans.value = parseFloat(ans.value.toString().slice(0, -1));
//         }
//       } else if (num.value === 0) {
//         operator.value = "";
//       } else {
//         if (num.value.toString().length === 1) {
//           num.value = 0;
//         } else {
//           num.value = parseFloat(num.value.toString().slice(0, -1));
//         }
//       }
//     } else if (button === "1/x") {
//       checkCalculate();
//       ans.value = parseFloat((1 / ans.value).toFixed(8));
//     } else if (button === "x²") {
//       checkCalculate();
//       ans.value = parseFloat((ans.value * ans.value).toFixed(8));
//     } else if (button === "√x") {
//       checkCalculate();
//       ans.value = parseFloat(Math.sqrt(ans.value).toFixed(8));
//     } else if (button === "÷") {
//       checkCalculate();
//       operator.value = "divide";
//     } else if (button === "x") {
//       checkCalculate();
//       operator.value = "multiply";
//     } else if (button === "-") {
//       checkCalculate();
//       operator.value = "subtract";
//     } else if (button === "+") {
//       checkCalculate();
//       operator.value = "add";
//     } else if (button === "+/-") {
//       if (num.value === 0) {
//         ans.value = -ans.value;
//       } else {
//         num.value = -num.value;
//       }
//     } else if (button === "=") {
//       calculate();
//       if (ans.value == 0) return;
//       const history = {
//         result: ans.value,
//       };
//       historyList.value.push(history);
//     } else if (button === ".") {
//       if (operator.value === "") {
//         if (ans.value.toString().includes(".")) {
//           return;
//         } else {
//           ans.value = ans.value.toString() + ".";
//         }
//       } else {
//         if (num.value.toString().includes(".")) {
//           return;
//         } else {
//           num.value = num.value.toString() + ".";
//         }
//       }
//     }
//   }
// };




/* my new function start */

// PARTS OF CALCULATION VARIABLES
let currentValue = ref("");
let previousValue = ref("");
let operation = ref("");
let resultValue = ref("");

// PROCESS OF CALCULATION AND RESULT VARIABLES
let processOfCalculation = ref("");
let result = ref("");

// RESULT IN HISTORY AND RESULT IN HISTORY STORAGE VARIABLES
let resultInHistory = ref("");
let historyStorage = ref("")

// const history = ref(historyStorage ?? []);
// const history = ref([]);




function calculate(button) {
  // adding numbers to the screen
  if (!isNaN(button) || button == ".") {
    if (currentValue.value.length <= 10) {
      currentValue.value += button;
    }
  }
  // clear the numbers
  if (button === "C") {
    operation.value = "";
    previousValue.value = "";
    currentValue.value = "";
    result.value = "";
    resultValue.value = ""
  }
  // split between numbers before the operator and after the operator
  if (["×", "+", "-", "÷"].includes(button)) {
    previousValue.value = currentValue.value;
    currentValue.value += button;
    operation.value = button;
    currentValue.value = "";
  }
  // GETTING THE REST OF DIVIDING
  if (button === "%") {
    currentValue.value = currentValue.value / 100;
  }
  console.log(currentValue.value.length)

  // DELETE THE LAST NUMBER
  if (button === "Del") {
    currentValue.value = currentValue.value.substring(
      0,
      currentValue.value.length - 1
    );
  }

  // multiply the number by himself
  if (button === "x²") {
    currentValue.value = currentValue.value * currentValue.value
  }

  // the square root of the number
  if (button === '√x') {
    currentValue.value = Math.sqrt(currentValue.value)
  }

  // get the 1/X of the number
  if (button === "1/x") {
    currentValue.value = eval(1 / currentValue.value)
  }

  // if it is "π" then set the value to 3.14
  if (button === "π") {
    currentValue.value = "3.14"
  }

  // if the number is positive then set it to negative else set it to positive
  if (button === "+/-" && currentValue.value != 0 ) {
    currentValue.value = currentValue.value > 0 ? currentValue.value * -1 : currentValue.value * -1
  }

  // GET THE RESULT OF THE OPERATION
  if (button === "=") {

    // turning multiply into '*' to be easy calculated
    if (operation.value === "×") {
      operation.value = "*";
    }

    // turning divide into '/' to be easy calculated
    if (operation.value === "÷") {
      operation.value = '/'
    }

    // saving the process of calculation into one variable (not include the result)
    processOfCalculation.value =
      previousValue.value + " " + operation.value + " " + currentValue.value;

    // calculate( number before operation sign + the operation sign + number after operation sign)
    resultValue.value = eval(
      previousValue.value + operation.value + currentValue.value
    );

    // prepare the data to push to the history
    resultInHistory.value =
      processOfCalculation.value + " " + "=" + " " + resultValue.value;

    // push the data to the history if there is an operation
    if (operation.value) {
      historyList.value.push(resultInHistory.value);
    }

    // save the data into local storage
    // historyStorage = useStorage.setItem('result', resultInHistory.value);

    // SET THE RESULT TO THE span UP LEFT
    // result.value = resultValue.value;
    // remove the numbers from the result bar WHEN CLICK THE EQUAL BUTTON
    previousValue.value = "";
    currentValue.value = "";
    operation.value = "";
  }
}

/* my new function end */


// //====== Checks Calculate Function ======//
// const checkCalculate = (): void => {
//   if (!(operator.value === "" || num.value === 0)) {
//     calculate();
//   }
// };

// //====== Keyboard Buttons ======//
// onKeyStroke(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], (e) => {
//   if (!(props.app.id == AppManager.focused)) {
//     return;
//   }
//   if (operator.value === "") {
//     addToNumber(e.key);
//   } else {
//     addToNumber(e.key);
//   }
//   e.preventDefault();
// });

// onKeyStroke(["+", "-", "*", "/", "%", ".", "Enter"], (e) => {
//   if (!(props.app.id == AppManager.focused)) {
//     return;
//   }
//   if (e.key === "+") {
//     operator.value = "add";
//   } else if (e.key === "-") {
//     operator.value = "subtract";
//   } else if (e.key === "*") {
//     operator.value = "multiply";
//   } else if (e.key === "/") {
//     operator.value = "divide";
//   } else if (e.key === "%") {
//     operator.value = "divide";
//   } else if (e.key === "Enter") {
//     calculate();
//     if (ans.value == 0) return;
//     const history = {
//       result: ans.value,
//     };
//     historyList.value.push(history);
//   } else if (e.key === ".") {
//     if (operator.value === "") {
//       if (ans.value.toString().includes(".")) {
//         return;
//       } else {
//         ans.value = ans.value.toString() + ".";
//       }
//     } else {
//       if (num.value.toString().includes(".")) {
//         return;
//       } else {
//         num.value = num.value.toString() + ".";
//       }
//     }
//   }
//   e.preventDefault();
// });

// onKeyStroke(["Backspace"], (e) => {
//   if (!(props.app.id == AppManager.focused)) {
//     return;
//   }
//   if (operator.value === "") {
//     if (ans.value.toString().length === 1) {
//       ans.value = 0;
//     } else {
//       ans.value = parseFloat(ans.value.toString().slice(0, -1));
//     }
//   } else if (num.value === 0) {
//     operator.value = "";
//   } else {
//     if (num.value.toString().length === 1) {
//       num.value = 0;
//     } else {
//       num.value = parseFloat(num.value.toString().slice(0, -1));
//     }
//   }
//   e.preventDefault();
// });

// onKeyStroke(["Escape"], (e) => {
//   if (!(props.app.id == AppManager.focused)) {
//     return;
//   }
//   num.value = 0;
//   ans.value = 0;
//   operator.value = "";
//   e.preventDefault();
// });


</script>

<style scoped>
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  </style>
