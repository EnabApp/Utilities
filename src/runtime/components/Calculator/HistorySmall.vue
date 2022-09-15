<template>
  <div v-if="stateModal" class="w-full h-100% absolute bg-black left-0 bottom-0 rounded flex flex-col ">
    <div class="relative w-full h-full" dir="ltr">
      <h6 @click="clearHistory" class="absolute top-2 left-2 text-white border-white border-solid border px-5 py-1 rounded cursor-pointer">محو</h6>
      <div @click="toggleModal()" class="absolute text-white top-2 left-43% cursor-pointer cursor-pointer border-white border-solid border px-3 py-1 rounded">close</div>
      <div class=" w-full h-full flex justify-end items-end">
       <div class=" w-95% h-88% text-white flex flex-col gap-y-4 items-start overflow-auto">
          <div v-for="(h, index) in historyList" :key="index" >{{ h }}</div>
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
