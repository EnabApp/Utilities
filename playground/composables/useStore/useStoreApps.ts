import { acceptHMRUpdate, defineStore } from "pinia";
import App from "~/classes/App";
import Widget from "~/classes/Widget";

export const useStoreApps = defineStore("apps", {
    state: () => ({
        all: [

        ],
        focused: "",

        apps: [
            new App({
                id: 1,
                name: 'Calculator',
                title: "الحاسبة",
                owned: false,
                points: 1999,
                icon: "i-ic-baseline-calculate",
                size: "min-w-md min-h-xl",
                maximizable: false,
                resizeable: false,
                utility: true,
            }),

            new App({
              id: 1,
              name: "Todo",
              title: "مهامي",
              icon: "i-ri-todo-line",
              maximized: false,
              solid: true,
              owned: true,
              size: "min-w-2xl min-h-3xl",
              // widgets: [
              //   new Widget({
              //     id: 1,
              //     name: 'First',
              //     title: 'للسوبر ماركت',
              //   })
              // ],
              // subApps: [
              //   new App({
              //     id: 1,
              //     name: 'Second',
              //     title: "برنامج ثاني",
              //     icon: "i-bxs-cart",
              //     size: "min-w-2xl min-h-3xl",
              //   })
              // ]
            }),



            new App({
                id: 3,
                name: 'appStore',
                title: "متجر الخدمات",
                icon: "i-bxs-cart",
                owned:true,
                points:1999,
                size: "min-w-xl min-h-3xl xl:min-w-xl xl:min-h-2xl md:min-w-xl md:min-h-2xl sm:min-w-xl sm:min-h-xl",
                maximized: true,
            }),
        ],
    }),

    getters: {
        getApps: state => state.apps,
        // isRunning: (state) => (app) => state.all.find(a => a.title === app.title).running,
        getApp: state => id => state.apps.find(app => app.id === id),
        getRunningApps: (state) => state.apps.filter(app => app.running),
        getOwned: (state) => state.apps.filter(app => app.owned),
        // getLockedApps: (state) => state.all.filter(a => a.locked),
        getFocused: (state) => state.focused,
        getChildrenApps: (state) => (title) => state.apps.filter(app => app.parentApp === title),
        anyRunningIsMaximized: (state) => state.apps.some(app => app.maximized && app.running && !app.minimized),
    },

    actions: {
        setFocus(title){
            this.focused = title;
        },

    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreApps, import.meta.hot));
}
