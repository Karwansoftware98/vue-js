<script setup>
import AsideMenuItem from "@/Components/AsideMenuItem.vue";
import { Link } from "@inertiajs/vue3";

defineProps({
    isDropdownList: Boolean,
    menu: {
        type: Array,
        default: () => [],
    },

});
const emit = defineEmits(["menu-click"]);

const menuClick = (event, item) => {
    emit("menu-click", event, item);
};

</script>

<template>
    <ul>
        <AsideMenuItem
            v-for="(item, index) in menu"
            :key="index"
            :item="item"
            :is-dropdown-list="isDropdownList"
            @menu-click="menuClick"
            

        />


    </ul>
</template>
