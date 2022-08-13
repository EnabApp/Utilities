<template>
  <div m="t-5px" flex="~ col gap-30px" w="full" overflow="y-scroll" h="315px">
    <!-- ===========>> Todo Content <<=========== -->
    <!-- v-for="todo in todos" :key="todo" in the dev below -->
    <div>
      <div flex="~" justify="between" items="center" id="todoDiv">
        <!-- <TodoTask :todo="todo" v-if="todo.is_complete == true" /> -->

        <TodoRemove />
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "#imports";

const todos = ref([]);

// Todos Filleted by Done
const todos_f = computed(() =>
  todos.value.filter((todo) => {
    return todo.is_complete == true;
  })
);
</script>
