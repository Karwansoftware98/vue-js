<script setup>
import { computed, onMounted, ref } from "vue";



const props = defineProps({
    weight: {
        type: Object,
        default: () => ({}),
    },
})
onMounted(() => {
    console.log(props.weight);

})

</script>

<template>
    <nav
        class="bottom-0 left-0 right-0 fixed bg-gray-50 h-14 z-30 transition-position w-auto dark:bg-slate-800"
    >
        <div class="flex flex-row justify-end mr-32 space-x-6">
            <p>
                Total Company Weight: {{ props.weight.first_weight }}
            </p>
            <p>
                Total weight:
            </p>
            <p>
                difference:
            </p>
        </div>
    </nav>
</template>
