<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3";
import { mdiAccountKey, mdiArrowLeftBoldOutline } from "@mdi/js";
import LayoutAuthenticated from "@/Layouts/LayoutAuthenticated.vue";
import SectionMain from "@/Components/SectionMain.vue";
import SectionTitleLineWithButton from "@/Components/SectionTitleLineWithButton.vue";
import CardBox from "@/Components/CardBox.vue";
import FormField from "@/Components/FormField.vue";
import FormControl from "@/Components/FormControl.vue";
import FormCheckRadioGroup from "@/Components/FormCheckRadioGroup.vue";
import BaseDivider from "@/Components/BaseDivider.vue";
import BaseButton from "@/Components/BaseButton.vue";
import BaseButtons from "@/Components/BaseButtons.vue";
import VueMultiselect from "vue-multiselect";
import { reactive, ref } from "@vue/reactivity";
import { throttle } from "lodash/throttle";
import { onMounted, watch } from "vue";
import SaleContractDynamicForm from "@/Components/SaleContractDynamicForm.vue";
import NotificationBar from "@/Components/NotificationBar.vue";

const props = defineProps({
    Company: {
        type: Array,
        default: () => [],
    },
    data: {
        type: Object,
        default: () => {},
    },
});

const form = useForm({
    _method: "put",
    id: props.data.salesContarct.id,
    product_id: props.data.salesContarct.isCompanyScale,
    isCompanyScale: props.data.salesContarct.isCompanyScale,
    company_id: props.data.salesContarct.isCompanyScale,
    currency_id: props.data.salesContarct.currency_id,
    to_unit_id: props.data.salesContarct.to_unit_id,
    truck_qty: props.data.salesContarct.truck_qty,
    unit_value: props.data.salesContarct.unit_value,
    weight_amount: props.data.salesContarct.weight_amount,
    price: props.data.salesContarct.price,
    note: props.data.salesContarct.note,
    status: props.data.salesContarct.status,
    sale_men_id: props.data.salesContarct.sale_men_id,
    date: props.data.salesContarct.date,
    is_our_rent: props.data.salesContarct.is_our_rent,
    rent: props.data.salesContarct.rent,
});
var stat = false;
var sca = false;
var rent = false;
onMounted(() => {
    if (props.data.salesContarct.status === 1) {
        stat = true;
    }
    if (props.data.salesContarct.isCompanyScale === 1) {
        sca = true;
    }
    if (props.data.salesContarct.is_our_rent === 1) {
        rent = true;
    }
    form.company_id = props.data.company.find(
        (company) => company.id === props.data.salesContarct.company_id
    );
    form.sale_men_id = props.data.sales_man.find(
        (sales_man) => sales_man.id === props.data.salesContarct.sale_men_id
    );
    form.product_id = props.data.product.find(
        (product) => product.id === props.data.salesContarct.product_id
    );
    form.to_unit_id = props.data.unit.find(
        (unit) => unit.id === props.data.salesContarct.to_unit_id
    );
    form.currency_id = props.data.currency.find(
        (curency) => curency.id === props.data.salesContarct.currency_id
    );
    form.note = props.data.salesContarct.note;
    form.status = props.data.salesContarct.status;
    form.isCompanyScale = props.data.salesContarct.isCompanyScale;
});


console.log(form.sale_men_id+"l");

