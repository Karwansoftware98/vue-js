<script setup>
import { Head, useForm } from "@inertiajs/vue3";
import { mdiAccountKey, mdiArrowLeftBoldOutline } from "@mdi/js";
import LayoutAuthenticated from "@/Layouts/LayoutAuthenticated.vue";
import SectionMain from "@/Components/SectionMain.vue";
import SectionTitleLineWithButton from "@/Components/SectionTitleLineWithButton.vue";
import BaseButton from "@/Components/BaseButton.vue";
import BaseButtons from "@/Components/BaseButtons.vue";
import VueMultiselect from "vue-multiselect";



const props = defineProps({
    Company: {
        type: Array,
        default: () => [],
    },

    data: {
        type: Array,
        default: () => [],
    },
});

console.log(props.data.unit.name);
const form = useForm({
    contract_type: "",
    product_id: "",
    isCompanyScale: Boolean,
    company_id: "",
    currency_id: "",
    to_unit_id: "",
    truck_qty: "",
    weight_amount: "",
    price: "",
    note: "",
    status: Boolean,
    sale_men_id: "",
    date: "",
    type: Number,
    invoice_id: Number,
    is_our_rent: false,
    rent: "",
    unit_value: "",
});
form.defaults({
    isCompanyScale: false,
    status: false,
});

const current = new Date().toISOString().substr(0, 10);
form.date = current;

