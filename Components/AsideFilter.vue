<script setup>
import { useLayoutStore } from "@/Stores/layout.js";
import { useStyleStore } from "@/Stores/style.js";
import RightFilterAside from "@/Components/RightFilterAside.vue";
import VueMultiselect from "vue-multiselect";

const layoutStore = useLayoutStore();
const styleStore = useStyleStore();
</script>

<template>
    <aside
        :class="[
            { 'hidden ': !layoutStore.isRightFilter },
            { dark: styleStore.darkMode },
        ]"
        id="asideFilter"
        class="w-72 fixed flex z-40 top-0 overflow-hidden right-0 h-screen transition-position border-2 border-gray-500 rounded-md pt-2"
    >
        <div
        :class="[
        styleStore.darkMode
            ? 'aside-scrollbars-[slate]'
            : styleStore.asideScrollbarsStyle,styleStore.asideStyle]
    "
            class="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-gray-50 text-slate-900 dark:bg-slate-800
             dark:text-slate-100 p-2"
        >

            <slot />
        </div>
    </aside>
</template>