let submit = () => {
    form.product_id = form.product_id["id"];
    form.company_id = form.company_id["id"];
    form.to_unit_id = form.to_unit_id["id"];
    form.sale_men_id = form.sale_men_id["id"];
    form.currency_id = form.currency_id["id"];
    form.put("/admin/salescontract");
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<template>
    <LayoutAuthenticated>
        <Head title="Update Contract" />

        <SectionMain>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                title="Update Contract"
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

            <form
                @submit.prevent="
                    form.post(
                        route(
                            'salescontract.update',
                            props.data.salesContarct.id
                        )
                    )
                "
            >
                <div
                    class="flex flex-row items-center mt-6 space-x-2 absolute right-8 lg:top-36 grow"
                >
                    <label for="status">Status</label>
                    <input
                        id="status"
                        type="checkbox"
                        class="toggle-checkbox block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                        v-model="form.status"
                        :checked="stat"
                    />
                </div>
                <div
                    class="flex flex-row items-center mt-6 space-x-2 absolute right-32 lg:top-36"
                >
                    <label for="status">Is Our Rent</label>
                    <input
                        id="status"
                        type="checkbox"
                        class="toggle-checkbox block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                        v-model="form.is_our_rent"
                        :checked="rent"
                    />
                </div>
                <div>
                    <div
                        class="flex flex-col lg:flex-row lg:space-x-2 xl:flex-row xl:space-x-2 border rounded-md p-10"
                    >
                        <div class="flex flex-col lg:w-64 xl:w-64 grow">
                            <label for="company_id">Company Name</label>
                            <VueMultiselect
                                v-model="form.company_id"
                                :options="props.data.company"
                                track-by="id"
                                id="company_id"
                                label="name"
                                :options-limit="6"
                                class="shadow-md shadow-cyan-300/50"
                            >
                            </VueMultiselect>
                        </div>
                        <div class="flex flex-col lg:w-64 xl:w-64 grow">
                            <label for="currency">Currency</label>
                            <VueMultiselect
                                v-model="form.currency_id"
                                :options="props.data.currency"
                                @search-change="onCompanyChange"
                                @input="select"
                                track-by="id"
                                id="currency"
                                label="name"
                                :options-limit="6"
                                class="shadow-md shadow-cyan-300/50"
                            >
                            </VueMultiselect>
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
                        </div>
                        <div class="flex flex-col lg:w-64 xl:w-64 grow">
                            <label for="sales_man">Sales Man</label>
                            <VueMultiselect
                                v-model="form.sale_men_id"
                                :options="props.data.sales_man"
                                @search-change="onCompanyChange"
                                @input="select"
                                :preserve-search="true"
                                track-by="id"
                                id="sales_man"
                                label="name"
                                :options-limit="6"
                                class="shadow-md shadow-cyan-300/50"
                            >
                            </VueMultiselect>
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
                            class="flex flex-row lg:w-64 space-x-2 items-center mt-6"
                        >
                            <label for="isCompanyScale">Company Weight</label>
                            <input
                                id="isCompanyScale"
                                type="checkbox"
                                class="toggle-checkbox block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                v-model="form.isCompanyScale"
                                :checked="sca"
                            />
                        </div>
                    </div>
                </div>
                <div class="hello border rounded-md mt-20 p-4">
                    <div
                        class="flex flex-col lg:flex-row xl:flex-row justify-start mt-4 space-y-4 lg:space-y-0 xl:space-y-0 lg:space-x-2 xl:space-x-2"
                    >
                        <div class="flex flex-col lg:w-64 grow">
                            <VueMultiselect
                                v-model="form.product_id"
                                :options="data.product"
                                @search-change="onCompanyChange"
                                @input="select"
                                track-by="id"
                                id="sales_man"
                                label="name"
                                :options-limit="6"
                                class="shadow-md shadow-cyan-300/50"
                            >
                            </VueMultiselect>
                        </div>
                        <div class="flex flex-col lg:w-64 grow">
                            <VueMultiselect
                                v-model="form.to_unit_id"
                                :options="data.unit"
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
                                v-if="form.errors.to_unit_id"
                            >
                                {{ form.errors.to_unit_id }}
                            </div>
                        </div>
                        <div class="grow">
                            <input
                                v-model="form.unit_value"
                                placeholder="unit value"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                            <div
                                class="text-red-400 text-md mt-2"
                                v-if="form.errors.unit_value"
                            >
                                {{ form.errors.unit_value }}
                            </div>
                        </div>
                        <div class="grow">
                            <input
                                v-model="form.truck_qty"
                                placeholder="number of trucks"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                                type="number"
                                step="1"
                            />
                            <div
                                class="text-red-400 text-md mt-2"
                                v-if="form.errors.truck_qty"
                            >
                                {{ form.errors.truck_qty }}
                            </div>
                        </div>
                        <div class="grow">
                            <input
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
                            <input
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
                <BaseButtons class="mt-10">
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
