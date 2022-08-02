<template>
  <!-- Application -->
  <Transition>
    <UiDesktopWindow v-if="app.running" v-show="!app.minimized" :app="app">
      <d1iv mt="5" flex="~ col grow gap-2" w="full">
        <!-- ===========>> Search InPut Content <<=========== -->
        <UiInput
          m="4"
          p="2"
          pb="12"
          h="4"
          v-model="search"
          placeholder="ابحث هنا..."
          icon="i-ant-design-search-outlined"
        />
        <UiTabGroup mr="3" :col="false" :tabs="['المهام', 'الأرشيف']">
          <template #tab-1>
            <!-- ===========>>  UiMenu Content <<=========== -->
            <UiMenu w="52" bg="[#252c37]" mt="2" mr="3" title="الفلاتر">
              <UiMenuItem
                bg="[#3c4651]"
                hover="bg-[#]"
                text="white"
                title="مهمة"
              />
              <UiMenuItem
                bg="[#3c4651]"
                hover="bg-[#]"
                text="white"
                title="مكتمله"
              />
              <UiMenuItem
                bg="[#3c4651]"
                hover="bg-[#]"
                text="white"
                title=" غير مكتمله"
              />
              <UiMenuItem
                bg="[#3c4651]"
                hover="bg-[#]"
                text="white"
                title="قيد التنفيذ"
              />
            </UiMenu>
            <!-- ===========>> Card List Content <<=========== -->
            <div class="overflow-y-scroll h-[85%]">
              <div class="grid grid-cols-1 md:grid-cols-2">
                <div v-for="item in tasks" :key="item">
                  <TodoCard :task="item" />
                </div>
              </div>
            </div>
            <!-- Flowing Button -->
            <div
              bg="[#4eaccf]"
              hover="bg-[#3c92b2]"
              duration="200"
              rounded="full"
              m="15"
              w="[55px]"
              h="[55px]"
              text="white"
              flex="~"
              justify="center"
              items="center"
              cursor="pointer"
              absolute="~"
              bottom="0"
              right="0"
              shadow="lg"
              @click="toggleModal()"
            >
              <div
                text="4xl"
                relative="~"
                class="i-ant-design-plus-outlined"
              ></div>
            </div>
          </template>

          <template #tab-2>
            <TodoArchive />
          </template>
        </UiTabGroup>
        <!-- ===========>> Model Content <<=========== -->
        <Teleport to="body">
          <UiModal
            v-model="stateModal"
            confirm="Save"
            @confirm="modalConfirmed"
            @cancel="modalCanceled"
          >
            <template v-slot:title>
              <div ref="titleEl">
                <h4 v-if="stateTitle" text="w-100">
                  <UiInput h="20" v-model="title" />
                </h4>
                <div v-if="!stateTitle" @click="toggleTitle()">
                  <div flex="~" items="center">
                    <h4 text="w-100">
                      {{ task }}
                    </h4>
                    <div class="i-fa6-solid-pen text-xl mr-3"></div>
                  </div>
                </div>
              </div>
            </template>
            <div flex="~ col">
              <div flex="~" class="items-center">
                <h5>تاريخ البدء</h5>
                <div mx="4">
                  <input
                    v-model="startDate"
                    bg="transparent"
                    text="primary"
                    type="date"
                    class="w-full border-0 cursor-pointer text-sm rounded p-0.5"
                  />
                </div>
                <h5 mx="4" text="primary">تاريخ الانتهاء</h5>
                <div mx="4">
                  <input
                    v-model="endDate"
                    bg="transparent"
                    text="w-100"
                    type="date"
                    class="w-full border-0 cursor-pointer text-sm rounded p-0.5"
                  />
                </div>
              </div>

              <div class="overflow-y-auto h-90 w-full mt-10">
                <textarea
                  v-model="content"
                  ref="textarea"
                  bg="transparent"
                  text="w-100"
                  border="none"
                  class="resize-none outline-none placeholder:text-w-100"
                  cols="100"
                  rows="10"
                  placeholder="اكتب المهمة هنا..."
                />
              </div>
            </div>
            <UiButton title="save" :outline="true" w="15" @click="addTask()" />
          </UiModal>
        </Teleport>
      </d1iv>
    </UiDesktopWindow>
  </Transition>
</template>

<script setup>
import { ref } from "vue";
import { useDraggable } from "@vueuse/core";
// import { useElementBounding } from '@vueuse/core'

let search = ref(null);

const titleEl = ref(null);
const title = ref(null);
const tasks = ref([]);
const content = ref("");
const startDate = ref("");
const endDate = ref("");

const { textarea, input } = useTextareaAutosize();

const getApp = props.app.getSubApp(1);

const [stateModal, toggleModal] = useToggle(false);

const [stateSidebar, toggleSidebar] = useToggle(false);

const [stateTitle, toggleTitle] = useToggle(false);

// const el = ref(null);
// const elSize = ref(null)
// const {x:elX , y:elY} = useElementBounding(elSize)
// const { x, y, style } = useDraggable(el, {
//   initialValue: { x: 900, y: 600 },
// onMove: (value) => {
//   //  if(value.x > right.value)
//   //  x.value = right.value
//   // else if(value.x < left.value)
//   // x.value = left.value
//   if(elX.value-value.x <= 10)
//     return

//   console.log(elX.value)

// }
// });
const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});

const addTask = () => {
  if (
    content.value.trim === "" ||
    startDate.value.trim === "" ||
    endDate.value.trim === ""
  ) {
    alert("الرجاء إدخال جميع البيانات");
    return;
  }
  tasks.value.push({
    title: title.value,
    content: content.value,
    startDate: startDate.value,
    endDate: endDate.value,
    state: 0,
  });
  content.value = "";
  startDate.value = "";
  endDate.value = "";
  title.value = "";
  toggleModal();
};
watch(
  tasks,
  (newVal) => {
    localStorage.setItem("tasks", JSON.stringify(newVal));
  },
  { deep: true }
);
watch(search, (val) => {
  localStorage.setItem("search", val);
});

onMounted(() => {
  search.value = localStorage.getItem("search") || "";
});

const modalConfirmed = () => {
  console.log("Confirmed");
  stateModal.value = false;
};

const modalCanceled = () => {
  console.log("Canceled");
  stateModal.value = false;
};

onClickOutside(titleEl, () => {
  stateTitle.value = false;
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
