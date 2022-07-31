<template>
  <!-- Application -->
  <Transition>
    <UiDesktopWindow v-if="app.running" v-show="!app.minimized" :app="app">
      <!-- I couldn't change the hight -->
      <UiInput
        m="4"
        p="2"
        pb="12"
        h="4"
        v-model="task"
        placeholder="ابحث هنا..."
        icon="i-ant-design-search-outlined"
      />
      <UiMenu class="bg-[#252C37] w-52" mt="2" mr="6" title="الفلاتر">
        <UiMenuItem title="مهمة" />
        <UiMenuItem title="مكتمله" />
        <UiMenuItem title=" غير مكتمله" />
        <UiMenuItem title="قيد التنفيذ" />
      </UiMenu>
      <TodoList />
      <Teleport to="body">
        <UiModal
          v-model="stateModal"
          confirm="Save"
          @confirm="modalConfirmed"
          @cancel="modalCanceled"
        >
          <template v-slot:title>Modal Title</template>
          Content
        </UiModal>
      </Teleport>
      <UiButton title="showModel" @click="toggleModal()" /> -->
    </UiDesktopWindow>
  </Transition>
</template>

<script setup>
let task = ref(null);
// const show = () =>{
//   if(task.value != null){
//     console.log(task.value)
//     return true
// }
// }
const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});
watch(task, (val) => {
  localStorage.setItem("task", val);
});
onMounted(() => {
  task.value = localStorage.getItem("task") || "";
});

const getApp = props.app.getSubApp(1);
const [stateModal, toggleModal] = useToggle(false);

const modalConfirmed = () => {
  console.log("Confirmed");
  stateModal.value = false;
};

const modalCanceled = () => {
  console.log("Canceled");
  stateModal.value = false;
};
</script>