let submit = () => {
    form.product_id = form.product_id["id"];
    form.company_id = form.company_id["id"];
    form.to_unit_id = form.to_unit_id["id"];
    form.sale_men_id = form.sale_men_id["id"];
    form.currency_id = form.currency_id["id"];
    form.invoice_id = props.data.invoice_id;
    form.type = props.data.type;
    form.post("/admin/salescontract");
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<template>
    <LayoutAuthenticated>
        <Head title="Add Contract" />

        <SectionMain>
            <p>
                New Invoice Id =>
                <span class="text-green-500 text-lg">{{
                    props.data.invoice_id
                }}</span>
            </p>

            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                title="Add Contract"
                main
                class="flex flex-row"
            >
                <BaseButton
                    :route-name="route('contract.index', props.data.type)"
                    :icon="mdiArrowLeftBoldOutline"
                    label="Back"
                    color="white"
                    rounded-full
                    small
                    class="shadow-lg shadow-gray-500/50"
                />
            </SectionTitleLineWithButton>
            <!-- {{ form.errors }} -->
            <form @submit.prevent="submit">
                <div
                    class="flex flex-row items-center mt-2 lg:mt-12 space-x-2 absolute right-8 lg:top-36"
                >
                    <label for="status">Status</label>
                    <input
                        id="status"
                        type="checkbox"
                        class="toggle-checkbox block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                        v-model="form.status"
                        value="false"
                    />
                </div>
                <div
                    class="flex flex-row items-center mt-2 lg:mt-12 space-x-2 absolute right-32 lg:top-36"
                >
                    <label for="status">Is Our Rent</label>
                    <input
                        id="status"
                        type="checkbox"
                        class="toggle-checkbox block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                        v-model="form.is_our_rent"
                        value="false"
                    />
                </div>
                <div>
                    <div
                        class="flex flex-col lg:flex-row lg:space-x-2 xl:flex-row xl:space-x-2 border rounded-md p-10"
                    >
                        <div class="flex flex-col lg:w-64 grow">
                            <label for="company_id">Company Name</label>
                            <VueMultiselect
                                v-model="form.company_id"
                                :options="Company"
                                @search-change="onCompanyChange"
                                @input="select"
                                track-by="id"
                                id="company_id"
                                label="name"
                                :options-limit="6"
                                class="shadow-md shadow-cyan-300/50"
                            >
                            </VueMultiselect>
                            <div
                                class="text-red-400 text-md mt-2"
                                v-if="form.errors.company_id"
                            >
                                {{ form.errors.company_id }}
                            </div>
                        </div>

                        <div class="flex flex-col lg:w-64 xl:w-64 grow">
                            <label for="currency">Currency</label>
                            <VueMultiselect
                                v-model="form.currency_id"
                                :options="data.currency"
                                @search-change="onCompanyChange"
                                @input="select"
                                track-by="id"
                                id="currency"
                                label="name"
                                :options-limit="6"
                                class="shadow-md shadow-cyan-300/50"
                            >
                            </VueMultiselect>
                            <div
                                class="text-red-400 text-md mt-2"
                                v-if="form.errors.currency_id"
                            >
                                {{ form.errors.currency_id }}
                            </div>
                        </div>
                        <div class="flex flex-col lg:w-64 xl:w-64 grow">
                            <label for="date">Date</label>
                            <input
                                v-model="form.date"
                                placeholder="number of trucks"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                                type="date"
                                step="1"
                            />
                            <div
                                class="text-red-400 text-md mt-2"
                                v-if="form.errors.date"
                            >
                                {{ form.errors.date }}
                            </div>
                        </div>
                        <div class="flex flex-col lg:w-64 xl:w-64 grow">
                            <label for="sales_man">Sales Man</label>
                            <VueMultiselect
                                v-model="form.sale_men_id"
                                :options="data.sale_men"
                                @search-change="onCompanyChange"
                                @input="select"
                                track-by="id"
                                id="sales_man"
                                label="name"
                                :options-limit="6"
                                class="shadow-md shadow-cyan-300/50"
                            >
                            </VueMultiselect>
                            <div
                                class="text-red-400 text-md mt-2"
                                v-if="form.errors.sale_men_id"
                            >
                                {{ form.errors.sale_men_id }}
                            </div>
                        </div>
                        <div class="flex flex-col lg:w-64 xl:w-64 grow">
                            <label for="note">Note</label>
                            <input
                                id="note"
                                type="text"
                                class="rounded-md border-gray-300 shadow-md shadow-cyan-300/50 text-gray-700"
                                placeholder="write a note"
                                v-model="form.note"
                            />
                            <div
                                class="text-red-400 text-md mt-2"
                                v-if="form.errors.note"
                            >
                                {{ form.errors.note }}
                            </div>
                        </div>
                        <div
                            class="flex flex-col grow"
                            v-if="form.is_our_rent === true"
                        >
                            <label for="rent">Rent</label>
                            <input
                                id="rent"
                                v-model="form.rent"
                                placeholder="Rent"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                            <div
                                class="text-red-400 text-md mt-2"
                                v-if="form.errors.rent"
                            >
                                {{ form.errors.rent }}
                            </div>
                        </div>
                        <div
                            class="flex flex-row lg:w-64 space-x-2 mt-6 justify-end grow-0"
                        >
                            <label for="isCompanyScale">Company Weight</label>
                            <input
                                id="isCompanyScale"
                                type="checkbox"
                                class="toggle-checkbox block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                v-model="form.isCompanyScale"
                                value="false"
                            />
                        </div>
                        <div
                            class="text-red-400 text-md mt-2"
                            v-if="form.errors.isCompanyScale"
                        >
                            {{ form.errors.isCompanyScale }}
                        </div>
                    </div>
                </div>
                <div class="hello border rounded-md mt-20 p-4">
                    <div
                        class="flex flex-col lg:flex-row xl:flex-row justify-start mt-4 space-y-4 lg:space-y-0 xl:space-y-0 lg:space-x-2 xl:space-x-2"
                    >
                        <div class="flex flex-col lg:w-64 grow">
                            <label for="Product">Product</label>

                            <VueMultiselect
                                v-model="form.product_id"
                                :options="data.product"
                                @search-change="onCompanyChange"
                                @input="select"
                                track-by="id"
                                id="Product"
                                label="name"
                                :options-limit="6"
                                class="shadow-md shadow-cyan-300/50"
                            >
                            </VueMultiselect>

                            <div
                                class="text-red-400 text-md mt-2"
                                v-if="form.errors.product_id"
                            >
                                {{ form.errors.product_id }}
                            </div>
                        </div>
                        <div class="flex flex-col lg:w-64 grow">
                            <label for="Unit">Unit</label>

                            <VueMultiselect
                                v-model="form.to_unit_id"
                                :options="data.unit"
                                track-by="id"
                                id="Unit"
                                label="name"
                                :options-limit="6"
                                class="shadow-md shadow-cyan-300/50"
                            >
                            </VueMultiselect>
                            <div
                                class="text-red-400 text-md mt-2"
                                v-if="form.errors.to_unit_id"
                            >
                                {{ form.errors.to_unit_id }}
                            </div>
                        </div>
                        <div class="grow">
                            <label for="Unit_value">Unit Value</label>

                            <input
                                v-model="form.unit_value"
                                placeholder="unit value"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                                id="Unit_value"
                            />
                            <div
                                class="text-red-400 text-md mt-2"
                                v-if="form.errors.unit_value"
                            >
                                {{ form.errors.unit_value }}
                            </div>
                        </div>
                        <div class="grow">
                            <label for="truck_qty">Truck Quantity</label>

                            <input
                                v-model="form.truck_qty"
                                placeholder="number of trucks"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                                type="number"
                                step="1"
                                id="truck_qty"
                            />
                            <div
                                class="text-red-400 text-md mt-2"
                                v-if="form.errors.truck_qty"
                            >
                                {{ form.errors.truck_qty }}
                            </div>
                        </div>
                        <div class="grow">
                            <label for="weight_amount">Weight Amount</label>

                            <input
                                id="weight_amount"
                                v-model="form.weight_amount"
                                placeholder="weight"
                                class="w-full pl-3 py-2 border rounded border-gray-300 text-gray-700 shadow-md shadow-cyan-300/50"
                            />
                            <div
                                class="text-red-400 text-md mt-2"
                                v-if="form.errors.weight_amount"
                            >
                                {{ form.errors.weight_amount }}
                            </div>
                        </div>
                        <div class="grow">
                            <label for="price">Price</label>

                            <input
                                id="price"
                                v-model="form.price"
                                placeholder="price"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                            <div
                                class="text-red-400 text-md mt-2"
                                v-if="form.errors.price"
                            >
                                {{ form.errors.price }}
                            </div>
                        </div>
                    </div>
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
