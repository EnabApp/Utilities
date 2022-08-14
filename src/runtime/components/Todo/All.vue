<template>
  <div m="t-5px" flex="~ col gap-30px" w="full" overflow="y-scroll" h="315px">
    <!-- ===========>> Todo Content <<=========== -->
    <div v-for="todo in todoStore.tasks" :key="todo.id">
      <div id="todoDiv" flex="~" class="" justify="between" items="center">
        <TodoTask :todo="todo" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, useSupabaseClient } from "#imports";
import { useTodoStore } from "../../composables/useTodoStore";

const todoStore = useTodoStore();
</script>
