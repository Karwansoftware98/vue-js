<script setup>
import { Head, useForm } from "@inertiajs/vue3";
import { mdiAccountKey, mdiArrowLeftBoldOutline, mdiEye, mdiDelete, mdiPlus,mdiMinus } from "@mdi/js";
import LayoutAuthenticated from "@/Layouts/LayoutAuthenticated.vue";
import SectionMain from "@/Components/SectionMain.vue";
import SectionTitleLineWithButton from "@/Components/SectionTitleLineWithButton.vue";
import BaseButton from "@/Components/BaseButton.vue";
import BaseButtons from "@/Components/BaseButtons.vue";
import VueMultiselect from "vue-multiselect";
import {  ref } from "@vue/reactivity";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import {  computed, onMounted } from "@vue/runtime-core";
import LoadUpdateContractModal from "@/Components/LoadUpdateContractModal.vue";
import LoadAddingItems from "@/Components/LoadAddingItems.vue";
import MultiSelectComponent from "@/Components/MultiSelectComponent.vue";

const props = defineProps({
    data: {
        type: Object,
        default: () => {},
    },
    driver: {
        type: Object,
        default: () => {},
    },
    filters: Object,
    load_contract: {
        type: Object,
        default: () => {},
    },
    stock_items: {
        type: Object,
        default: () => {},
    },
});

const is_allowed_first = ref(false);
const is_allowed_second = ref(false);
const isModalActive = ref(false);
var truckNumber = ref();
const form = useForm({
    invoice_id: props.data.invoice_id,
    driver_id: props.data.load.driver?.id,
    driver_name: props.data.load.driver?.name,
    truck_number: props.driver?.truck_number,
    driver_phone_number: props.driver?.phone,
    first_destination: props.data.load.first_destination,
    second_destination: "",
    first_weight: props.data.load.first_weight,
    second_weight: props.data.load.second_weight,
    purchase: "",
    date: props.data.load.date,
    items: props.data.stock_items,
});
onMounted(() => {
    form.purchase = props.data.purchases.find(
        (stock) => stock.id === props.data.load.contract_id
    );
    const driv = props.data.drivers.find(
        (driver) => driver.id === props.data.load.driver_id
    );
    for (let i = 0; i < props.data.stock_items.length; i++) {
        form.items[i].destination_id =  props.data.stock.find(
        (stock) => stock.id === props.data.stock_items[i].destination_id
    );

    form.items[i].product_id =  props.data.products.find(
        (product) => product.id === props.data.stock_items[i].product_id
    );
    }

    form.driver_name = driv.name;
    form.driver_phone_number = driv.phone;
    form.truck_number = driv.truck_number;
    form.driver_id = driv.id;
});

let isAllowedFirst = computed(() => {
    if (props.data.load_contract[0].contract_type.id === 2 || props.data.load_contract[0].contract_type.id === 5) {
        return true;
    }
})

let isAllowedSecond = computed(() => {
    if (props.data.load_contract[0].contract_type.id === 1 || props.data.load_contract[0].contract_type.id === 5) {
        return true;
    }
 })

let submit = () => {
    form.post("/admin/loads/update");
};

