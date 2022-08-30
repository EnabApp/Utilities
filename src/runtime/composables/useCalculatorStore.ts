import { acceptHMRUpdate, defineStore } from "pinia";
import { useSupabaseClient, useNuxtApp, useMoment } from "#imports";

export const useCalculatorStore = defineStore("calculator-store", {
  state: () => ({
    operations: [],
  }),
  getters: {
    //=====>> Gets all Tasks <<=====//
    getTasks: (state) => state.operations,

    //=====>> Gets the tasks that they are completed <<=====//
    getArchivedTasks: (state) => state.operations.filter((operation) => operation.is_complete),

    //=====>> Gets the tasks that they are not completed <<=====//
    getNotArchivedTasks: (state) =>
      state.operations.filter((operation) => !operation.is_complete),
  },
  actions: {
    async ButtonClicked(number, screen) {
  if (screen > 13) return;
  if (screen == "0" && number == "000") return;
  if (screen == "0")
  {
    screen = number;
  } else
  {
    screen += number;
  }
},

    async Operation(operation, screen, screenHistory) {
  const lastChar = screen.slice(-1);
  if (lastChar == operation)
  {
    return;
  }
  if (
    lastChar == "*" ||
    lastChar == "+" ||
    lastChar == "-" ||
    lastChar == "/"
  )
  {
    screen += lastChar;
  }
  if (operation === "=" || operation === "Enter")
  {
    const history = screen.toString();
    screen = eval(screen).toString().substring(0, 19);
    screenHistory.push({
      history,
      result: screen,
    });
  } else if (operation === "%")
  {
    screen = (eval(screen) / 100)
      .toString()
      .substring(0, 19);
  } else
  {
    screen += operation;
  }
},

    async Clear(screen) {
  screen = "0";
},

    async Backspace(screen) {
  screen = screen.length <= 1 ? "0" : screen.slice(0, -1);
}

  },
});


function defineCalculator(arg0: string, arg1: {
  state: () => { operations: never[]; }; getters: {
    //=====>> Gets all Tasks <<=====//
    getTasks: (state: any) => any;
    //=====>> Gets the tasks that they are completed <<=====//
    getArchivedTasks: (state: any) => any;
    //=====>> Gets the tasks that they are not completed <<=====//
    getNotArchivedTasks: (state: any) => any;
  };

}) {
  throw new Error("Function not implemented.");
}
