<template>
  <div id="task" flex="~ col" >
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
            w="fit-content"
            border="red 2px solid"
            text="right primaryOp dark:primary"
            caret="info"
            :class="{
              'text-0.80rem': twoXs,
              'text-0.90rem': xs,
              'text-1.00rem': sm,
              'text-1.10rem': md,
              'text-1.20rem': lg,
              'text-1.30rem': xl,
              'text-1.75rem': twoXl,
            }"
          />
        </div>
        <!-- ===========>> Date Content <<=========== -->
        <div flex="~ gap-9px" items="center">
          <div relative="~">
            <div
              w="14px"
              h="14px"
              z="10"
              text="secondaryOp dark:secondary"
              class="i-material-symbols-date-range"
            ></div>
            <input
              v-model="dateShow"
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
          <span
            font="thin"
            text="primaryOp dark:secondary "
            :class="{
              'text-0.70rem': twoXs,
              'text-0.75rem': xs,
              'text-0.80rem': sm,
              'text-0.85rem': md,
              'text-0.90rem': lg,
              'text-0.95rem': xl,
              'text-0.99rem': twoXl,
            }"
            >{{ moment(task.inserted_at).calendar() }}</span
          >
          <!-- format("yyyy-MM-dd hh:mm a ")-->
        </div>
      </div>
      <!-- ===========>> Remove Button Content <<=========== -->
      <UiButton
        id="deleteHover"
        duration="250"
        color="error"
        @click="todoStore.deleteTask(task)"
        size="sm"
      >
        حذف
      </UiButton>
    </div>
  </div>
</template>

<script setup>
import { useSupabaseClient, watch, ref } from "#imports";
import { useTodoStore } from "../../composables/useTodoStore";
import { useMoment } from "../../composables/useMoment";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  BreakpointWindow: {
    type: Object,
  },
});

const supabase = useSupabaseClient();
const todoStore = useTodoStore();
const moment = useMoment();

const { size, twoXs, xs, sm, md, lg, xl, twoXl } = props.BreakpointWindow;

const dateShow = ref(
  moment(props.task.inserted_at).toISOString().substring(0, 16)
);

//Calculate shit
// var n = 1530.345;
// console.log(n.toLocaleString(), ".toLocaleString() find me in task.vue");

//=========>> Update Task Function <<=========//

watch(dateShow, (newValue) => {
  props.task.inserted_at = moment(newValue);
});

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
