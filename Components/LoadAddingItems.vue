<script setup>
import {  mdiDelete, mdiPlus,mdiMinus } from "@mdi/js";

import BaseButton from "@/Components/BaseButton.vue";
import VueMultiselect from "vue-multiselect";

import {  watch } from "@vue/runtime-core";

const props = defineProps({
    stock_items: {
        type: Object,
        default: () => {},
    },
    products: {
        type: Object,
        default: () => {},
    },
    stock: {
        type: Object,
        default: () => {},
    },
});


function addItem() {
    props.stock_items.push({ destination_id: "", product_d: "", weight: "", other: "" });
}

function removeLastItem() {
    props.stock_items.pop();
}
const removeItem = (index) => {
      props.stock_items.splice(index, 1)
};

const emits = defineEmits(['update:modelValue']);

watch(
  () => props.modelValue,
  (newValue) => {
    props.items = JSON.parse(JSON.stringify(newValue));
  },
  { deep: true }
);
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<template>
                <div >
                    <div class="flex flex-row w-fit rounded-lg space-x-4 mb-4 mt-4 border p-4">
                        <BaseButton
                            :icon="mdiPlus"
                            label="Add"
                            color="info"
                            rounded-full
                            small
                            @click="addItem"
                        />
                        <BaseButton
                            :icon="mdiMinus"
                            label="Remove"
                            color="danger"
                            rounded-full
                            small
                            @click="removeLastItem"
                            v-if="stock_items.length > 1"
                        />
                    </div>
                    <div class="flex mb-10 ml-4">
                        <div class="flex w-full ">
                            <div class="grow">
                                <div
                                    v-for="(item, index) in stock_items"
                                    :key="item"
                                    class=" flex flex-col space-x-1 mb-5"
                                >
                                    <h3 class="ml-2 mb-2 mt-2">
                                        Item {{ index + 1 }}
                                    </h3>
                                    <div class="block lg:flex lg:flex-row lg:space-x-2 ">
                                        <div class="flex flex-col grow space-y-2">
                                            <label :for="'product'+item.id">Product</label>
                                            <VueMultiselect
                                            v-model="item.product_id"
                                            :options="products"
                                            track-by="id"
                                            :id="'product'+item.id"
                                            label="name"
                                            :options-limit="6"
                                            class="shadow-md shadow-cyan-300/50"
                                        >
                                        </VueMultiselect>
                                        </div>

                                        <div class="flex flex-col grow space-y-2">
                                            <label :for="'destination_id'+item.id"
                                                >Destination</label
                                            >
                                            <VueMultiselect
                                                v-model="item.destination_id"
                                                :options="stock"
                                                track-by="id"
                                                :id="'destination_id'+item.id"
                                                label="name"
                                                :options-limit="6"
                                                class="shadow-md shadow-cyan-300/50"
                                            >
                                            </VueMultiselect>
                                        </div>
                                        <div class="flex flex-col grow space-y-2">
                                            <label :for="'weight'+item.id">Weight</label>
                                            <input
                                                v-model="item.weight"
                                                :id="'weight'+item.id"
                                                placeholder="Weight"
                                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                                            />
                                        </div>
                                        <div class="flex flex-col grow space-y-2">
                                            <label :for="`other${item.id}`">Other</label>
                                            <input
                                                v-model="item.other"
                                                :id="`other${item.id}`"
                                                placeholder="Other"
                                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                                            />
                                        </div>
                                        <div class="mt-10">
                                            <BaseButton
                                                :icon="mdiDelete"
                                                color="danger"
                                                rounded
                                                small
                                                @click="removeItem(index)"
                                                v-if="stock_items.length > 1"
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


</template>
