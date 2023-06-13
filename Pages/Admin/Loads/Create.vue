<script setup>
import { Head } from "@inertiajs/vue3";
import { mdiAccountKey, mdiArrowLeftBoldOutline, mdiEye } from "@mdi/js";
import LayoutAuthenticated from "@/Layouts/LayoutAuthenticated.vue";
import SectionMain from "@/Components/SectionMain.vue";
import SectionTitleLineWithButton from "@/Components/SectionTitleLineWithButton.vue";
import BaseButton from "@/Components/BaseButton.vue";
import BaseButtons from "@/Components/BaseButtons.vue";
import VueMultiselect from "vue-multiselect";
import { ref } from "@vue/reactivity";
import LoadContractModal from "@/Components/LoadContractModal.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { useForm } from 'laravel-precognition-vue-inertia'
import { DateTime } from 'luxon';
import { onMounted } from "vue";
import MultiSelectComponent from "@/Components/MultiSelectComponent.vue";

const props = defineProps({
    data: {
        type: Object,
        default: () => [],
    },
    driver: {
        type: Object,
        default: () => {},
    },
    filters: Object,
});

const is_allowed_first = ref(false);
const is_allowed_second = ref(false);
const isModalActive = ref(false);

var truckNumber = ref();

const form = useForm('post', route('loads.store'), {
    invoice_id: props.data.invoice_id,
    driver_id: props.driver?.id,
    driver_name: props.driver?.name,
    truck_number: props.driver?.truck_number,
    driver_phone_number: props.driver?.phone,
    first_destination: props.first_destination?.id,
    second_destination: "",
    first_weight: "",
    second_weight: "",
    purchase: "",
    external_purchase: "",
    sale: "",
    external_sale: "",
    internal: "",
    date: "",
});

let purchase = (event) => {
    console.log("pur");
    is_allowed_first.value = false;
    is_allowed_second.value = true;
    form.internal = null;
    form.external_purchase = null;
    form.sale = null;
    form.external_sale = null;
};
let sale = (event) => {
    is_allowed_first.value = true;
    is_allowed_second.value = false;
    form.purchase = null;
    form.external_purchase = null;
    form.internal = null;
    form.external_sale = null;
};
let ext_pur = (event) => {
    is_allowed_first.value = false;
    is_allowed_second.value = false;
    form.purchase = null;
    form.internal = null;
    form.sale = null;
    form.external_sale = null;
};
let ext_sale = (event) => {
    is_allowed_first.value = false;
    is_allowed_second.value = false;
    form.purchase = null;
    form.external_purchase = null;
    form.sale = null;
    form.internal = null;
};
let internal = (event) => {
    is_allowed_first.value = true;
    is_allowed_second.value = true;
    form.purchase = null;
    form.external_purchase = null;
    form.sale = null;
    form.external_sale = null;
};


onMounted(() => {
  const currentDate = DateTime.now().setZone('Asia/Baghdad');
  form.date = currentDate.toFormat('yyyy-MM-dd');;
});



let submit = () => {
    form.submit( {
        preserveState: true,
        replace: true,
    });
};

