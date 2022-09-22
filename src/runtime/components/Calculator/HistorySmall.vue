<template>
  <div v-if="stateModal" bg="primary dark:primaryOp"
    class="w-full h-85% absolute bg-black left-0 bottom-0 rounded flex flex-col ">
    <div class="relative w-full h-full" dir="ltr">
      <h6 @click="clearHistory()" class="absolute top-2 left-2 text-white border-white border-solid border px-5 py-1 rounded cursor-pointer">محو</h6>
      <div class=" w-full h-full flex justify-end items-end">
        <div class=" w-95% h-88% text-white flex flex-col items-start overflow-auto">
          <h3 w="90%" transition="0.1s hover:0.1s all" p-2 rounded-md text="primaryOp dark:primary"
            bg="hover:secondary dark:hover:secondaryOp" v-for="(h, index) in historyList" :key="index">{{ h }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  stateModal: {
    type: Boolean
  },
  historyList: {
    type: Array,
  },
  toggleModal: {
    type: Function
  }
})


function clearHistory() {
  while (props.historyList.length > 0) {
    props.historyList.pop()
  }
}
</script>
