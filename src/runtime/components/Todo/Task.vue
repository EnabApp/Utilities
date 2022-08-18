<template>
  <div flex="~ col">
    <div id="taskHover" flex="~" items="center" justify="betweem" w="full">
      <div w="full">
        <div flex="~ gap-9px" items="center">
          <!-- ===========>> Toggle complete Content <<=========== -->
          <input
            v-model="task.is_complete"
            cursor="pointer"
            type="checkbox"
            text="primaryOp dark:secondary"
            w="12px"
          />
          <!-- ===========>> Title Content <<=========== -->

          <input
            v-model.lazy="task.task"
            font="bold"
            w="full"
            text="primaryOp dark:primary"
          />
        </div>
        <div flex="~ gap-9px" items="center">
          <div relative="~">
            <div
              w="12px"
              h="12px"
              z="10"
              text="primaryOp dark:secondary"
              class="i-material-symbols-date-range"
            ></div>

            <!-- ===========>> Date Content <<=========== -->
            <input
              v-model="task.inserted_at"
              opacity="0"
              z="20"
              type="datetime-local"
              absolute="~"
              top="0"
              right="0"
              h="full"
              w="full"
            />
          </div>
          <span font="thin" text="primaryOp dark:secondary xs">{{
            moment(task.inserted_at).calendar()
          }}</span>
        </div>
      </div>
      <!-- ===========>> Remove Button Content <<=========== -->
      <UiButton
        id="deleteHover"
        duration="250"
        color="error"
        size="sm"
        @click="todoStore.deleteTask(task)"
      />
    </div>
  </div>
</template>

<script setup>
import { useSupabaseClient, useMoment, watch } from "#imports";
import { useTodoStore } from "../../composables/useTodoStore";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const todoStore = useTodoStore();
const moment = useMoment();
const supabase = useSupabaseClient();

//=========>>Update Task Function<<=========
watch(
  () => props.task,
  (updatedTask) => todoStore.updateTask(updatedTask),
  { deep: true }
);
</script>

<style scoped>
input::-webkit-calendar-picker-indicator {
  cursor: pointer;
}

input:not([type="radio"]):not([type="checkbox"]) {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  cursor: initial;
}
#deleteHover {
  opacity: 0;
}
#taskHover:hover #deleteHover {
  opacity: 1;
}
</style>