function formatPrice(value) {
    let val = (value / 1).toFixed(2).replace(",", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function customLabel({ c_invoice_id, company, note, product, date, weighted_truck_qty, truck_qty }) {
    return `${c_invoice_id} || ${company.name} || ${note} || ${product.name} || ${date}||  ${weighted_truck_qty} =>  ${truck_qty}`;
}

function addItem() {
    form.items.push({ destination_id: "", product_d: "", weight: "", other: "" });
}

function removeLastItem() {
    console.log();
    form.items.pop();
}
const removeItem = (index) => {
      form.items.splice(index, 1)
    };
let canAddExtraItem = computed(() => {
    if (props.data.load.status_id === 5 || props.data.load.status_id === 5) {
        return true
    }
    return false
});
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<template>
    <LayoutAuthenticated label="Updating Load">
        <Head title="Updating Load" />
        <SectionMain>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                title="Updating Load"
                main
                class="flex flex-row"
            >
            {{ data.load.status_id}}
            {{ isAllowedFirst }}
                <BaseButton
                    :route-name="route('loads.index')"
                    :icon="mdiArrowLeftBoldOutline"
                    label="Back"
                    color="white"
                    rounded-full
                    small
                    class="shadow-lg shadow-gray-500/50"
                />
            </SectionTitleLineWithButton>
            <p>
                Load Id =>
                <span class="text-green-500 text-lg">{{
                    props.data.load.l_invoice_id
                }}</span>
            </p>
            <div
                class="grid grid-cols-2 md:flex md:justify-between mt-10 text-sm"
            >
                <p class="text-sm">
                    Invoice :
                    <span class="text-green-500">
                        {{ props.data.load_contract[0].c_invoice_id }}
                    </span>
                </p>
                <p class="text-sm">
                    Contract Type :
                    <span class="text-green-500">
                        {{ props.data.load_contract[0].contract_type.name }}
                    </span>
                </p>
                <p class="text-sm">
                    Company Name :
                    <span class="text-green-500">
                        {{ props.data.load_contract[0].company.name }}
                    </span>
                </p>
                <p class="text-sm">
                    Price :
                    <span class="text-green-500">
                        {{ formatPrice(props.data.load_contract[0].price) }}
                    </span>
                </p>
            </div>

            <form
                @submit.prevent="
                    form.put(route('loads.update', props.data.load))
                "
                class="mt-14"
            >
                <div class="block lg:flex lg:flex-row lg:space-x-2">
                    <!-- Driver start -->
                    <div class="flex flex-col border rounded-md p-6 space-y-2">
                        <div class="flex flex-col grow">
                            <label for="truck_number"
                                >Driver Truck Number</label
                            >
                            <input
                                v-model="form.truck_number"
                                id="truck_number"
                                placeholder="nruck number"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>
                        <div
                            class="text-red-400 text-sm"
                            v-if="form.errors.truck_number"
                        >
                            {{ form.errors.truck_number }}
                        </div>
                        <div class="flex flex-col grow">
                            <label for="driver_name">Driver Name</label>
                            <input
                                v-model="form.driver_name"
                                placeholder="driver name"
                                id="driver_name"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>
                        <div
                            class="text-red-400 text-sm"
                            v-if="form.errors.driver_name"
                        >
                            {{ form.errors.driver_name }}
                        </div>
                        <div class="flex flex-col grow">
                            <label for="driver_phone_numberdriver_phone_number"
                                >Driver Phone Number</label
                            >
                            <input
                                v-model="form.driver_phone_number"
                                id="driver_phone_number"
                                placeholder="phone number"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>
                    </div>
                    <!-- Driver End -->

                    <!-- Load start -->

                    <div
                        class="block mt-2 space-y-2 lg:space-y-0 lg:mt-0 lg:flex lg:flex-row border w-full rounded-md p-6 lg:w-64 lg:space-x-2 grow"
                    >
                        <div
                            class="border rounded-md p-4 space-y-2 lg:w-72 grow"
                        >
                            <div class="flex flex-col grow">
                                <label for="contract"
                                    >Contract</label
                                >
                                <BaseButton
                                    label="Contracts"
                                    id="contract"
                                    :icon="mdiEye"
                                    small
                                    @click="
                                        isModalActive = true;

                                    "
                                />
                                <div
                                    class="text-red-400 text-sm"
                                    v-if="form.errors.purchase"
                                >
                                    {{ form.errors.purchase }}
                                </div>
                                <Teleport to="body">
                                    <LoadUpdateContractModal
                                        v-model="isModalActive"
                                        large-title="Please confirm"
                                        button="success"
                                        has-cancel
                                    >
                                        <div class="w-full px-2 py-16 sm:px-0">
                                                 <VueMultiselect
                                                            id="pojijjhj"
                                                            v-model="
                                                                form.purchase
                                                            "
                                                            :custom-label="
                                                                customLabel
                                                            "
                                                            :options="
                                                                props.data
                                                                    .purchases
                                                            "
                                                            track-by="id"
                                                            label="company_name"
                                                            :options-limit="6"
                                                            name="note"
                                                            class="shadow-md shadow-cyan-300/50"
                                                            placeholder="select purchase contracts"
                                                        >
                                                        </VueMultiselect>
                                        </div>
                                    </LoadUpdateContractModal>
                                </Teleport>
                            </div>


                             <MultiSelectComponent
                            v-model="form.first_destination"
                            :data="data.stock"
                            label="First Destination"
                            idValue="first_destination"
                            :oldValue="data.load.first_destination"
                            :errors="form.errors.first_destination"
                            />


                            <MultiSelectComponent
                            v-model="form.second_destination"
                            :data="data.stock"
                            label="Second Destination"
                            idValue="second_destination"
                            :oldValue="data.load.second_destination"
                            :errors="form.errors.second_destination"
                            />

                            <div
                                class="text-red-400 text-sm"
                                v-if="form.errors.second_destination"
                            >
                                {{ form.errors.second_destination }}
                            </div>
                        </div>

                        <div class="border rounded-md p-4 space-y-2 grow">
                            <div class="flex flex-col grow">
                                <label for="companies_id">Date</label>
                                <input
                                    v-model="form.date"
                                    placeholder="Date"
                                    type="date"
                                    class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                                />
                            </div>
                            <div
                                class="text-red-400 text-sm"
                                v-if="form.errors.date"
                            >
                                {{ form.errors.date }}
                            </div>
                            <div class="flex flex-col grow">
                                <label for="first_weight">First Weight</label>
                                <input
                                    :disabled="isAllowedFirst "
                                    :class="
                                        isAllowedFirst
                                            ? 'cursor-not-allowed text-black'
                                            : ''
                                    "
                                    v-model="form.first_weight"
                                    id="first_weight"
                                    placeholder="First Weight"
                                    class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                                />
                            </div>
                            <div
                                class="text-red-400 text-sm"
                                v-if="form.errors.first_weight"
                            >
                                {{ form.errors.first_weight }}
                            </div>
                            <div class="flex flex-col grow">
                                <label for="second_weight">Second Weight</label>
                                <input
                                    :disabled="isAllowedSecond"
                                    :class="
                                        isAllowedSecond
                                            ? 'cursor-not-allowed'
                                            : ''
                                    "
                                    v-model="form.second_weight"
                                    id="second_weight"
                                    placeholder="Second Weight"
                                    class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                                />
                            </div>
                            <div
                                class="text-red-400 text-sm"
                                v-if="form.errors.second_weight"
                            >
                                {{ form.errors.second_weight }}
                            </div>
                        </div>
                    </div>

                    <!-- Load End -->
                </div>

                <LoadAddingItems v-if="canAddExtraItem" v-model="form.items"  :stock_items="form.items" :products="data.products" :stock="data.stock"/>

                <BaseButtons class="mt-10 justify-end">
                    <BaseButton
                        type="submit"
                        color="info"
                        label="Submit"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        class="shadow-lg shadow-blue-300/50"
                    />
                </BaseButtons>
            </form>

        </SectionMain>
    </LayoutAuthenticated>
</template>
