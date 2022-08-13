import { acceptHMRUpdate, defineStore } from "pinia";
import { useSupabaseClient, useNuxtApp } from "#imports";
export const useTodoStore = defineStore("todo-store", {
  state: () => ({
    tasks: [],
  }),
  getters: {
    getTasks: (state) => state.tasks,
  },
  actions: {
    async addTask(task) {
      const { $toast } = useNuxtApp();
      const supabase = useSupabaseClient();

      if (task.task.length <= 3) {
        $toast.error("عنوان المهمة لا يمكن ان يكون اقل من 4 حروف");
        return;
      }
      let { error, data } = await supabase
        .from("app_todo")
        .insert(task)
        .select("id")
        .single();

      if (error) {
        $toast.error("حدثت مشكلة أثناء الإضافة");
        return;
      }

      this.tasks.unshift({
        id: data.id,
        user_id: task.user_id,
        task: task.task,
        inserted_at: task.inserted_at,
        is_complete: task.is_complete,
      });
    },

    // FIXME: this is not working
    async removeTask(id) {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("add_todo")
        .delete()
        .match({ id: id });
    },
    // TODO: make the ability to update the task
    async changeTask() {
      const supabase = useSupabaseClient();
    },

    async changeComplete() {
      const supabase = useSupabaseClient();
    },

    async changeDate() {
      const supabase = useSupabaseClient();
    },

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
