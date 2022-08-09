import { acceptHMRUpdate, defineStore } from "pinia";

export const useAppNameStore = defineStore("app-name-store", {
    state: () => ({
        apps: [],
    }),

    getters: {
        getApps: state => state.apps,
    },

    actions: {
        
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAppNameStore, import.meta.hot));
}