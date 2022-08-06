<template>
  <div flex="~ col">
    <!-- ===========>> Add InPut Content <<=========== -->
    <div>
      <UiInput
        m="y-20px"
        placeholder="اضافه مهمة ..."
        @keydown.enter="addTask()"
      />
    </div>
    <div
      m="t-25px"
      flex="~ gap-30px"
      w="full"
    >
      <TodoTask />
    </div>
  </div>
</template>
