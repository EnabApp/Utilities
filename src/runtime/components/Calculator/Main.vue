<template>
  <!-- Application -->
  <!-- //====== Calculator Screen ======// -->
  <div class="flex flex-col h-full justify-end items-stretch border-box" relative>
    <div h="2rem" text="2xl right primaryOp dark:primary" dir="ltr" w="full"
      class="flex flex-row-reverse justify-between text-3xl py-5" ref="windowRef" :class="{
        'text-4xl': lg,
        'text-5xl': xl || twoXl,
      }">
      {{ previousValue + operation + currentValue }} <span> {{ resultValue }} </span>
      <CalculatorHistoryIcon v-if="twoXs || xs || sm" @click="toggleModal()" class="cursor-pointer ml-2" w="30px"
        h="30px" />
    </div>
    <!-- //====== Buttons styles and loop includes Numbers & Operations ======// -->
    <div m="5px" h="full" flex="~ col" justify="end">
      <div grid="~ cols-10" h="6/6">
        <div class="grid grid-cols-4 gap-1px col-span-10"
          :class="{ 'col-span-7': twoXl || xl || lg || md, 'col-span-10': sm || xs || twoXs}">
          <button overflow="auto" cursor="pointer" duration="150" rounded="5px" p="y-10px" w="full" font="semibold"
            border="none" :class="{
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
            }" v-for="(button, index) in buttons" :key="index" @click="calculate(button)" type="button">
            {{ button }}
          </button>
        </div>
        <!-- //====== Calculator History FOR LARGE SCREEN SIZES ======// -->
        <CalculatorHistory :historyList="historyList" :BreakpointWindow="BreakpointWindow" />
        <!-- Calculator history for small screen sizes -->
        <CalculatorHistorySmall v-if='!(twoXl || xl || lg || md)' :BreakpointWindow="BreakpointWindow"
          :toggleModal="toggleModal" :stateModal="stateModal" :historyList="historyList" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  useBreakpointWindow,
  useAppManager,
  useToggle,
  onMounted,
  onKeyStroke
} from "#imports";
import { onKeyDown, useStorage } from '@vueuse/core'
const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});

// FUNCTION TO CLEAR THE HISTORY IN UIMODAL

// for toggle the history list for small screen sizes
const [stateModal, toggleModal] = useToggle(false);


const AppManager = useAppManager();

//====== Window Size Changing ======//
const windowRef = ref(null);
const BreakpointWindow = useBreakpointWindow(windowRef);
const { size, twoXs, xs, sm, md, lg, xl, twoXl } = BreakpointWindow;


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
/* my new function start */
// PARTS OF CALCULATION VARIABLES
const currentValue = ref("");
const previousValue = ref("");
const operation = ref("");
let addNumber = true

// PROCESS OF CALCULATION AND RESULT VARIABLES
const processOfCalculation = ref("");
const resultValue = ref("");

// RESULT IN HISTORY AND RESULT IN HISTORY STORAGE VARIABLES
const resultInHistory = ref("");


//====== History ======//
const historyList = ref([]);
const historyStorage = useStorage('calculator-history', [])

onMounted(() => {
  historyList.value = historyStorage.value
})

