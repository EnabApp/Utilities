<template>
  <!-- Application -->
  <Transition>
    <UiDesktopWindow v-if="app.running" v-show="!app.minimized" :app="app">
      <div flex="~ col grow gap-2" w="full">
        <UiTabGroup p="x-20px" :col="false" :tabs="['جميع المهام', 'المؤرشفة']">
          <template #tab-1>
            <div flex="~ col">
              <!-- ===========>> Add InPut Content <<=========== -->
              <div>
                <UiInput
                  m="y-20px"
                  placeholder="اضافه مهمة ..."
                  v-model="title"
                  @keydown.enter="addTodo()"
                />
              </div>
              <div
                m="t-5px"
                flex="~ col gap-30px"
                w="full"
                overflow="y-scroll"
                h="315px"
              >
                <!-- ===========>> Todo Content <<=========== -->
                <div v-for="todo in todos_a" :key="todo">
                  <div
                    id="todoDiv"
                    flex="~"
                    class=""
                    justify="between"
                    items="center"
                  >
                    <TodoTask :todo="todo" />
                    <!-- ===========>> Remove Button Content <<=========== -->
                    <div
                      id="markHover"
                      duration="200"
                      hover="bg-white"
                      class="i-bi-x-square-fill"
                      @click="removeTodo(todo)"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <!-- =========>> End Template <<========= -->
          <template #tab-2>
            <div flex="~ col">
              <div flex="~ col">
                <!-- ===========>> Search InPut Content <<=========== -->
                <UiInput
                  m="y-20px"
                  placeholder="ابحث هنا..."
                  icon="i-akar-icons-search"
                  v-model="searchQuery"
                />
                <div
                  v-if="searchQuery != ''"
                  p="t-15px b-15px"
                  flex="~ col gap-15px"
                  w="full"
                  bg="white opacity-10"
                  rounded="5px"
                  overflow="y-scroll"
                  h="65px"
                >
                  <div v-for="todo in searchedTodos" :key="todo">
                    <div flex="~" w="full" justify="between" items="center">
                      <TodoTask
                        :todo="todo"
                        v-if="todo.done == true && searchQuery != ''"
                      />
                      <!-- ===========>> Remove Button Content <<=========== -->
                      <div
                        v-if="todo.done == true"
                        duration="200"
                        bg="white opacity-30"
                        hover="bg-white"
                        class="i-bi-x-square-fill"
                        @click="removeTodo(todo)"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                m="t-5px"
                flex="~ col gap-30px"
                w="full"
                overflow="y-scroll"
                h="315px"
              >
                <!-- ===========>> Todo Content <<=========== -->
                <div v-for="todo in todos_f" :key="todo">
                  <div flex="~" justify="between" items="center" id="todoDiv">
                    <TodoTask :todo="todo" v-if="todo.done == true" />

                    <!-- ===========>> Remove Bottom Content <<=========== -->
                    <div
                      id="markHover"
                      duration="200"
                      hover="bg-white"
                      class="i-bi-x-square-fill"
                      @click="removeTodo(todo)"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </UiTabGroup>
      </div>
    </UiDesktopWindow>
  </Transition>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "#imports";

const todos = ref([]);
const searchQuery = ref("");
const title = ref("");
const date = ref("");

const hover = ref();

//All Todos (Active and Done)
const todos_a = computed(() =>
  todos.value.sort((a, b) => {
    return b.createdAt - a.createdAt;
  })
);

// Todos Filleted by Done
const todos_f = computed(() =>
  todos.value.filter((todo) => {
    return todo.done == true;
  })
);

watch(
  todos,
  (newVal) => {
    localStorage.setItem("todos", JSON.stringify(newVal));
  },
  {
    deep: true,
  }
);

//Add Todo Function
const addTodo = () => {
  if (title.value.trim() === "") {
    return;
  }
  todos.value.push({
    title: title.value,
    date: date.value,
    done: false,
    createdAt: new Date().getTime(),
  });
  console.log("Todo Added");
  title.value = "";
};

//Remove Todo Function
const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
  console.log("Todo Deleted");
};

//Search Todo Function
const searchedTodos = computed(() => {
  return todos.value.filter((todo) => {
    return (
      todo.title.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1
    );
  });
});

onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];
});

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});
</script>

<style>
#markHover {
  opacity: 0;
}
#todoDiv:hover #markHover {
  opacity: 1;
}
</style>
