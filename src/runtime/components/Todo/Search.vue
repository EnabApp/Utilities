<template>
  <div flex="~ col">
    <!-- ===========>> Search InPut Content <<=========== -->
    <UiInput m="y-20px" placeholder="ابحث هنا..." v-model="searchQuery" />

    <!-- Content of the search should be in that dev below       
      v-if="searchQuery != ''"
      p="t-15px b-15px"
      flex="~ col gap-15px"
      w="full"
      bg="secondaryOp dark:Secondary opacity-10"
      rounded="5px"
      overflow="y-scroll"
      h="65px" -->
    <div>
      <div v-for="todo in searchedTodos" :key="todo">
        <div flex="~" w="full" justify="between" items="center">
          <TodoTask
            :todo="todo"
            v-if="todo.is_complete == true && searchQuery != ''"
          />
          <!-- ===========>> Remove Button Content in Search <<=========== -->
          <TodoRemove />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "#imports";

const todos = ref([]);
const searchQuery = ref("");

//Search Todo Function
const searchedTodos = computed(() => {
  return todos.value.filter((todo) => {
    return (
      todo.task.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1
    );
  });
});
const props = defineProps({
  todo: Object,
});
</script>
