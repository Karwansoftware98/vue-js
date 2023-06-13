<script setup>
import { mdiLogout, mdiClose } from "@mdi/js";
import { computed } from "vue";
import { useLayoutStore } from "@/Stores/layout.js";
import { useStyleStore } from "@/Stores/style.js";
import BaseIcon from "@/Components/BaseIcon.vue";
import { Link, useForm } from "@inertiajs/vue3";


const layoutStore = useLayoutStore();

const styleStore = useStyleStore();


</script>

<template>

</template>
