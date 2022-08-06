<template>
  <div flex="~ col">
    <!-- ===========>> Search InPut Content <<=========== -->
    <UiInput
      m="y-20px"
      placeholder="ابحث هنا..."
      icon="i-akar-icons-search"
    />
    <div m="t-25px" flex="~ gap-30px" w="full">
      <TodoTask />
    </div>
  </div>
</template>
