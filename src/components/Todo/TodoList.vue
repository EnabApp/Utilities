<template>
  <div
    class="w-52 h-56 bg-inherit rounded-lg shadow-sm border-t-7 border-green-400"
    m="6"
    mt="14"
  >
    <div class="p-2 text-center flex flex-col gap-5">
      <h3 class="font-semibold" text="white">Title</h3>
      <div>
        <p text="gray-300" class="text-sm">
          {{ description.substring(0, 155) + "..." }}
        </p>
      </div>
      <div class="flex justify-end mt-3">
        <p text="gray-400" class="text-xs">من 2022/23/2 الى 2023/24/8</p>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

let description = ref(`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Pellentesque euismod, nisi eu consectetur consectetur, nisl
nisi consectetur nisl, eu consectetur nisl nisi eu consectetur
consectetur.`);
</script>
