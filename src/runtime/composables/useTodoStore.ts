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

    async changeDate(task) {
      const { $toast } = useNuxtApp();
      const supabase = useSupabaseClient();

      let { error, data } = await supabase
        .from("app_todo")
        .update({
          inserted_at: task.inserted_at,
        })
        .select("id")
        .single();

      if (error) {
        $toast.error("حدثت مشكله اثناء التغيير");
        return;
      }
      this.inserted_at = task.inserted_at;
    },

    async changeTask(task){
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
    
    async changeComplete(task) {
      const { $toast } = useNuxtApp();
      const supabase = useSupabaseClient();

      let { error, data } = await supabase
        .from("app_todo")
        .update({
          is_complete: task.is_complete,
        })
        .select("id")
        .single();

      if (error) {
        $toast.error("حدثت مشكله اثناء التغيير");
        return;
      }
      this.is_complete = data;
    },

    //FIXME: this is not working
    async deleteTask(task) {
      const { $toast } = useNuxtApp();
      const supabase = useSupabaseClient();

      let { error } = await supabase
        .from("app_todo")
        .delete()
        .where("id", id)
        .single();

      if (error) {
        $toast.error("حدثت مشكلة أثناء الحذف");
        return;
      }
      this.task = this.task.filter((t) => t.id !== id);
      $toast.success("تم الحذف بنجاح");
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
