<script setup>
import { Head, Link, router, useForm } from "@inertiajs/vue3";
import {
    mdiAccountKey,
    mdiArrowLeftBoldOutline,
    mdiConnection,
    mdiRefresh,
    mdiSetMerge,
    mdiDelete,
    mdiPlus,
    mdiMinus,
} from "@mdi/js";
import LayoutAuthenticated from "@/Layouts/LayoutAuthenticated.vue";
import SectionMain from "@/Components/SectionMain.vue";
import SectionTitleLineWithButton from "@/Components/SectionTitleLineWithButton.vue";
import CardBox from "@/Components/CardBox.vue";

import BaseButton from "@/Components/BaseButton.vue";
import BaseButtons from "@/Components/BaseButtons.vue";
import { computed, onBeforeUnmount, onMounted, ref } from "@vue/runtime-core";
import { useStyleStore } from "@/Stores/style";
import VueMultiselect from "vue-multiselect";
import { scaleStore } from "@/Stores/scale";

let store = scaleStore();
let keepReading = true;
let filtered = 0;
let port = null;
let buffer = new Uint8Array(8);
let bufferIndex = 0;
let intervalId = null;
let res = ref();


onBeforeUnmount(() => {
    clearInterval(intervalId);
});

const connectButton = () => {
    if (navigator.serial) {
        connectSerial();
    } else {
        alert("Web Serial API not supported");
    }
};

const ca = () => {
    try {
        keepReading = true;
        readData();
    } catch (e) {}
};

const connectSerial = async () => {
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });
        readData();
    } catch (e) {}
};

const readData = async () => {
    try {
        let reader;
        let textDecoder = new TextDecoder();
        while (port.readable && keepReading) {
            reader = port.readable.getReader();
            filtered = "";
            try {
                while (keepReading) {
                    const { value, done } = await reader.read();
                    if (done) {
                        keepReading = false;
                        break;
                    }
                    if (bufferIndex + value.length > buffer.length) {
                        bufferIndex = 0;
                    }
                    buffer.set(value, bufferIndex);
                    filtered = textDecoder.decode(buffer);
                    store.setResult(
                        filtered
                            .toString()
                            .replace(/[^0-9]/g, "")
                            .slice(length)
                    );
                    bufferIndex += value.length;
                    setTimeout(function timer() {
                    }, 1000);
                }

                keepReading = false;
            } catch (error) {
            } finally {
                keepReading = false;
            }
            keepReading = false;
        }
        keepReading = false;
    } catch (e) {
    }
};

const refreshButton = () => {
    try {
        ca();
    } catch (e) {}
};
const props = defineProps({
    data: {
        type: Object,
        default: () => [],
    },
    scale: {
        type: Object,
        default: () => ({}),
    },
    can: {
        type: Object,
        default: () => ({}),
    },
});
const form = useForm({
    _method: "put",
    scale1: props.scale.scale1,
    date1: props.scale.date1,
    scale2: props.scale.scale2,
    date2: props.scale.date2,
    total: props.scale.total,
    note: props.scale.note,
    first_destination: "",
    second_destination: "",
    items: props.data.stock_items,
});
onMounted(() => {
    for (let i = 0; i < props.data.stock_items.length; i++) {
        form.items[i].destination_id = props.data.stock.find(
            (stock) => stock.id === props.data.stock_items[i].destination_id
        );

        form.items[i].product_id = props.data.products.find(
            (product) => product.id === props.data.stock_items[i].product_id
        );
    }
    form.second_destination = props.data.stock.find(
        (stock) => stock.id === props.data.load[0].second_destination.id
    );
    form.first_destination = props.data.stock.find(
        (stock) => stock.id === props.data.load[0].first_destination.id
    );
    intervalId = setInterval(() => {
        res.value = store.result;
    }, 100);
});
const styleStore = useStyleStore();

const current = new Date().toLocaleString("en-US", {
    timeZone: "asia/baghdad",
});

form.date1 = form.date1 == null ? current : form.date1;
form.date2 = form.date2 == null ? current : form.date2;

let total = computed(() => {
    return form.scale1 == 0 || form.scale2 == 0
        ? parseInt(form.total)
        : Math.abs(parseInt(form.scale1) - parseInt(form.scale2));
});

let setValue = () => {
    if (props.scale.scale1 < 1 && props.scale.scale2 == 0) {
        form.scale1 = store.result;
    }
    if (props.scale.scale2 == 0 && props.scale.scale1 > 0) {
        form.scale2 = store.result;
    }
};

