
<script setup>
import {
    mdiMinus,
    mdiPlus,

} from "@mdi/js";
import { reactive } from "vue";
import axios from "axios";
import BaseButton from "./BaseButton.vue";

const form = reactive([{ name: "", price: '' }]);

const addRow = () => {
    form.push({ name: '', price: '' });
};

const removeRow = (index) => {
    if (form.length > 1) {
        form.splice(index, 1);
    }
};

const saveItem = () => {
    axios.post("items", form).then((res) => {
        console.log(res);
    });
};
</script>

<template>
    <div class="flex flex-row space-x-4 mb-4">

            <BaseButton
            :icon="mdiPlus"
            label="Add"
            color="info"
            rounded-full
            small
            @click="addRow"
        />
            <BaseButton
            :icon="mdiMinus"
            label="Remove"
            color="danger"
            rounded-full
            small
            @click="removeRow(index)"
        />

    </div>
    <div class="flex mb-4 ml-4">
        <div class="flex w-full">
            <div class="grow">
                <div
                    v-for="(item, index) in form"
                    :key="item"
                    class="flex flex-col space-x-1 "
                >
                    <h3 class="ml-2 mb-2">Item {{ index + 1 }}</h3>
                    <div class="flex flex-row space-x-2">
                        <div class="flex flex-col grow space-y-2">
                            <label for="second_weight">Second Weight</label>
                            <input
                                :disabled="is_allowed_second"
                                :class="
                                    is_allowed_second
                                        ? 'cursor-not-allowed'
                                        : ''
                                "
                                v-model="item.name"
                                id="second_weight"
                                placeholder="Second Weight"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>
                        <div class="flex flex-col grow space-y-2">
                            <label for="second_weight">Second Weight</label>
                            <input
                                :disabled="is_allowed_second"
                                :class="
                                    is_allowed_second
                                        ? 'cursor-not-allowed'
                                        : ''
                                "
                                v-model="item.price"
                                id="second_weight"
                                placeholder="Second Weight"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>
                        <div class="flex flex-col grow space-y-2">
                            <label for="second_weight">Second Weight</label>
                            <input
                                :disabled="is_allowed_second"
                                :class="
                                    is_allowed_second
                                        ? 'cursor-not-allowed'
                                        : ''
                                "
                                v-model="item.price"
                                id="second_weight"
                                placeholder="Second Weight"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>
                        <div class="flex flex-col grow space-y-2">
                            <label for="second_weight">Second Weight</label>
                            <input
                                :disabled="is_allowed_second"
                                :class="
                                    is_allowed_second
                                        ? 'cursor-not-allowed'
                                        : ''
                                "
                                v-model="item.price"
                                id="second_weight"
                                placeholder="Second Weight"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>


                    </div>
                </div>

                <button
                    type="button"
                    class="btn btn-success mt-3"
                    @click="saveItem"
                >
                    Save
                </button>
            </div>
        </div>
    </div>
</template>
