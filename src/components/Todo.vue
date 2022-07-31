<template >
  <!-- Application -->
  <Transition >
    <UiDesktopWindow  v-if="app.running" v-show="!app.minimized" :app="app" >

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
      <UiMenu w="52" bg="[#252c37]" mt="2" mr="6" title="الفلاتر">
        <UiMenuItem bg="[#3c4651]" hover="bg-[#]" text="white" title="مهمة" />
        <UiMenuItem bg="[#3c4651]" hover="bg-[#]" text="white" title="مكتمله" />
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
      <TodoList />
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
                <UiInput h="20" v-model="task" />
              </h4>
              <div v-if="!stateTitle" @click="toggleTitle()">
                <div flex="~" items="center">
                  <h4 text="w-100">
                    {{ task }}
                  </h4>
                  <div class="i-fa6-solid:pen text-xl mr-3"></div>
                </div>
              </div>
            </div>
          </template>
          <div flex="~ col">
            <div class="overflow-y-auto h-90 w-full">
              <textarea
                ref="textarea"
                bg="transparent"
                text="w-100"
                border="none"
                v-model="input"
                class="resize-none outline-none placeholder:text-w-100"
                cols="100"
                rows="10"
                placeholder="التفاصيل"
              />
            </div>
          </div>
          <div v-if="!stateSidebar" class="flex justify-center relative">
            <div
              @click="toggleSidebar()"
              class="i-bi:arrow-up-square-fill absolute top-15"
              text="xl w-100"
            ></div>
          </div>
          <Transition>
            <div
              v-if="stateSidebar"
              class="border rounded-lg flex flex-col mt-3 items-center h-20"
            >
              <div
                @click="toggleSidebar()"
                class="i-bi:arrow-down-square-fill"
                text="xl w-100"
              ></div>
              <div class="flex">
                <div></div>
                <div>df</div>
                <div>df</div>
              </div>
            </div>
          </Transition>
        </UiModal>
      </Teleport>
      <div ref="el" :style="style" style="position: fixed">
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
        @click="toggleModal()"
      >
        <div text="4xl" class="i-ant-design-plus-outlined"></div>
      </div>
      </div>
      <div m="50" text="w-100">
        {{hight}}
        {{width}}
      </div>
    </UiDesktopWindow>
  </Transition>
</template>

<script setup >
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'
import { useElementSize } from '@vueuse/core'

let search = ref(null);

const titleEl = ref(null);

const { textarea, input } = useTextareaAutosize();

const getApp = props.app.getSubApp(1);

const [stateModal, toggleModal] = useToggle(false);

const [stateSidebar, toggleSidebar] = useToggle(false);

const [stateTitle, toggleTitle] = useToggle(false);

const el = ref(null)
const elSize = ref(null)
const { width, height } = useElementSize(elSize)
console.log(width, height)
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 900, y: 600 },
  onMove: (value) => {
    // console.log(value)
    // x.value= width
    // y.value= height
  }
})
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
