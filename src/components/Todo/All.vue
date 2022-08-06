<template>
  <div flex="~ col">
    <!-- ===========>> Add InPut Content <<=========== -->
    <div>
      <UiInput
        m="y-20px"
        placeholder="اضافه مهمة ..."
        v-model="title"
        @keydown.enter="addTask()"
      />
    </div>
    <div
      m="t-25px"
      flex="~ gap-30px"
      w="full"
      v-for="item in tasks"
      :key="item"
    >
      <TodoTask :task="item" />
    </div>
  </div>
</template>

<script>
const addTask = () => {
  tasks.value.push({
    title: title.value,
  });
};
</script>
