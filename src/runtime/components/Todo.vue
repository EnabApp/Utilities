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
                <UiInput m="y-20px" placeholder="اضافه مهمة ..." v-model="title" @keydown.enter="addTodo()" />
              </div>
              <div m="t-5px" flex="~ col gap-30px" w="full" overflow="y-scroll" h="315px">
                <!-- ===========>> Todo Content <<=========== -->
                <div v-for="todo in todos_a" :key="todo">
                  <div id="todoDiv" flex="~" class="" justify="between" items="center">
                    <TodoTask :todo="todo" />
                    <!-- ===========>> Remove Button Content <<=========== -->
                    <UiButton id="markHover" duration="250" w="70px" title="حذف" color="error" @click="removeTodo(todo)" />
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
                <UiInput m="y-20px" placeholder="ابحث هنا..." v-model="searchQuery" />
                <div v-if="searchQuery != ''" p="t-15px b-15px" flex="~ col gap-15px" w="full" bg="secondaryOp dark:Secondary opacity-10" rounded="5px" overflow="y-scroll" h="65px">
                  <div v-for="todo in searchedTodos" :key="todo">
                    <div flex="~" w="full" justify="between" items="center">
                      <TodoTask :todo="todo" v-if="todo.done == true && searchQuery != ''" />
                      <!-- ===========>> Remove Button Content in Search <<=========== -->
                      <UiButton w="70px" title="حذف" color="error" @click="removeTodo(todo)" />
                    </div>
                  </div>
                </div>
              </div>
              <div m="t-5px" flex="~ col gap-30px" w="full" overflow="y-scroll" h="315px">
                <!-- ===========>> Todo Content <<=========== -->
                <div v-for="todo in todos_f" :key="todo">
                  <div flex="~" justify="between" items="center" id="todoDiv">
                    <TodoTask :todo="todo" v-if="todo.done == true" />

                    <!-- ===========>> Remove Botton Content <<=========== -->
                    <UiButton id="markHover" duration="250" w="70px" title="حذف" color="error" :loading="false" @click="removeTodo(todo)" />
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
import { ref, watch, computed, onMounted, useSupabaseClient, useUser, useNuxtApp } from "#imports";

const todos = ref([]);
const searchQuery = ref("");
const title = ref("");
const date = ref("");
const supabase = useSupabaseClient()
const user = useUser()
const { $toast } = useNuxtApp()

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

//Add Todo Function
const addTodo = async () => {
  if (title.value.length <= 3) {
    $toast.error('عنوان المهمة لا يمكن ان يكون اقل من 4 حروف');
    return;
  }
  const taskData = {
    user_id: user.value.id,
    task: title.value,
    is_complete: false,
    inserted_at: new Date(),
  }
  let { error, data } = await supabase.from("app_todo").upsert(taskData).select("id").single();
 
  if (error){
    $toast.error('حدثت مشكلة أثناء الإضافة')
    return;
  }
  if (title.value.trim() === "") {
    return;
  }

  todos.value.unshift({
    id: data.id,
    title: title.value,
    date: date.value,
    done: false,
    createdAt: new Date(),
  });

  title.value = "";
};

//Remove Todo Function
const removeTodo = async (todo) => {
  const id = todos.value.find((x) => x.id == todo.id).id;
  await supabase.from("app_todo").delete().match({ id: id }).then(() => {
    todos.value = todos.value.filter((t) => t !== todo);
  });
};

//Search Todo Function
const searchedTodos = computed(() => {
  return todos.value.filter((todo) => {
    return (
      todo.title.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1
    );
  });
});

onMounted(async () => {
  const { data } = await supabase.from('app_todo').select('id, task, is_complete, inserted_at')
  todos.value = data.map((todo) => todo = {
    id: todo.id,
    title: todo.task,
    date: todo.inserted_at,
    done: todo.is_complete,  
  });
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
