import { acceptHMRUpdate, defineStore } from "pinia";
import { useSupabaseClient, useNuxtApp } from "#imports";
import { setTransitionHooks } from "nuxt/dist/app/compat/capi";
export const useTodoStore = defineStore("todo-store", {
  state: () => ({
    tasks: [],
  }),
  getters: {
    getTasks: (state) => state.tasks,
    getArchivedTasks: state => state.tasks.filter(task => task.is_complete),
    getNotArchivedTasks: state => state.tasks.filter(task => !task.is_complete)
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
        .select("id, inserted_at")
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
        inserted_at: data.inserted_at,
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
        .eq("id", task.id);
      if (error) {
        $toast.error("حدثت مشكله اثناء الحذف");
        return;
      }
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    },

    async changeDate(task) {
      const { $toast } = useNuxtApp();
      const supabase = useSupabaseClient();

      console.log(task)
      // const { data, error } = await supabase
      //   .from("app_todo")
      //   .update({ inserted_at: task.inserted_at });
    },

    async updateTask(task) {
      const { $toast } = useNuxtApp();
      const supabase = useSupabaseClient();
      let cloneTask = { ...task };
      delete cloneTask.id

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
