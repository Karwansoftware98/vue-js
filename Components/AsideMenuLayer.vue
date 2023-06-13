<script setup>
import { mdiLogout, mdiClose } from "@mdi/js";
import { computed } from "vue";
import { useLayoutStore } from "@/Stores/layout.js";
import { useStyleStore } from "@/Stores/style.js";
import AsideMenuList from "@/Components/AsideMenuList.vue";
import AsideMenuItem from "@/Components/AsideMenuItem.vue";
import BaseIcon from "@/Components/BaseIcon.vue";

defineProps({
    menu: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(["menu-click"]);

const layoutStore = useLayoutStore();

const styleStore = useStyleStore();

const menuClick = (event, item) => {
    emit("menu-click", event, item);
};
</script>

<template>
    <aside
        id="aside"
        class="lg:py-2 lg:pl-2 w-80 fixed flex z-40 top-0 h-screen transition-position overflow-hidden  bg-gray-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100 rounded-lg"
    >
        <div
            :class="styleStore.asideStyle"
            class="rounded-xl flex-1 flex flex-col overflow-hidden  bg-gray-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
        >
            <div
                :class="styleStore.asideBrandStyle"
                class="flex flex-row h-14 items-center justify-between  bg-gray-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
            >
                <div class="flex-1 text-left pl-6 bg-gray-00 text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                    <b class="font-black">Golden Energy</b>
                </div>
                <button
                    class="inline-block p-3  bg-gray-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                    @click.prevent="layoutStore.isAsideLgActive = false"
                >
                    <BaseIcon :path="mdiClose" />
                </button>
            </div>
            <div
                :class="
                    styleStore.darkMode
                        ? 'aside-scrollbars-[slate]'
                        : styleStore.asideScrollbarsStyle
                "
                class="flex-1 overflow-y-auto overflow-x-hidden"
            >
                <AsideMenuList :menu="menu" @menu-click="menuClick" />
            </div>
        </div>
    </aside>
</template>
