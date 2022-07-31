<template>
  <!-- Application -->
  <Transition>
    <UiDesktopWindow v-if="app.running" v-show="!app.minimized" :app="app">
      <UiInput m="4" v-model="task" />
      <h1 text="w-100">
        {{ task }}
      </h1>
      <Teleport to="body">
        <UiModal v-model="stateModal" confirm="Save" @confirm="modalConfirmed" @cancel="modalCanceled">
          <template v-slot:title>
            <div ref="titleEl">
              <h4 v-if="stateTitle" text="w-100">
                <UiInput h="20" v-model="task" />
              </h4>
                <div v-if="!stateTitle" @click="toggleTitle()">
                  <div flex="~" items="center">
                  <h4 text="w-100">
                    {{ task }}
                  </h4>
                  <div class="i-fa6-solid:pen text-xl mr-3">

                  </div>
                </div>
                </div>

            </div>

          </template>
          <div flex="~ col">
            <div class="overflow-y-auto h-90 w-full ">
              <textarea ref="textarea" bg="transparent" text="w-100" border="none" v-model="input"
                class="resize-none outline-none placeholder:text-w-100 " cols="100" rows="10" placeholder="التفاصيل" />
            </div>
          </div>
          <div v-if="!stateSidebar" class="flex justify-center relative">
            <div @click="toggleSidebar()" class="i-bi:arrow-up-square-fill absolute top-15" text="xl w-100">
            </div>
          </div>
          <Transition>
            <div  v-if="stateSidebar" class="border rounded-lg flex flex-col mt-3 items-center h-20">
              <div @click="toggleSidebar()" class="i-bi:arrow-down-square-fill" text="xl w-100"></div>
              <div class="flex ">
                <div>
                </div>
                <div>
                  df
                </div>
                <div>
                  df
                </div>
              </div>
            </div>
          </Transition>
        </UiModal>
      </Teleport>
      <UiButton title="showModel" @click="toggleModal()" /> -->
    </UiDesktopWindow>
  </Transition>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const { textarea, input } = useTextareaAutosize();
const task = ref(null)
const titleEl = ref(null)
const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});
watch(task, (val) => {
  localStorage.setItem('task', val)
})
onMounted(() => {
  task.value = localStorage.getItem('task') || ''
})

const getApp = props.app.getSubApp(1);
const [stateModal, toggleModal] = useToggle(false);
const [stateSidebar, toggleSidebar] = useToggle(false);
const [stateTitle, toggleTitle] = useToggle(false);


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
