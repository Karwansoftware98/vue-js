<script setup>
import { computed, getCurrentInstance, onMounted, ref, toRef, watch, watchEffect } from "vue";
import VueMultiselect from "vue-multiselect";

const props = defineProps({
    data: {
        type: Object,
        default: () => {},
    },
    errors: String,
    label: String,
    idValue: String,
    modelValue: String,
    oldValue: String,
});

const selectedValue = ref(props.modelValue);

const instance = getCurrentInstance();

const computedModelValue = computed({
  get: () => selectedValue.value,
  set: (value) => {
    selectedValue.value = value;
    instance.emit('update:modelValue', value);
  },
});

const updateModelValue = (value) => {
  selectedValue.value = value;
};
onMounted(() => {
    selectedValue.value = props.data.find(
        (stock) => stock.id === props?.oldValue
    );
});
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<template>
    <div class="flex flex-col grow">
        <label :for="idValue">{{ label }}</label>
        <VueMultiselect
            @input="updateModelValue"
            v-model="computedModelValue"
            :options="data"
            track-by="id"
            :id="idValue"
            label="name"
            :options-limit="6"
            class="shadow-md shadow-cyan-300/50"
        >
        </VueMultiselect>
    </div>
    <div class="text-red-400 text-sm" v-if="errors">
        {{ errors }}
    </div>
</template>
