<template>
  <!-- DISPLAY THE HISTORY ON LARGE SCREEN SIZES -->
  <div
    v-if="!historyState ? twoXl || xl || lg || md : twoXs || xs || sm"
    md:col="span-3"
    col="span-10"
    overflow="y-scroll"
    h="350px"
  >
    <div flex="~" justify="between" items="center" p="x-3px">
      <div text="xl primaryOp dark:primary" font="bold">السجل</div>
      <span
        v-if="historyList.length > 0"
        hover="text-error dark:text-error text-opacity-50 dark:text-opacity-75"
        duration="150"
        text="sm seconderyOp dark:secondary"
        border="2"
        p="x-2"
        rounded="5px"
        cursor="pointer"
        top="8"
        left="5%"
        @click="clearHistory"
      >
        محو السجل
      </span>
    </div>

    <div p="1" rounded="lg" >
      <div
        hover="bg-secondary dark:bg-secondaryOp"
        p="10px"
        rounded="5px"
        duration="150"
        class="text-xl text-primaryOp dark:text-primary"
        m="5"
        v-for="(history, index) in historyList"
        :key="index"
        dir="rtl"
      >
        <div flex="~ col" justify="center">
          <div text="2xl primaryOp dark:primary">
            <h5>{{ history.result }}</h5>
          </div>
        </div>
      </div>
      <h3
        v-if="historyList.length == 0"
        m="10"
        text="center primaryOp dark:primary"
      >
        لا توجد بيانات!
      </h3>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  historyList: {
    type: Array,
  },
  BreakpointWindow: {
    type: Object,
  },
  historyState: {
    type: Boolean,
  }
});
const { size, twoXs, xs, sm, md, lg, xl, twoXl } = props.BreakpointWindow;

function clearHistory() {
  while (props.historyList.length > 0) {
    props.historyList.pop()
  }
}

// const displayHistoryresponsive = !historyState ? 'span-3' : 'span-10'

</script>