/* IF YOU SEE (IF ELSE) STATEMENTS IT MEANS IF THE NUMBER IS FROM THE RESULT OF THE PREVIOUS OPERATION OR NOT*/
async function calculate(button) {
  // adding numbers to the screen
  if (!isNaN(button) || button == ".")
  {
    // checking if there is no number and tryna add zero as the first number, if so it won't be added, otherwise it will.
    if (currentValue.value.length <= 10)
    {
      if (currentValue.value.length === 0 && button === 0) addNumber = false;
      else
      {
        currentValue.value += button
      }
    }
  }

  // clear All numbers
  if (button === "C")
  {
    operation.value = "";
    previousValue.value = "";
    currentValue.value = "";
    resultValue.value = ""
  }
  // split between numbers before the operator and after the operator
  if (["×", "+", "-", "÷"].includes(button))
  {
    previousValue.value = resultValue.value ? resultValue.value : currentValue.value;
    currentValue.value += button;
    operation.value = button;
    currentValue.value = "";
    resultValue.value = ""
  }
  // GETTING THE REST OF DIVIDING
  if (button === "%")
  {
    if (currentValue.value) currentValue.value = currentValue.value / 100;
    else resultValue.value = resultValue.value / 100;
  }
  // DELETE THE LAST NUMBER
  if (button === "Del")
  {
    currentValue.value = currentValue.value.slice(
      0,
      currentValue.value.length - 1
    )
  }

  // multiply the number by himself
  if (button === "x²")
  {
    if (currentValue.value) currentValue.value = currentValue.value * currentValue.value
    else resultValue.value = resultValue.value * resultValue.value
  }

  // the square root of the number
  if (button === '√x')
  {
    if (currentValue.value) currentValue.value = parseFloat(Math.sqrt(currentValue.value))
    else resultValue.value = resultValue.value = parseFloat(Math.sqrt(resultValue.value))
  }

  // get the 1/X of the number
  if (button === "1/x")
  {
    if (currentValue.value) currentValue.value = eval(1 / currentValue.value)
    else resultValue.value = eval(1 / resultValue.value)
  }

  // if it is "π" then set the value to 3.14
  if (button === "π")
  {
    currentValue.value = "3.14"
  }

  // if the number is positive then set it to negative else set it to positive
  if (button === "+/-" && currentValue.value != 0)
  {
    if (currentValue.value) currentValue.value = currentValue.value > 0 ? currentValue.value * -1 : currentValue.value * -1
    else resultValue.value = resultValue.value > 0 ? resultValue.value * -1 : resultValue.value * -1
  }

  // GET THE RESULT OF THE OPERATION
  if (button === "=")
  {
    if (operation.value)
    {
      // turning multiply into '*' to be easy calculated
      if (operation.value === "×")
      {
        operation.value = "*";
      }

      // turning divide into '/' to be easy calculated
      if (operation.value === "÷")
      {
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
        processOfCalculation.value + " " + "=" + " " + (resultValue.value ? resultValue.value : currentValue.value);

      // push the data to the history if there is an operation
      if (operation.value)
      {
        historyList.value.push(resultInHistory.value);
      }

      /* SAVING THE DATA OF THE HISTORY INTO THE localStorage */
      historyStorage.value = historyList.value

      // remove the numbers from the result bar WHEN CLICK THE EQUAL BUTTON
      previousValue.value = "";
      currentValue.value = "";
      operation.value = "";
    }
  }
}

// using keyboard keys

// adding numbers
const numbersKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']

numbersKeys.forEach(numberKey => {
  onKeyStroke(numberKey, (e) => {
    if (currentValue.value.length <= 10)
    {
      if (currentValue.value.length === 0 && numberKey == '0') addNumber = false;
      else
      {
        currentValue.value += numberKey
      }
    }
  }, { eventName: 'keypress' })
})

// adding operations
const operationKeys = ['+', '*', '-', '/']

operationKeys.forEach(operatorKey => {
  onKeyStroke(operatorKey, (e) => {
    currentValue.value += operatorKey
  }, { eventName: 'keypress' })
})

// delete number
onKeyStroke('Backspace', (e) => {
  currentValue.value = currentValue.value.slice(
    0,
    currentValue.value.length - 1
  )
}, { eventName: 'keydown' })

// get the result using (= , Enter) keys
onKeyStroke('Enter', (e) => {
  // turning multiply into '*' to be easy calculated

  if (operation.value === "×")
  {
    operation.value = "*";
  }

  // turning divide into '/' to be easy calculated
  if (operation.value === "÷")
  {
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

    historyList.value.push(resultInHistory.value);


  /* SAVING THE DATA OF THE HISTORY INTO THE localStorage */
  historyStorage.value = historyList.value

  // remove the numbers from the result bar WHEN CLICK THE EQUAL BUTTON
  previousValue.value = "";
  currentValue.value = "";
  operation.value = "";
}, { eventName: 'keyup' })
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

::-webkit-scrollbar-thumb:hover {
  background: #2196F3;
}
</style>
