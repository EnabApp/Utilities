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
        console.log(error);
      }

      this.tasks.unshift({
        id: data.id,
        user_id: task.user_id,
        task: task.task,
        inserted_at: task.inserted_at,
        is_complete: task.is_complete,
      });
    },

    //FIXME: the id is missing! (FIX: pass the correct id)
    async deleteTask(task) {
      const { $toast } = useNuxtApp();
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("app_todo")
        .delete()
        .eq( "id", task.id);
      if (error) {
        $toast.error("حدثت مشكله اثناء الحذف");
        return;
      }
      $toast.success("تم الحذف بنجاح");
    },

    async changeDate(task) {
      const { $toast } = useNuxtApp();
      const supabase = useSupabaseClient();

      const { data, error } = await supabase
        .from("app_todo")
        .update({ task: task.task });
    },

    async changeTask() {
      const { $toast } = useNuxtApp();
      const supabase = useSupabaseClient();

      let { error, data } = await supabase
        .from("app_todo")
        .update({
          task: task.task,
        })
        .select("id")
        .single();

      if (error) {
        $toast.error("حدثت مشكله اثناء التغيير");
        return;
      }
      this.task = task.task;
    },

    async changeCheckBox(task) {
      const { $toast } = useNuxtApp();
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("cities")
        .update({ is_complete: "Middle Earth" })
        .match({ name: "Auckland" });
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