let hideSetValue = computed(() => {
    if (
        props.data.load[0].status.id === 5 ||
        props.data.load[0].status.id === 6
    ) {
        return true;
    }
    return false;
});
function addItem() {
    form.items.push({
        product_id: "",
        destination_id: "",
        weight: "",
        other: "",
    });
}

function removeLastItem() {
    form.items.pop();
}
const removeItem = (index) => {
    form.items.splice(index, 1);
};

let canChangeDestination = computed(() => {
    if (props.data.load_contract[0].contract_type_id === 1) {
        return false;
    }
    return true;
});

let internal = computed(() => {
    if (props.data.load_contract[0].contract_type_id == 5) {
        return true;
    }
    return false;
});
let internalStatus = computed(() => {
    if (
        props.data.load_contract[0].contract_type_id == 5 &&
        (props.data.load[0].status.id == 5 || props.data.load[0].status.id == 6)
    ) {
        return true;
    }
    return false;
});

let canChangeItems = computed(() => {
    if (
        props.data.load[0].status.id == 5 ||
        props.data.load[0].status.id == 6
    ) {
        return true;
    }
    return false;
});

let formItems = computed(() => form?.items || []);

let totalWeight = computed(() => {
  return formItems.value.reduce((total, item) =>  {
    let weight = parseInt(item.weight);
    return isNaN(weight) ? total : total + weight;
}, 0);
});


    let hasDuplicateDestinations = computed(() => {
        let destinationIds = new Set();
  for (let item of form.items) {
    if (destinationIds.has(item.destination_id)) {
      return true; // Found a duplicate destination
    }
    destinationIds.add(item.destination_id);
  }
  return false;
});

