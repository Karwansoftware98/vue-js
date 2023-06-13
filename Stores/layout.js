import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layout", {
    state: () => ({
        isAsideMobileExpanded: false,
        isAsideLgActive: false,
        isRightFilter:false,
        is_allowed_second:false,
        is_allowed_first:false,
        load_first_date:'',
        load_second_date:'',

    }),

    //   actions: {
    //     asideMobileToggle () {
    //       this.isAsideMobileExpanded = !this.isAsideMobileExpanded
    //     }
    //   }
});
