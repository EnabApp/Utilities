<template>
  <div flex="~ col">
    <div id="taskHover" flex="~" items="center" justify="between" w="full">
      <div w="full">
        <div flex="~ gap-9px" items="center">
          <!-- ===========>> Toggle complete Content <<=========== -->
          <input
            class="accent-primaryOp dark:accent-primary"
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
            text="primaryOp dark:primary md:sm lg:md xl:lg 3xl:xl"
            caret="error"
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
          <span font="thin" text="primaryOp dark:secondary xs md:sm lg:sm xl:md 3xl:lg">{{
            moment(task.inserted_at).format("LL")
          }}</span>
        </div>
      </div>
      <!-- ===========>> Remove Button Content <<=========== -->
      <UiButton
        id="deleteHover"
        duration="250"
        color="error"
        :outline="true"
        @click="todoStore.deleteTask(task)"
        size="sm"
      >
        حذف
      </UiButton>
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

//=========>> Update Task Function <<=========
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
