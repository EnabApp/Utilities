<template>
  <div position="relative" text="primaryOp dark:primary" w="full" h="full">
    <Teleport to="body">
      <UiModal v-model="historyState" @cancel="modalCanceled">
        <template #title> سجل الحاسبة </template>
        <div v-if="historyState" opacity="93%" z="20" border="rounded-5px" h="full" w="full">
          <h3 v-if="screenHistory.length == 0" m="10" text="center primaryOp dark:primary">
            لا يوجد سجل
          </h3>
          <div flex="~ col" justify="center">
            <div class="overflow-y-auto h-429px">
              <div v-for="h in screenHistory.reverse()" :key="h.history" text="primaryOp dark:primary" m="2"
                flex="~ col gap-2">
                <div
                  class="border-0 rounded-lg border-w-5 hover:bg-secondary bg-opacity-10 dark:secondaryOp dark:bg-opacity-25">
                  <div m="3" text="xl primaryOp dark:primary">
                    <h5>{{ " = " }} {{ h.history }}</h5>
                  </div>
                  <div m="3" text="2xl primaryOp dark:primary">
                    <h5>{{ h.result }}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div flex="~" justify="center">
            <div class="p-1 border-0 rounded-lg">
              <div v-if="screenHistory.length > 0" text="2xl primaryOp dark:primary" border="2 transparent"
                cursor="pointer" class="i-ant-design-delete-outlined" hover="border-gray-700" z="30" bottom="1"
                left="45%" @click="screenHistory = []" />
            </div>
          </div>
        </div>
      </UiModal>
    </Teleport>
  </div>
</template>

<script setup>
const props = defineProps({
  modalCanceled: {
    type: Function
  },
  historyState: {
    type: Array
  },
  screenHistory: {
    type: Array
  }
})



</script>
