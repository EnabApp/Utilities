import { acceptHMRUpdate, defineStore } from "pinia";
import { useNuxtApp } from "#imports";

export const useCalculatorStore = defineStore("Calculator-Store", {
  state: () => ({
    ans: 0 as number,
    num: 0 as number,
    operator: "" as string,
  }),
  actions: {
    calculate() {
      if (this.operator === "add") {
        this.ans = parseFloat((this.num + this.ans).toFixed(10));
      } else if (this.operator === "subtract") {
        this.ans = parseFloat((this.ans - this.num).toFixed(10));
      } else if (this.operator === "multiply") {
        this.ans = parseFloat((this.ans * this.num).toFixed(10));
      } else if (this.operator === "divide") {
        this.ans = parseFloat((this.ans / this.num).toFixed(10));
      }
      this.num = 0;
      this.operator = "";
    },
    addToNumber(number: number | string) {
      const { $toast } = useNuxtApp();
      if (this.ans.toString().length > 16) {
        $toast.error("لقد وصلت الى الحد الاقصى ");
        return;
      } if (this.num.toString().length > 16) {
        $toast.error("لقد وصلت الى الحد الاقصى ");
        return;
      }
      if (this.operator !== "") {
        this.num = parseFloat(
          ((this.num || "").toString() + number).toString()
        );
      } else {
        this.ans = parseFloat(
          ((this.ans || "").toString() + number).toString()
        );
      }
    },
  },
  persist: false,
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCalculatorStore, import.meta.hot));
}