let hanlesubmit = () => {
    form.get("/admin/loads/create", {
        onSuccess: (data) => {
            console.log(props.driver);
            form.truck_number  =props.driver.truck_number
            form.driver_name  =props.driver.name
            form.driver_phone_number  =props.driver.phone
        },
        preserveState: true,
        replace: true,
    });
};
function customLabel({ c_invoice_id, company, note, product, date, weighted_truck_qty, truck_qty }) {
    return `${c_invoice_id} || ${company.name} || ${note} || ${product.name} || ${date}  ||  ${weighted_truck_qty} =>  ${truck_qty}`;
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<template>
    <LayoutAuthenticated label="create load">
        <Head title="Add Load" />
        <SectionMain>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                title="Add Load"
                main
                class="flex flex-row"
            >
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
                New Load Id =>
                <span class="text-green-500 text-lg">{{
                    props.data.invoice_id
                }}</span>
            </p>
            <form @submit.prevent="submit" class="mt-14">
                <div class="block lg:flex lg:flex-row lg:space-x-2">
                    <!-- Driver start -->
                    <div class="flex flex-col border rounded-md p-6 space-y-2">
                        <div class="flex flex-col grow">
                            <label for="truck_number"
                                >Driver Truck Number</label
                            >
                            <input
                                v-model="form.truck_number"
                                @keydown.enter.exact.prevent="hanlesubmit()"
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
                            @keydown.enter.exact.prevent="hanlesubmit()"
                            @change="form.validate('driver_name')"
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
                            @keydown.enter.exact.prevent="hanlesubmit()"
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
                                <label for="contract" @click="purchase"
                                    >Contract</label
                                >
                                <BaseButton
                                    label="Contracts"
                                    id="contract"
                                    :icon="mdiEye"
                                    small
                                    @click="
                                        isModalActive = true;
                                        purchase();
                                    "
                                />
                                <div
                                    class="text-red-400 text-sm"
                                    v-if="form.errors.purchase"
                                >
                                    {{ form.errors.purchase }}
                                </div>
                                <Teleport to="body">
                                    <LoadContractModal
                                        v-model="isModalActive"
                                        large-title="Please confirm"
                                        button="success"
                                        has-cancel
                                    >
                                        <div class="w-full px-2 py-16 sm:px-0">
                                            <TabGroup>
                                                <TabList
                                                    class="flex justify-between rounded-xl bg-blue-900/20 p-1"
                                                >
                                                    <Tab
                                                        v-slot="{ selected }"
                                                        @click="purchase"
                                                    >
                                                        <button
                                                            id="ppp"
                                                            :class="[
                                                                'w-full rounded-lg py-2.5 px-2.5 text-sm font-medium leading-5 text-blue-700',
                                                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                                selected
                                                                    ? 'bg-white shadow'
                                                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                                                            ]"
                                                        >
                                                            Purchase
                                                        </button>
                                                    </Tab>
                                                    <Tab
                                                        v-slot="{ selected }"
                                                        @click="sale"
                                                    >
                                                        <button
                                                            id="sss"
                                                            :class="[
                                                                'w-full rounded-lg py-2.5 px-2.5 text-sm font-medium leading-5 text-blue-700',
                                                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                                selected
                                                                    ? 'bg-white shadow'
                                                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                                                            ]"
                                                        >
                                                            Sale
                                                        </button>
                                                    </Tab>
                                                    <Tab
                                                        v-slot="{ selected }"
                                                        @click="ext_pur"
                                                    >
                                                        <button
                                                            id="pp"
                                                            :class="[
                                                                'w-full rounded-lg py-2.5 px-2.5 text-sm font-medium leading-5 text-blue-700',
                                                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                                selected
                                                                    ? 'bg-white shadow'
                                                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                                                            ]"
                                                        >
                                                            External Purchase
                                                        </button>
                                                    </Tab>
                                                    <Tab
                                                        v-slot="{ selected }"
                                                        @click="ext_sale"
                                                    >
                                                        <button
                                                            id="ss"
                                                            :class="[
                                                                'w-full rounded-lg py-2.5 px-2.5 text-sm font-medium leading-5 text-blue-700',
                                                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                                selected
                                                                    ? 'bg-white shadow'
                                                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                                                            ]"
                                                        >
                                                            External Sale
                                                        </button>
                                                    </Tab>
                                                    <Tab
                                                        v-slot="{ selected }"
                                                        @click="internal"
                                                    >
                                                        <button
                                                            id="i"
                                                            :class="[
                                                                'w-full rounded-lg py-2.5 px-2.5 text-sm font-medium leading-5 text-blue-700',
                                                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                                selected
                                                                    ? 'bg-white shadow'
                                                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                                                            ]"
                                                        >
                                                            Internal Sale
                                                        </button>
                                                    </Tab>
                                                </TabList>

                                                <TabPanels class="mt-2">
                                                    <TabPanel
                                                        :class="[
                                                            'rounded-xl bg-white p-3',
                                                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                        ]"
                                                    >
                                                        <VueMultiselect
                                                            v-model="
                                                                form.purchase
                                                            "
                                                            :options="
                                                                props.data
                                                                    .contracts
                                                            "
                                                            placeholder="Fav No Man’s Sky path"
                                                            label="name"
                                                            track-by="id"
                                                            :option-height="104"
                                                            :custom-label="
                                                                customLabel
                                                            "
                                                            :show-labels="false"
                                                            class="text-black"
                                                        >
                                                            >
                                                        </VueMultiselect>
                                                    </TabPanel>
                                                    <TabPanel
                                                        :class="[
                                                            'rounded-xl bg-white p-3',
                                                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                        ]"
                                                    >
                                                        <VueMultiselect
                                                            v-model="form.sale"
                                                            :options="
                                                                props.data.sale
                                                            "
                                                            placeholder="Fav No Man’s Sky path"
                                                            label="name"
                                                            track-by="id"
                                                            :option-height="104"
                                                            :custom-label="
                                                                customLabel
                                                            "
                                                            :show-labels="false"
                                                            class="text-black"
                                                        >
                                                            >
                                                            <template
                                                                slot="singleLabel"
                                                                slot-scope="props"
                                                            >
                                                                <span
                                                                    class="option__desc"
                                                                    ><span
                                                                        class="option__title"
                                                                        >{{
                                                                            props
                                                                                .company
                                                                                .name
                                                                        }}</span
                                                                    >
                                                                </span>
                                                                <span
                                                                    class="option__desc"
                                                                    ><span
                                                                        class="option__title"
                                                                        >{{
                                                                            props
                                                                                .company
                                                                                .note
                                                                        }}</span
                                                                    >
                                                                </span>
                                                            </template>
                                                            <template
                                                                slot="company"
                                                                slot-scope="props"
                                                            >
                                                                <div
                                                                    class="option__desc flex justify-between"
                                                                >
                                                                    <span
                                                                        class="option__title"
                                                                        >{{
                                                                            props
                                                                                .company
                                                                                .company_name
                                                                        }}</span
                                                                    ><span
                                                                        class="option__small"
                                                                        >{{
                                                                            props
                                                                                .company
                                                                                .invoice_id
                                                                        }}</span
                                                                    ><span
                                                                        class="option__small"
                                                                        >{{
                                                                            props
                                                                                .company
                                                                                .product_name
                                                                        }}</span
                                                                    >
                                                                </div>
                                                            </template>
                                                        </VueMultiselect>
                                                    </TabPanel>
                                                    <TabPanel
                                                        :class="[
                                                            'rounded-xl bg-white p-3',
                                                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                        ]"
                                                    >
                                                        <VueMultiselect
                                                            v-model="
                                                                form.external_purchase
                                                            "
                                                            :options="
                                                                props.data
                                                                    .ext_pur
                                                            "
                                                            placeholder="Fav No Man’s Sky path"
                                                            label="name"
                                                            track-by="id"
                                                            :option-height="104"
                                                            :custom-label="
                                                                customLabel
                                                            "
                                                            :show-labels="false"
                                                            class="text-black"
                                                        >
                                                            >
                                                            <template
                                                                slot="singleLabel"
                                                                slot-scope="props"
                                                            >
                                                                <span
                                                                    class="option__desc"
                                                                    ><span
                                                                        class="option__title"
                                                                        >{{
                                                                            props
                                                                                .company
                                                                                .name
                                                                        }}</span
                                                                    >
                                                                </span>
                                                                <span
                                                                    class="option__desc"
                                                                    ><span
                                                                        class="option__title"
                                                                        >{{
                                                                            props
                                                                                .company
                                                                                .note
                                                                        }}</span
                                                                    >
                                                                </span>
                                                            </template>
                                                            <template
                                                                slot="company"
                                                                slot-scope="props"
                                                            >
                                                                <div
                                                                    class="option__desc flex justify-between"
                                                                >
                                                                    <span
                                                                        class="option__title"
                                                                        >{{
                                                                            props
                                                                                .company
                                                                                .company_name
                                                                        }}</span
                                                                    ><span
                                                                        class="option__small"
                                                                        >{{
                                                                            props
                                                                                .company
                                                                                .invoice_id
                                                                        }}</span
                                                                    ><span
                                                                        class="option__small"
                                                                        >{{
                                                                            props
                                                                                .company
                                                                                .product_name
                                                                        }}</span
                                                                    >
                                                                </div>
                                                            </template>
                                                        </VueMultiselect>
                                                    </TabPanel>
                                                    <TabPanel
                                                        :class="[
                                                            'rounded-xl bg-white p-3',
                                                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                        ]"
                                                    >
                                                        <VueMultiselect
                                                            v-model="
                                                                form.external_sale
                                                            "
                                                            :options="
                                                                props.data
                                                                    .ext_sal
                                                            "
                                                            placeholder="Fav No Man’s Sky path"
                                                            label="name"
                                                            track-by="id"
                                                            :option-height="104"
                                                            :custom-label="
                                                                customLabel
                                                            "
                                                            :show-labels="false"
                                                            class="text-black"
                                                        >
                                                            >
                                                            <template
                                                                slot="singleLabel"
                                                                slot-scope="props"
                                                            >
                                                                <span
                                                                    class="option__desc"
                                                                    ><span
                                                                        class="option__title"
                                                                        >{{
                                                                            props
                                                                                .company
                                                                                .name
                                                                        }}</span
                                                                    >
                                                                </span>
                                                                <span
                                                                    class="option__desc"
                                                                    ><span
                                                                        class="option__title"
                                                                        >{{
                                                                            props
                                                                                .company
                                                                                .note
                                                                        }}</span
                                                                    >
                                                                </span>
                                                            </template>
                                                            <template
                                                                slot="company"
                                                                slot-scope="props"
                                                            >
                                                                <div
                                                                    class="option__desc flex justify-between"
                                                                >
                                                                    <span
                                                                        class="option__title"
                                                                        >{{
                                                                            props
                                                                                .company
                                                                                .company_name
                                                                        }}</span
                                                                    ><span
                                                                        class="option__small"
                                                                        >{{
                                                                            props
                                                                                .company
                                                                                .invoice_id
                                                                        }}</span
                                                                    ><span
                                                                        class="option__small"
                                                                        >{{
                                                                            props
                                                                                .company
                                                                                .product_name
                                                                        }}</span
                                                                    >
                                                                </div>
                                                            </template>
                                                        </VueMultiselect>
                                                    </TabPanel>
                                                    <TabPanel
                                                        :class="[
                                                            'rounded-xl bg-white p-3',
                                                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                        ]"
                                                    >
                                                        <VueMultiselect
                                                            v-model="
                                                                form.internal
                                                            "
                                                            :options="
                                                                props.data
                                                                    .products
                                                            "
                                                            id="internal"
                                                            track-by="id"
                                                            label="name"
                                                            :options-limit="6"
                                                            class="shadow-md shadow-cyan-300/50"
                                                            placeholder="select product"
                                                        >
                                                        </VueMultiselect>
                                                    </TabPanel>
                                                </TabPanels>
                                            </TabGroup>
                                        </div>
                                    </LoadContractModal>
                                </Teleport>
                            </div>

                      
                             <MultiSelectComponent
                            v-model="form.first_destination"
                            :data="data.stock"
                            label="First Destination"
                            idValue="first_destination"
                            :errors="form.errors.first_destination"
                            />

                             <MultiSelectComponent
                            v-model="form.second_destination"
                            :data="data.stock"
                            label="Second Destination"
                            idValue="second_destination"
                            :errors="form.errors.second_destination"
                            />


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
                                    :disabled="is_allowed_first"
                                    :class="
                                        is_allowed_first
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
                                    :disabled="is_allowed_second"
                                    :class="
                                        is_allowed_second
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