const destinationIdsSize = computed(() => {
  const destinationIds = new Set();
  for (const item of form.items) {
    if (!destinationIds.has(item.destination_id)) {
      destinationIds.add(item.destination_id.id);
    }
  }
  return destinationIds.size;
});
const hasMatchingDestination = computed(() => {
    const type = props.data.load_contract[0].contract_type_id;
  const loadDestinationId =   props.data.load[0].first_destination.id;
  const loadDestinationIdTwo =   props.data.load[0].second_destination.id;
  return form.items.some(item => {
    if(type === 1 || type === 5){
        return item.destination_id.id === loadDestinationIdTwo
    }
   return item.destination_id.id === loadDestinationId

});
});
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<template>
    <LayoutAuthenticated>
        <Head title="Add scale" />
        <SectionMain>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                title="Add scale"
                main
            >
                <BaseButton
                    :route-name="route('scale.index')"
                    :icon="mdiArrowLeftBoldOutline"
                    label="Back"
                    color="white"
                    rounded-full
                    small
                />
            </SectionTitleLineWithButton>
            {{ data.load_contract[0].contract_type_id }}
            <NotificationBar
                v-if="$page.props.flash.danger"
                color="danger"
                :icon="mdiAlertBoxOutline"
            >
                {{ $page.props.flash.danger }}
            </NotificationBar>
            <CardBox>
                <form
                    @submit.prevent="
                        form.post(route('scale.update', props.scale))
                    "
                >
                    <div
                        class="flex flex-col md:flex-row mb-10 border border-gray-400 dark:border-white p-5 md:pb-10 rounded md:space-x-10"
                    >
                        <!-- <div class="hidden md:flex md:flex-row justify-between lg:px-6 "> -->
                        <div
                            class="mt-8 bg-gray-300 dark:bg-slate-200 shadow rounded-lg md:flex md:flex-col lg:px-6 flex-1"
                        >
                            <div
                                class="flex flex-row justify-around mt-5 border-l h-max"
                            >
                                <BaseButton
                                    @click="connectButton"
                                    type="button"
                                    :icon="mdiConnection"
                                    label="Connect"
                                    color="white"
                                    rounded-full
                                    small
                                />
                                <BaseButton
                                    @click="refreshButton"
                                    type="button"
                                    :icon="mdiRefresh"
                                    label="Refresh"
                                    color="white"
                                    rounded-full
                                    small
                                />
                                <div
                                    :class="[hideSetValue ? 'hidden' : 'flex']"
                                >
                                    <BaseButton
                                        @click="setValue"
                                        type="button"
                                        :icon="mdiSetMerge"
                                        label="setValue"
                                        color="white"
                                        rounded-full
                                        small
                                    />
                                </div>
                            </div>
                            <div>
                                <p
                                    class="text-black text-7xl mt-14 p-8 md:ml-10"
                                >
                                    scale:
                                    <span
                                        >{{
                                            isNaN(parseInt(res))
                                                ? 0
                                                : parseInt(res)
                                        }}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <!-- </div> -->

                        <div
                            class="md:max-w-6xl md:mx-auto w-full flex-1 mt-10 md:mt-0"
                        >
                            <!-- <div class="grid place-items-center"> -->
                            <div class="flex flex-col space-y-3">
                                <div
                                    class="flex flex-col md:flex-row md:space-x-2 grow"
                                >
                                    <div class="grow">
                                        <label for="scale1">Scale 1</label>
                                        <input
                                            id="scale1"
                                            :disabled="!can.hand"
                                            :class="[
                                                can.hand
                                                    ? ''
                                                    : 'hover:cursor-not-allowed text-white',
                                            ]"
                                            v-model="form.scale1"
                                            placeholder="scale one"
                                            class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                                        />
                                        <div
                                            class="text-red-400 text-md mt-2"
                                            v-if="form.errors.scale1"
                                        >
                                            {{ form.errors.scale1 }}
                                        </div>
                                    </div>
                                    <div class="grow">
                                        <label for="date1">Date 1</label>

                                        <input
                                            id="date1"
                                            :disabled="!can.hand"
                                            :class="[
                                                can.hand
                                                    ? ''
                                                    : 'hover:cursor-not-allowed text-white',
                                            ]"
                                            v-model="form.date1"
                                            placeholder="unit value"
                                            class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                                        />
                                        <div
                                            class="text-red-400 text-md mt-2"
                                            v-if="form.errors.date1"
                                        >
                                            {{ form.errors.date1 }}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="flex flex-col md:flex-row md:space-x-2"
                                >
                                    <div class="grow">
                                        <label for="scale2">Scale 2</label>
                                        <input
                                            id="scale2"
                                            :disabled="!can.hand"
                                            :class="[
                                                can.hand
                                                    ? ''
                                                    : 'hover:cursor-not-allowed text-white',
                                            ]"
                                            v-model="form.scale2"
                                            placeholder="scale two"
                                            class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                                        />
                                        <div
                                            class="text-red-400 text-md mt-2"
                                            v-if="form.errors.scale2"
                                        >
                                            {{ form.errors.scale2 }}
                                        </div>
                                    </div>
                                    <div class="grow">
                                        <label for="date2">Date 2</label>
                                        <input
                                            id="date2"
                                            :disabled="!can.hand"
                                            :class="[
                                                can.hand
                                                    ? ''
                                                    : 'hover:cursor-not-allowed text-white',
                                            ]"
                                            v-model="form.date2"
                                            placeholder="unit value"
                                            class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                                        />
                                        <div
                                            class="text-red-400 text-md mt-2"
                                            v-if="form.errors.date2"
                                        >
                                            {{ form.errors.date2 }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="grow">
                                <label for="total">Total</label>
                                <input
                                    id="total"
                                    disabled
                                    :value="total"
                                    placeholder="unit value"
                                    class="hover:cursor-not-allowed w-full pl-3 py-2 border border-gray-300 dark:text-white text-black rounded shadow-md shadow-cyan-300/50"
                                />
                            </div>
                            <div class="grow">
                                <label for="note">Note</label>
                                <input
                                    id="note"
                                    v-model="form.note"
                                    placeholder="note"
                                    class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                                />
                                <div
                                    class="text-red-400 text-md mt-2"
                                    v-if="form.errors.note"
                                >
                                    {{ form.errors.note }}
                                </div>
                                <div
                                    v-if="!internal"
                                    class="flex flex-col grow"
                                    :class="[
                                        !canChangeDestination
                                            ? 'cursor-not-allowed'
                                            : '',
                                    ]"
                                >
                                    <label for="first_destination"
                                        >First Destination</label
                                    >
                                    <VueMultiselect
                                        :disabled="!canChangeDestination"
                                        v-model="form.first_destination"
                                        :options="data.stock"
                                        track-by="id"
                                        id="first_destination"
                                        label="name"
                                        :options-limit="6"
                                        class="shadow-md shadow-cyan-300/50"
                                    >
                                    </VueMultiselect>
                                </div>
                                <div
                                    v-if="!internal"
                                    class="flex flex-col grow"
                                    :class="[
                                        canChangeDestination
                                            ? 'cursor-not-allowed'
                                            : '',
                                    ]"
                                >
                                    <label for="second_destination"
                                        >Second Destination</label
                                    >
                                    <VueMultiselect
                                        :disabled="canChangeDestination"
                                        v-model="form.second_destination"
                                        :options="data.stock"
                                        track-by="id"
                                        id="second_destination"
                                        label="name"
                                        :options-limit="6"
                                        class="shadow-md shadow-cyan-300/50"
                                    >
                                    </VueMultiselect>
                                </div>
                                <div
                                    v-if="internal"
                                    class="flex flex-col grow"
                                    :class="[
                                        internalStatus
                                            ? 'cursor-not-allowed'
                                            : '',
                                    ]"
                                >
                                    <label for="first_destination"
                                        >First Destination l</label
                                    >
                                    <VueMultiselect
                                        :disabled="internalStatus"
                                        v-model="form.first_destination"
                                        :options="data.stock"
                                        track-by="id"
                                        id="first_destination"
                                        label="name"
                                        :options-limit="6"
                                        class="shadow-md shadow-cyan-300/50"
                                    >
                                    </VueMultiselect>
                                </div>
                                <div
                                    v-if="internal"
                                    class="flex flex-col grow"
                                    :class="[
                                        internalStatus
                                            ? 'cursor-not-allowed'
                                            : '',
                                    ]"
                                >
                                    <label for="second_destination"
                                        >Second Destination l</label
                                    >
                                    <VueMultiselect
                                        :disabled="internalStatus"
                                        v-model="form.second_destination"
                                        :options="data.stock"
                                        track-by="id"
                                        id="second_destination"
                                        label="name"
                                        :options-limit="6"
                                        class="shadow-md shadow-cyan-300/50"
                                    >
                                    </VueMultiselect>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="block lg:flex lg:flex-row lg:space-x-2 border rounded-md p-6 mt-2"
                    >
                        <!-- Driver start -->
                        <div class="flex flex-col p-6 space-y-2 grow">
                            <div class="flex flex-col grow">
                                <p for="truck_number">
                                    Truck Number:
                                    <span class="text-green-400">
                                        {{
                                            props.data.load[0].driver
                                                .truck_number
                                        }}
                                    </span>
                                </p>
                            </div>
                            <div class="flex flex-col grow">
                                <p for="truck_number">
                                    Driver Name:
                                    <span class="text-green-400">
                                        {{ props.data.load[0].driver.name }}
                                    </span>
                                </p>
                            </div>
                            <div class="flex flex-col grow">
                                <p for="truck_number">
                                    Driver Phone:
                                    <span class="text-green-400">
                                        {{ props.data.load[0].driver.phone }}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="p-4 space-y-2 lg:w-72 grow">
                            <div class="flex flex-col grow">
                                <p class="text-sm">
                                    Company Name :
                                    <span class="text-green-400">
                                        {{ props.data.load[0].company.name }}
                                    </span>
                                </p>
                            </div>

                            <div class="flex flex-col grow">
                                <p class="text-sm">
                                    First Destination :
                                    <span class="text-green-400">
                                        {{
                                            props.data.load[0].first_destination
                                                .name
                                        }}
                                    </span>
                                </p>
                            </div>
                            <div class="flex flex-col grow">
                                <p class="text-sm">
                                    Second Destination :
                                    <span class="text-green-400">
                                        {{
                                            props.data.load[0]
                                                .second_destination.name
                                        }}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div class="p-4 space-y-2 grow">
                            <div class="flex flex-col grow">
                                <p class="text-sm">
                                    Date:
                                    <span class="text-green-400">
                                        {{ props.data.load[0].date }}
                                    </span>
                                </p>
                            </div>
                            <div class="flex flex-col grow">
                                <p class="text-sm">
                                    First Weight :
                                    <span class="text-green-400">
                                        {{ props.data.load[0].first_weight }}
                                    </span>
                                </p>
                            </div>
                            <div class="flex flex-col grow">
                                <p class="text-sm">
                                    Second Weight :
                                    <span class="text-green-400">
                                        {{ props.data.load[0].second_weight }}
                                    </span>
                                </p>
                            </div>
                            <div class="flex flex-col grow">
                                <p class="text-sm">
                                    Status :
                                    <span class="text-green-400">
                                        {{ props.data.load[0].status.name }}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end mt-2">
                        <BaseButtons>
                            <BaseButton
                                type="submit"
                                color="info"
                                label="Print"
                                :route-name="route('print.scale', scale.id)"
                            />
                            <BaseButton
                                type="submit"
                                color="info"
                                label="Submit"
                                :disabled="
                                    form.processing ||
                                    (form.items.length > 1 &&
                                        (totalWeight != total ||
                                            hasDuplicateDestinations))
                                "
                                :class="[
                                    form.items.length > 1 &&
                                    (totalWeight != total ||
                                        (hasDuplicateDestinations &&
                                            destinationIdsSize !=
                                                form.items.length))
                                        ? 'hidden'
                                        : '',
                                ]"
                            />
                        </BaseButtons>
                    </div>
                    <div>
                        <div
                            :class="[canChangeItems ? 'hidden' : '']"
                            class="flex flex-row w-fit rounded-lg space-x-4 mb-4 mt-4 border p-4"
                        >
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
                                v-if="form.items.length > 1"
                            />
                            <div
                                :class="
                                    totalWeight != total
                                        ? 'text-red-400'
                                        : 'text-green-400'
                                "
                                class="text-center mt-1"
                            >
                                {{ totalWeight }}
                            </div>
                            <!-- {{ destinationIdsSize }} -->
                            <div
                                v-if="hasDuplicateDestinations"
                                class="text-red-500 ml-2"
                            >
                                Items must have different destinations.
                            </div>
                            <div
                                v-if="
                                    !hasMatchingDestination &&
                                    form.items.length > 1
                                "
                                class="text-red-500 ml-2"
                            >
                                at least select load destination in one of the
                                items
                            </div>
                        </div>
                        <div class="flex mb-10 ml-4">
                            <div class="flex w-full">
                                <div class="grow">
                                    <div
                                        v-for="(item, index) in form.items"
                                        :key="item"
                                        class="flex flex-col space-x-1 mb-5"
                                    >
                                        <h3 class="ml-2 mb-2 mt-2">
                                            Item {{ index + 1 }}
                                        </h3>
                                        <div
                                            class="block lg:flex lg:flex-row lg:space-x-2"
                                        >
                                            <div
                                                class="flex flex-col grow space-y-2"
                                            >
                                                <label :for="'product' + index"
                                                    >Product</label
                                                >
                                                <VueMultiselect
                                                    v-model="item.product_id"
                                                    :options="data.products"
                                                    track-by="id"
                                                    :id="'product' + index"
                                                    label="name"
                                                    :options-limit="6"
                                                    class="shadow-md shadow-cyan-300/50"
                                                >
                                                </VueMultiselect>
                                            </div>

                                            <div
                                                class="flex flex-col grow space-y-2"
                                            >
                                                <label
                                                    :for="
                                                        'destination_id' + index
                                                    "
                                                    >Destination</label
                                                >
                                                <VueMultiselect
                                                    v-model="
                                                        item.destination_id
                                                    "
                                                    :options="data.stock"
                                                    track-by="id"
                                                    :id="
                                                        'destination_id' + index
                                                    "
                                                    label="name"
                                                    :options-limit="6"
                                                    class="shadow-md shadow-cyan-300/50"
                                                >
                                                </VueMultiselect>
                                            </div>
                                            <div
                                                class="flex flex-col grow space-y-2"
                                            >
                                                <label :for="'weight' + index"
                                                    >Weight</label
                                                >
                                                <input
                                                    v-model="item.weight"
                                                    :id="'weight' + index"
                                                    placeholder="Weight"
                                                    class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                                                />
                                            </div>
                                            <div
                                                class="flex flex-col grow space-y-2"
                                            >
                                                <label :for="`other${index}`"
                                                    >Other</label
                                                >
                                                <input
                                                    v-model="item.other"
                                                    :id="`other${index}`"
                                                    placeholder="Other"
                                                    class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                                                />
                                            </div>
                                            <div
                                                class="mt-10"
                                                :class="[
                                                    canChangeItems
                                                        ? 'hidden'
                                                        : '',
                                                ]"
                                            >
                                                <BaseButton
                                                    :icon="mdiDelete"
                                                    color="danger"
                                                    rounded
                                                    small
                                                    @click="removeItem(index)"
                                                    v-if="form.items.length > 1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
