import { acceptHMRUpdate, defineStore } from "pinia";
import { useSupabaseClient, useNuxtApp } from "#imports";
import { setTransitionHooks } from "nuxt/dist/app/compat/capi";
export const useTodoStore = defineStore("todo-store", {
  state: () => ({
    tasks: [],
  }),
  getters: {
    getTasks: (state) => state.tasks,
    getArchivedTasks: (state) => state.tasks.filter((task) => task.is_complete),
    getNotArchivedTasks: (state) =>
      state.tasks.filter((task) => !task.is_complete),
  },
  actions: {
    //=======>> Update Task <<=======//
    async addTask(task) {
      const { $toast } = useNuxtApp();
      const supabase = useSupabaseClient();

      if (task.task.length <= 2) {
        $toast.error("عنوان المهمة لا يمكن ان يكون اقل من 3 حروف");
        return;
      }
      let { error, data } = await supabase
        .from("app_todo")
        .insert(task)
        .select("id, inserted_at")
        .single();

      if (error) {
        $toast.error("حدثت مشكلة أثناء الإضافة");
        return;
        console.log(error);
      }
      if (!error) {
        this.tasks.unshift({
          id: data.id,
          user_id: task.user_id,
          task: task.task,
          inserted_at: data.inserted_at,
          is_complete: task.is_complete,
        });
      }
    },
    //=======>> Update Task <<=======//
    async deleteTask(task) {
      const { $toast } = useNuxtApp();
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("app_todo")
        .delete()
        .eq("id", task.id);
      if (error) {
        $toast.error("حدثت مشكله اثناء الحذف");
        return;
      }
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    },

    //=======>> Update Task <<=======//
    async updateTask(task) {
      const { $toast } = useNuxtApp();
      const supabase = useSupabaseClient();
      let cloneTask = { ...task };
      delete cloneTask.id;

      let { error, data } = await supabase
        .from("app_todo")
        .update({
          ...cloneTask,
        })
        .eq("id", task.id)
        .single();

      if (error) {
        $toast.error("حدثت مشكله اثناء الحفظ");
        return;
      }
    },

    //=======>> Get Task <<=======//
    async fetchTasks() {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("app_todo")
        .select("id, task, is_complete, inserted_at");
      if (!error) this.tasks = data;
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot));
}
