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
        v-model="search"
        placeholder="ابحث هنا..."
        icon="i-ant-design-search-outlined"
      />
      <UiMenu class="bg-[#252c37] w-52" mt="2" mr="6" title="الفلاتر">
        <UiMenuItem bg="[#3c4651]" hover="bg-[#]" text="white" title="مهمة" />
        <UiMenuItem bg="[#3c4651]" hover="bg-[#]" text="white" title="مكتمله" />
        <UiMenuItem bg="[#3c4651]" hover="bg-[#]" text="white" title=" غير مكتمله" />
        <UiMenuItem bg="[#3c4651]" hover="bg-[#]" text="white" title="قيد التنفيذ" />
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
      <div
        mr="4"
        bg="[#4eaccf]"
        hover="bg-[#3c92b2]"
        duration="200"
        rounded="full"
        w="[62px]"
        h="[62px]"
        text="white"
        flex="~"
        justify="center"
        items="center"
        cursor="pointer"
        right="0"
        bottom="0"
        absolute="~"
        @click="toggleModal()"
      >
        <div text="4xl" class="i-ant-design-plus-outlined"></div>
      </div>
    </UiDesktopWindow>
  </Transition>
</template>

<script setup>
let search = ref(null);
const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});
watch(search, (val) => {
  localStorage.setItem("search", val);
});
onMounted(() => {
  search.value = localStorage.getItem("search") || "";
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
